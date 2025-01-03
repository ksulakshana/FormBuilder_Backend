const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./user.schema");

const workspaceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  sharedWith: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  editMode: {
    type: Boolean,
    default: true,
  },
});

const Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = {
  Workspace,
};
