const connection = require('../connection').getConnection();

const insertNewForm = ({ formName }) =>
  connection.execute('INSERT INTO form (name) VALUES (?)', [formName]);

const insertNewFields = ({ formId, fields }) => {
  const baseQuery = 'INSERT INTO field (form_field, name) VALUES ';
  const { phQ, phV } = fields.reduce(
    (o, i) => ({ phQ: [...o.phQ, '(?,?)'], phV: [...o.phV, formId, i.name] }),
    {
      phQ: [],
      phV: [],
    }
  );

  return connection.execute(baseQuery + phQ.join(', '), phV);
};

const insertNewValues = async ({ fieldId, values }) => {
  const baseQuery = 'INSERT INTO value (field_value, value, inner_text) VALUES ';
  const { phQ, phV } = values.reduce(
    (o, i) => ({
      phQ: [...o.phQ, '(?,?,?)'],
      phV: [...o.phV, fieldId, !i.value ? i.inner_text : i.value, i.inner_text],
    }),
    {
      phQ: [],
      phV: [],
    }
  );

  return connection.execute(baseQuery + phQ.join(', '), phV);
};

module.exports = { insertNewForm, insertNewFields, insertNewValues };
