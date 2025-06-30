const connection = require('../connection').getConnection();

const getDataInitBetaEntity = () => connection.query('SELECT * FROM beta');

module.exports = { getDataInitBetaEntity };
