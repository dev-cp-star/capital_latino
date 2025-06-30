const repositoryBeta = require('../../repository/beta');

const initBetaEntity = async () => {
  const [queryResult, fields] = await repositoryBeta.getDataInitBetaEntity();
  console.log('Fields query ->', fields);
  return queryResult;
};

module.exports = { initBetaEntity };
