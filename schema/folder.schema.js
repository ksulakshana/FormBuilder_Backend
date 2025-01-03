const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./user.schema");
const { Workspace } = require("./workspace.schema");

const folderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  workspace: {
    type: String,
    // ref: "Workspace",
  },
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = {
  Folder,
};
