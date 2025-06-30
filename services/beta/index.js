const repositoryBeta = require('../../repository/beta');

const initBetaEntity = async () => {
  const [queryResult, fields] = await repositoryBeta.getDataInitBetaEntity();
  console.log('Fields query ->', fields);
  return queryResult;
};

const initSaveBetaEntity = async ({ payload }) => {
  await repositoryBeta.saveDataInitBetaEntity({ values: payload });
  console.log('Save success');
  return;
};

module.exports = { initBetaEntity, initSaveBetaEntity };
