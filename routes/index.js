const express = require("express");
const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("Hello from Project Management App");
});

module.exports = router;
