let primaryConnection;

const initConnection = async () => {
  const pool = require('mysql2').createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DB_NAME,
    password: process.env.DB_PASSWORD,
  });
  primaryConnection = pool;
};

/**
 * @returns {import('mysql2/promise').Pool}
 */
const getConnection = () => primaryConnection;

module.exports = { initConnection, getConnection };
