const userSchema = require("./user");
const formSchema = require("./form");

const dbModels = (db) => {
  db.model("user", userSchema);
  db.model("form", formSchema);

  return db;
};

module.exports = dbModels;
