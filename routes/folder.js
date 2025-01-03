const express = require("express");
const dotenv = require("dotenv");
const { User } = require("../schema/user.schema");
const { Workspace } = require("../schema/workspace.schema");
const { Folder } = require("../schema/folder.schema");
const { Form } = require("../schema/form.schema");

const authMiddleware = require("../middleware/auth");

const router = express.Router();
dotenv.config();

/***********************Register Code *************************** */

router.post("/createFolder", authMiddleware, async (req, res) => {
  try {
    const { title, workspace } = req.body;
    const { user } = req;
    const ifworkspaceExists = await Workspace.findById(workspace);
    if (ifworkspaceExists) {
      const folder = new Folder({
        name: title,
        creator: user,
        workspace: workspace,
      });
      await folder.save();
      return res.status(201).json({ message: "Folder created successfully" });
    }
    res.status(400).json({ message: "error occurred" });
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

/**************************get all files w.r.t folder***************** */
router.get("/form/:id", authMiddleware, async (req, res) => {
  try {
    let folderId = req.params.id;
    const { user } = req;

    if (folderId == "undefined") {
      folderId = "";
    }
    const formData = await Form.find({
      $and: [
        {
          folderId: folderId,
        },
        {
          creator: user,
        },
      ],
    });

    if (!formData) {
      return res.status(400).json({ message: "No Folders for this workspace" });
    }
    return res.status(200).json({ formData });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
