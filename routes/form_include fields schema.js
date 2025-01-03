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
    console.log(req.body);

    // const { title, fieldData } = req.body;
    // console.log(fields);
    const title = req.body[0].title;
    const fieldData = req.body[1].fieldData;
    var theRemovedElement = fieldData.shift();
    const { user } = req;
    const ifFormExists = await Form.find({ name: title });
    if (ifFormExists) {
      res.status(400).json({ message: "File Name Exists" });
    }

    // const myArray = [{ x: 100 }, { x: 200 }, { x: 300 }];
    // myArray.forEach((element, index, array) => {
    //   console.log(element.x); // 100, 200, 300
    //   console.log(index); // 0, 1, 2
    //   console.log(array); // same myArray object 3 times
    // });

    var newFieldArray = [];
    fieldData.forEach((element, index, array) => {
      //   console.log(index);
      //   console.log(array[index]);
      //   console.log(array[index].fieldName);
      const fieldName = array[index].fieldName;
      const fieldCount = array[index].fieldCount;
      const fieldType1 = array[index].type;
      const fieldValues = array[index].values;
      //   const formFields = new Fields({
      //     fieldCount,
      //     fieldName,
      //     type: fieldType1,
      //     values: fieldValues,
      //   });
      const formFields = {
        fieldCount: fieldCount,
        fieldName: fieldName,
        type: fieldType1,
        values: fieldValues,
      };
      newFieldArray.push(formFields);
      //   console.log(formFields);
      //   formFields.save();

      //   const form = new Form({
      //     name: title,
      //     fields: formFields,
      //     foldeId: "",
      //   });

      //   form.save();
    });
    console.log(newFieldArray);
    const form = new Form({
      name: title,
      fields: newFieldArray,
      foldeId: "",
    });

    form.save();
    // await formFields.save();
    // return;
    // const fieldData = new Fields({});
    // await folder.save();
    // return res.status(201).json({ message: "Folder created successfully" });

    // res.status(400).json({ message: "error occurred" });
  } catch (e) {
    console.log(e.message);
    return res.status(400).json({ message: e.message });
  }
});

/*********************GET folder w.r.t workspace Id************* */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const workspaceId = req.params.id;
    const folderData = await Folder.find({ workspace: workspaceId });

    if (!folderData) {
      return res.status(400).json({ message: "No Folders for this workspace" });
    }
    res.status(200).json({ folderData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/******************************delete folder****************************** */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const folderId = req.params.id;
    const folderData = await Folder.findById(folderId);

    if (!folderData) {
      return res.status(400).json({ message: "No Folder" });
    }

    const delFolder = await Folder.findByIdAndDelete(folderId);
    res.status(200).json({ delFolder });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
