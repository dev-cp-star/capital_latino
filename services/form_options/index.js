const formOptionsRepository = require("../../repository/form_options");

const createForm = async ({ payload }) =>
  formOptionsRepository.insertNewForm({ formData: payload });

const getFieldsAndValuesByForm = async ({ formId }) => {
  const data = await formOptionsRepository.fieldsAndValuesByForm({ formId });
  return data;
};

module.exports = { createForm, getFieldsAndValuesByForm };
