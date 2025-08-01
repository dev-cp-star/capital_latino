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

const getFieldsAndValuesByForm = async ({ formId }) => {
  const data = await formOptionsRepository.fieldsAndValuesByForm({ formId });
  return data;
};

module.exports = { createForm, createFields, getFieldsAndValuesByForm };
