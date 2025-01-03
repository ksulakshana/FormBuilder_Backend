const express = require("express");
const dotenv = require("dotenv");
const { User } = require("../schema/user.schema");
const { Workspace } = require("../schema/workspace.schema");
const { Folder } = require("../schema/folder.schema");
const { Form } = require("../schema/form.schema");
const { Fields } = require("../schema/fields.schema");

const authMiddleware = require("../middleware/auth");

const router = express.Router();
dotenv.config();

/***********************Register Code *************************** */

router.post("/createForm", authMiddleware, async (req, res) => {
  try {
    const title = req.body[0].title;
    const fieldData = req.body[1].fieldData;
    const workspaceId = req.body[2].wsId;
    var theRemovedElement = fieldData.shift();
    const { user } = req;
    const ifFormExists = await Form.findOne({ name: title });
    if (ifFormExists) {
      return res.status(400).json({ message: "File Name Exists" });
    }

    var newFieldArray = [];

    fieldData.forEach((element, index, array) => {
      const fieldName = array[index].fieldName;
      const fieldCount = array[index].fieldCount;
      const fieldType1 = array[index].type;
      const fieldValues = array[index].values;

      const formFields = {
        fieldCount: fieldCount,
        fieldName: fieldName,
        type: fieldType1,
        values: fieldValues,
      };
      newFieldArray.push(formFields);
    });

    const form = new Form({
      name: title,
      fields: newFieldArray,
      folderId: "",
      workspaceId: workspaceId,
      creator: user,
    });

    await form.save();

    return res.status(201).json({ message: "Form created successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/*********************GET form w.r.t workspace Id************* */
router.get("/:id", async (req, res) => {
  try {
    const fid = req.params.id;
    const formData = await Form.findById(fid);

    if (!formData) {
      return res.status(400).json({ message: "No Form" });
    }
    return res.status(200).json({ formData });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/******************************delete form****************************** */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const fid = req.params.id;
    const formData = await Form.findById(fid);

    if (!formData) {
      return res.status(400).json({ message: "No Form" });
    }

    const delForm = await Form.findByIdAndDelete(formData);
    return res.status(200).json({ delForm });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
