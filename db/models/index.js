const userSchema = require('./user');
const formSchema = require('./form');
const formsSchemas = require('./forms');

const dbModels = (db) => {
  db.model('user', userSchema);
  db.model('form', formSchema);
  db.model('formApplyInMinutes', formsSchemas.applyInMinutes);
  db.model('formApplyNow', formsSchemas.applyNow);
  return db;
};

module.exports = dbModels;
