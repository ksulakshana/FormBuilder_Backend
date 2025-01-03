const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Form } = require("./form.schema");

const fieldsSchema = new Schema({
  formId: {
    type: mongoose.Schema.ObjectId,
    ref: "Form",
  },
  fieldArray: {
    type: Array,
    default: undefined,
  },
  startDate: {
    type: Date,
    // default: Date.now,
  },
  completedDate: {
    type: Date,
  },
});

const Fields = mongoose.model("Fields", fieldsSchema);

module.exports = {
  Fields,
};
