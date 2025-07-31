const formOptionsRepository = require('../../repository/form_options');

const createForm = async ({ payload }) => {
  const { formName } = payload;
  const [r] = await formOptionsRepository.insertNewForm({ formName });
  return r.insertId;
};

const createFields = async ({ payload }) => {
  const { formId, fields } = payload;
  await formOptionsRepository.insertNewFields({ formId, fields });
};

const createValues = async ({ payload }) => {
  const { fieldId, values } = payload;
  await formOptionsRepository.insertNewValues({ fieldId, values });
};

module.exports = { createForm, createFields, createValues };
