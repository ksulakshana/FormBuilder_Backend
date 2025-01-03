const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { User } = require("./user.schema");

const dashboardVisibilitySchema = new Schema({
  dashboardOwner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  userSharedWith: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  editMode: {
    type: Boolean,
  },
});

const DashboardVisibility = mongoose.model(
  "DashboardVisibility",
  dashboardVisibilitySchema
);

module.exports = {
  DashboardVisibility,
};
