import mysqlPool from "../config/mysql.js";

export const executeQuery = async (req, res) => {
  try {
    const { sql } = req.body;

    if (!sql) {
      return res.status(400).json({
        success: false,
        message: "SQL query is required",
      });
    }

    const trimmedSQL = sql.trim();
    const normalizedSQL = trimmedSQL.toLowerCase();

    // Only allow SELECT queries
    if (!normalizedSQL.startsWith("select")) {
      return res.status(403).json({
        success: false,
        message: "Only SELECT queries are allowed",
      });
    }

    // Prevent multiple SQL statements
    if (trimmedSQL.includes(";") && !trimmedSQL.endsWith(";")) {
      return res.status(403).json({
        success: false,
        message: "Multiple SQL statements are not allowed",
      });
    }

    // Only allow queries on the employees table
    if (!normalizedSQL.includes("from employees")) {
      return res.status(403).json({
        success: false,
        message: "Queries are only allowed on the employees table",
      });
    }

    const [rows] = await mysqlPool.query(trimmedSQL);

    res.status(200).json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Query Execution Error:", error.message);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};