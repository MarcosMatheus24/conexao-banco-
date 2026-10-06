require('dotenv').config();
const mysql = require('mysql2/promise');

const config = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

const NOME_BANCO = process.env.DB_NAME || 'cadastro_db';

const pool = mysql.createPool({
  ...config,
  database: NOME_BANCO,
  waitForConnections: true,
  connectionLimit: 10
});

// Cria o banco e a tabela se ainda não existirem
async function iniciarBanco() {
  const conexao = await mysql.createConnection(config);
  await conexao.query(`CREATE DATABASE IF NOT EXISTS \`${NOME_BANCO}\``);
  await conexao.end();

  await pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      email VARCHAR(150) NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

module.exports = { pool, iniciarBanco };
