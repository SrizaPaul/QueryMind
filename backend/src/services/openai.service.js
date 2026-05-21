const {
  getCurrentTable
} = require('../controllers/upload.controller');


// console.log('USER QUERY:', userQuery);
const generateSQL = async (userQuery) => {

  const tableName =
    getCurrentTable() || 'transactions';

  const query = userQuery.toLowerCase();

  // TOP / HIGHEST EXPENSES
  if (
    query.includes('top') ||
    query.includes('highest') ||
    query.includes('largest')
  ) {

    return `
      SELECT *
      FROM ${tableName}
      ORDER BY CAST(amount AS DECIMAL) DESC
      LIMIT 5
    `;

  }

  // LOWEST EXPENSES
  if (
    query.includes('lowest') ||
    query.includes('smallest')
  ) {

    return `
      SELECT *
      FROM ${tableName}
      ORDER BY CAST(amount AS DECIMAL) ASC
      LIMIT 5
    `;

  }

  // FOOD EXPENSES
  if (query.includes('food')) {

    return `
      SELECT *
      FROM ${tableName}
      WHERE LOWER(category) = 'food'
    `;

  }

  // TRANSPORT EXPENSES
  if (query.includes('transport')) {

    return `
      SELECT *
      FROM ${tableName}
      WHERE LOWER(category) = 'transport'
    `;

  }

  // SHOPPING EXPENSES
  if (query.includes('shopping')) {

    return `
      SELECT *
      FROM ${tableName}
      WHERE LOWER(category) = 'shopping'
    `;

  }

  // ENTERTAINMENT
  if (query.includes('entertainment')) {

    return `
      SELECT *
      FROM ${tableName}
      WHERE LOWER(category) = 'entertainment'
    `;

  }

  // TOTAL SPENDING
  if (
    query.includes('total') ||
    query.includes('sum')
  ) {

    return `
      SELECT
      SUM(CAST(amount AS DECIMAL))
      AS total_spending
      FROM ${tableName}
    `;

  }

  // AVERAGE SPENDING
  if (query.includes('average')) {

    return `
      SELECT
      AVG(CAST(amount AS DECIMAL))
      AS average_spending
      FROM ${tableName}
    `;

  }

  // CATEGORY TOTALS
  if (
    query.includes('category') ||
    query.includes('group')
  ) {

    return `
      SELECT
      category,
      SUM(CAST(amount AS DECIMAL))
      AS total
      FROM ${tableName}
      GROUP BY category
      ORDER BY total DESC
    `;

  }

  // COUNT TRANSACTIONS
  if (
    query.includes('count') ||
    query.includes('how many')
  ) {

    return `
      SELECT COUNT(*) AS total_transactions
      FROM ${tableName}
    `;

  }

  // DEFAULT
  return `
    SELECT *
    FROM ${tableName}
  `;

};

module.exports = {
  generateSQL
};