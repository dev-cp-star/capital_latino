const { FormNotAvailable } = require('../../errors/form-options');

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

const fieldsAndValuesByForm = async ({ formId }) => {
  const q =
    'SELECT t2.name, t2.fieldValues FROM form as t1 INNER JOIN field as t2 ON t1.id=t2.form_field AND t2.active=true where t1.id=? AND t1.active=true';

  const [r, metadata] = await connection.execute(q, [formId]);
  if (r.length === 0) {
    throw new FormNotAvailable('We could not find the form data');
  }

  return r;
};

module.exports = { insertNewForm, insertNewFields, fieldsAndValuesByForm };
