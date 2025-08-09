const mongoose = require("mongoose");

const userSchema = mongoose.Schema({ email: String, password: String });

module.exports = userSchema;
