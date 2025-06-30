let primaryConnection;

const initConnection = async () => {
  const mysql = require('mysql2/promise');
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 2,
    idleTimeout: 60000,
    queueLimit: 10,
  });

  await pool.query('SELECT 1');

  primaryConnection = pool;
};

/**
 * @returns {import('mysql2/promise').Pool}
 */
const getConnection = () => primaryConnection;

module.exports = { initConnection, getConnection };
