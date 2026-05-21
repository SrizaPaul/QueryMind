const fs = require('fs');
const csv = require('csv-parser');
const pool = require('../config/db');

let currentTable = '';

const uploadCSV = async (req, res) => {

  try {

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });

    }

    const results = [];

    // =========================
    // TABLE NAME
    // =========================

    const tableName = req.file.originalname
      .split('.')[0]
      .toLowerCase()
      .replace(/\s+/g, '_');

    // =========================
    // READ CSV
    // =========================

    fs.createReadStream(req.file.path)

      .pipe(csv())

      .on('data', (data) => {

        results.push(data);

      })

      .on('end', async () => {

        try {

          console.log(results);

          // =========================
          // EMPTY CSV CHECK
          // =========================

          if (results.length === 0) {

            return res.status(400).json({
              success: false,
              message: 'CSV is empty'
            });

          }

          // =========================
          // GET COLUMNS
          // =========================

          const columns =
            Object.keys(results[0]);

          // =========================
          // DROP OLD TABLE
          // =========================

          await pool.query(`
            DROP TABLE IF EXISTS ${tableName}
          `);

          // =========================
          // CREATE TABLE
          // =========================

          const createTableQuery = `
            CREATE TABLE ${tableName} (
              id SERIAL PRIMARY KEY,
              ${columns
                .map(
                  (col) => `"${col}" TEXT`
                )
                .join(',')}
            )
          `;

          await pool.query(
            createTableQuery
          );

          // =========================
          // SAVE CURRENT TABLE
          // =========================

          currentTable = tableName;

          // =========================
          // INSERT CSV DATA
          // =========================

          for (const row of results) {

            const values = columns.map(
              (col) => row[col]
            );

            const placeholders = columns
              .map((_, i) => `$${i + 1}`)
              .join(',');

            const insertQuery = `
              INSERT INTO ${tableName}
              (
                ${columns
                  .map(
                    (col) => `"${col}"`
                  )
                  .join(',')}
              )
              VALUES (${placeholders})
            `;

            await pool.query(
              insertQuery,
              values
            );

          }

          // =========================
          // SUCCESS RESPONSE
          // =========================

          res.status(200).json({

            success: true,

            message:
              `CSV uploaded successfully to table: ${tableName}`

          });

        } catch (error) {

          console.error(error);

          res.status(500).json({

            success: false,

            message: 'Database error'

          });

        }

      });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: 'Upload failed'

    });

  }

};

// =========================
// EXPORTS
// =========================

module.exports = {

  uploadCSV,

  getCurrentTable: () => currentTable

};