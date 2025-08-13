const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
  text: { type: String, required: true },
  value: {
    type: String,
    default: function () {
      return this.text;
    },
  },
  active: { type: Boolean, default: true },
});

const fieldSchema = new mongoose.Schema({
  name: { type: String, required: true },
  values: [valueSchema],
  active: { type: Boolean, default: true },
});

const formSchema = new mongoose.Schema({
  formId: Number,
  formName: String,
  fields: [fieldSchema],
  active: { type: Boolean, default: true },
});

module.exports = formSchema;
