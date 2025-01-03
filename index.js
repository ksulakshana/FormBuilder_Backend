const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const { incomingRequestLogger } = require("./middleware/index");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const workspaceRouter = require("./routes/workspace");
const folderRouter = require("./routes/folder");
const formRouter = require("./routes/form");
const userFormRouter = require("./routes/userForm");
const userFormSubmission = require("./routes/formSubmission");

const app = express();

dotenv.config();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(incomingRequestLogger);
app.use("/api/v1", indexRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/workspace", workspaceRouter);
app.use("/api/v1/folder", folderRouter);
app.use("/api/v1/form", formRouter);
app.use("/api/v1/userform", userFormRouter);
app.use("/api/v1/userformcount", userFormSubmission);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  mongoose.connect(process.env.MONGOOSE_URI_STRING);

  mongoose.connection.on("connected", () => {
    console.log("connected");
  });

  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
});
