const connection = require('../connection').getConnection();

const insertNewForm = ({ formName }) =>
  connection.execute('INSERT INTO form (name) VALUES (?)', [formName]);

const insertNewFields = ({ formId, fields }) => {
  const baseQuery = 'INSERT INTO field (form_field, name, fieldValues) VALUES ';
  const { phQ, phV } = fields.reduce(
    (o, i) => ({
      phQ: [...o.phQ, '(?,?,?)'],
      phV: [
        ...o.phV,
        formId,
        i.name,
        JSON.stringify(
          i.fieldValues.map((i) => ({ ...i, value: !i.value ? i.text : i.value, active: true }))
        ),
      ],
    }),
    {
      phQ: [],
      phV: [],
    }
  );

  return connection.execute(baseQuery + phQ.join(', '), phV);
};

module.exports = { insertNewForm, insertNewFields };
