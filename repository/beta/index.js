const connection = require('../connection').getConnection();

const getDataInitBetaEntity = () => connection.query('SELECT * FROM beta');

const saveDataInitBetaEntity = ({ values }) =>
  connection.query('INSERT INTO beta VALUES (?, ?)', [values.name, values.age]);

module.exports = { getDataInitBetaEntity, saveDataInitBetaEntity };
