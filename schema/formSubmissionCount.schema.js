const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { Form } = require("./form.schema");

const formSubmissionCountSchema = new Schema({
  formId: {
    type: String,
  },
  formViewed: { type: Boolean, default: false },
  formStarted: { type: Boolean, default: false },
  formSubmitted: { type: Boolean, default: false },
});

const FormSubmission = mongoose.model(
  "FormSubmission",
  formSubmissionCountSchema
);

module.exports = {
  FormSubmission,
};
