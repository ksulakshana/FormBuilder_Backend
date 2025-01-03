const express = require("express");
const dotenv = require("dotenv");
const { User } = require("../schema/user.schema");
const { Workspace } = require("../schema/workspace.schema");

const authMiddleware = require("../middleware/auth");

const router = express.Router();
dotenv.config();

/***********************Register Code *************************** */

router.post("/shareWorkspace", async (req, res) => {
  try {
    const { email, workspace_name, editMode } = req.body;
    const { user } = req;
    const ifUserExists = await User.findOne({ email });
    if (ifUserExists) {
      const userId = ifUserExists._id;
      const workspace = new Workspace({
        name: workspace_name,
        creator: user,
        sharedWith: userId,
        editMode,
      });
      await workspace.save();
      return res.status(201).json({ message: "workspace shared successfully" });
    }
    res.status(400).json({ message: e.message });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
});

/*********************GET workspace************* */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const wid = req.params.id;
    const { user } = req;
    // const workspaceData = await Workspace.find({ sharedWith: user });
    const workspaceData = await Workspace.find({
      $and: [
        {
          //   $or: [{ creator: user }, { sharedWith: user }],
          sharedWith: user,
        },
        {
          _id: wid,
        },
      ],
    });

    if (!workspaceData) {
      return res.status(400).json({ message: "Workspace does not Exists" });
    }
    res.status(200).json({ workspaceData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

/*************************get all workspaces for user*************************************** */
/*********************GET workspace************* */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { user } = req;
    const workspaceData = await Workspace.find({ sharedWith: user });

    if (!workspaceData) {
      return res.status(400).json({ message: "Workspace does not Exists" });
    }
    res.status(200).json({ workspaceData });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});
/**********************PUT => update user info****************************** */
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    let { user } = req;
    let { workspaceId } = req._id;
    // let workspaceData = await Workspace.findByIdAndUpdate(
    //   workspaceId,
    //   req.body,
    //   { new: true }
    // );

    let workspaceData = await Workspace.findOneAndUpdate({
      $and: [
        {
          //   $or: [{ creator: user }, { sharedWith: user }],
          sharedWith: user,
        },
        {
          _id: workspaceId,
        },
      ],
    });

    if (!workspaceData) {
      return res
        .status(400)
        .json({ message: "Workspace data does not Exists" });
    }
    res.status(200).json(workspaceData);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
