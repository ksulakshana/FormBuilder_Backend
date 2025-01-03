const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./user.schema");
const { Workspace } = require("./workspace.schema");

const formSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  fields: {
    type: Array,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  folderId: {
    type: String,
  },
  workspaceId: {
    type: mongoose.Schema.ObjectId,
    ref: "Workspace",
    required: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = {
  Form,
};
