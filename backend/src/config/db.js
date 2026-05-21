const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'QueryMind',
  password: 'Srizapaul@4321',
  port: 5432,
});

module.exports = pool;