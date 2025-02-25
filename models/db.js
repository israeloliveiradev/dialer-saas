const { Pool } = require('pg');
require('dotenv').config();

const password = String(process.env.POSTGRES_PASSWORD);  // Converter para string
console.log("Senha lida do .env:", password);

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.DB_HOST,
  database: process.env.POSTGRES_DB,
  password: password,
  port: process.env.DB_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};