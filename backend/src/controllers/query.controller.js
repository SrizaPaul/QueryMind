let history = [];

const pool = require('../config/db');

const {
  getCurrentTable
} = require('./upload.controller');

const {
  validateSQL
} = require('../utils/sqlValidator');

// =========================
// Handle Query
// =========================

const handleQuery = async (req, res) => {

  try {

    const { query } = req.body;

    if (!query) {

      return res.status(400).json({
        success: false,
        message: 'Query is required'
      });

    }

    const table =
      getCurrentTable();

    if (!table) {

      return res.status(400).json({
        success: false,
        message: 'Please upload a CSV first'
      });

    }

    let generatedSQL = '';
    let explanation = '';

    const lowerQuery =
      query.toLowerCase();

    // =========================
    // TOP EXPENSES
    // =========================

    if (
      lowerQuery.includes('top') ||
      lowerQuery.includes('highest')
    ) {

      generatedSQL = `
        SELECT *
        FROM ${table}
        ORDER BY CAST(amount AS INTEGER) DESC
        LIMIT 5
      `;

      explanation =
        'This query shows the highest expenses sorted by amount.';

    }

    // =========================
    // FOOD EXPENSES
    // =========================

    else if (
      lowerQuery.includes('food')
    ) {

      generatedSQL = `
        SELECT *
        FROM ${table}
        WHERE LOWER(category) = 'food'
      `;

      explanation =
        'This query filters food-related expenses.';

    }

    // =========================
    // TOTAL SPENDING
    // =========================

    else if (
      lowerQuery.includes('total')
    ) {

      generatedSQL = `
        SELECT
        SUM(CAST(amount AS INTEGER))
        AS total_spending
        FROM ${table}
      `;

      explanation =
        'This query calculates total spending.';

    }

    // =========================
    // ALL DATA
    // =========================

    else {

      generatedSQL = `
        SELECT *
        FROM ${table}
      `;

      explanation =
        'This query retrieves all records.';

    }

    // =========================
    // VALIDATE SQL
    // =========================

    const isValid =
      validateSQL(generatedSQL);

    if (!isValid) {

      return res.status(400).json({
        success: false,
        message: 'Unsafe SQL query'
      });

    }

    // =========================
    // EXECUTE SQL
    // =========================

    const result =
      await pool.query(generatedSQL);

    // =========================
    // SAVE HISTORY
    // =========================

    history.push({

      query,

      sql: generatedSQL,

      time: new Date().toISOString()

    });

    if (history.length > 20) {

      history.shift();

    }

    // =========================
    // RESPONSE
    // =========================

    res.status(200).json({

      success: true,

      generatedSQL,

      explanation,

      data: result.rows

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: 'Server error'

    });

  }

};

// =========================
// GET HISTORY
// =========================

const getHistory = (req, res) => {

  res.status(200).json(history);

};

module.exports = {

  handleQuery,

  getHistory

};