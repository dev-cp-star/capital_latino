const userSchema = require("./user");

const dbModels = (db) => {
  db.model("user", userSchema);

  return db;
};

module.exports = dbModels;
