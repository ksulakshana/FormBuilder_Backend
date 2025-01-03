const express = require("express");
const dotenv = require("dotenv");
const { Form } = require("../schema/form.schema");
const { Fields } = require("../schema/fields.schema");

const router = express.Router();
dotenv.config();

/***********************user form start Code *************************** */

router.post("/startUserForm/:id", async (req, res) => {
  try {
    const formId = req.params.id;
    const { fieldCount, fieldName, type, values, startDate, completionDate } =
      req.body.fieldData;

    const ifFormExists = await Form.findById(formId);
    if (!ifFormExists) {
      return res.status(400).json({ message: "Form does not Exists" });
    }

    const userform = new Fields({
      formId: formId,
      fieldCount: fieldCount,
      fieldName: fieldName,
      type: type,
      values: values,
      startDate: startDate,
      completedDate: completionDate,
    });

    await userform.save();

    return res
      .status(201)
      .json({ message: "User Form Data Inserted successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/**************************user form completed code********************* */
router.post("/completeUserForm/:id", async (req, res) => {
  try {
    const formId = req.params.id;

    let ts = Date.now();

    let date_time = new Date(ts);
    let date = date_time.getDate();
    let month = date_time.getMonth() + 1;
    let year = date_time.getFullYear();

    let newDate = date + "-" + month + "-" + year;

    const ifFormExists = await Form.findById(formId);
    if (!ifFormExists) {
      return res.status(400).json({ message: "Form does not Exists" });
    }

    const userform = new Fields({
      formId: formId,
      fieldArray: req.body,
      startDate: "",
      completedDate: newDate,
    });

    await userform.save();

    return res
      .status(201)
      .json({ message: "User Form Data Inserted successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
/*********************GET form data************* */
router.get("/:id", async (req, res) => {
  try {
    const formId = req.params.id;
    const userFormData = await Fields.find({ formId: formId });

    if (!userFormData) {
      return res.status(400).json({ message: "No Results" });
    }
    return res.status(200).json({ userFormData });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
