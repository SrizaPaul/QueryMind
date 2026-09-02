import ai from "../config/gemini.js";
import mysqlPool from "../config/mysql.js";

export const generateAndExecuteSQL = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    const prompt = `
You are an SQL query generator for a safe employee database.

Database: MySQL
Table: employees

Columns:
- id INT
- name VARCHAR
- email VARCHAR
- department VARCHAR
- salary DECIMAL

Convert the user's natural language question into ONE MySQL SELECT query.

STRICT RULES:
- Return ONLY the SQL query.
- Generate exactly ONE SELECT statement.
- Use ONLY the employees table.
- Never generate INSERT, UPDATE, DELETE, DROP, ALTER, CREATE, TRUNCATE, GRANT, or REVOKE.
- Never generate multiple SQL statements.
- Do not use SQL comments.
- Do not use markdown code fences.
- Do not access any other table.
- Do not modify the database.

User question:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    let sql = response.text.trim();

    // Remove accidental markdown code fences
    sql = sql
      .replace(/^```sql\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim();

    const normalizedSQL = sql.toLowerCase();

    // Must start with SELECT
    if (!normalizedSQL.startsWith("select ")) {
      return res.status(403).json({
        success: false,
        message: "AI generated an unsafe query",
      });
    }

    // Block dangerous SQL keywords
    const forbiddenKeywords = [
      "insert",
      "update",
      "delete",
      "drop",
      "alter",
      "create",
      "truncate",
      "grant",
      "revoke",
    ];

    for (const keyword of forbiddenKeywords) {
      const keywordPattern = new RegExp(`\\b${keyword}\\b`, "i");

      if (keywordPattern.test(normalizedSQL)) {
        return res.status(403).json({
          success: false,
          message: "Unsafe SQL operation detected",
        });
      }
    }

    // Prevent SQL comments
    if (sql.includes("--") || sql.includes("/*") || sql.includes("*/")) {
      return res.status(403).json({
        success: false,
        message: "SQL comments are not allowed",
      });
    }

    // Allow at most one trailing semicolon
    const sqlWithoutTrailingSemicolon = sql.replace(/;\s*$/, "");

    if (sqlWithoutTrailingSemicolon.includes(";")) {
      return res.status(403).json({
        success: false,
        message: "Multiple SQL statements are not allowed",
      });
    }

    // Only allow the employees table
    if (!/\bfrom\s+employees\b/i.test(sql)) {
      return res.status(403).json({
        success: false,
        message: "Query is not allowed on this database",
      });
    }

    // Execute safe SQL
    const [rows] = await mysqlPool.query(sql);

    res.status(200).json({
      success: true,
      question,
      sql,
      data: rows,
    });
  } catch (error) {
    console.error("AI Query Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to process natural language query",
    });
  }
};