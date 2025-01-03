const express = require("express");
const dotenv = require("dotenv");
const { Fields } = require("../schema/fields.schema");
const { FormSubmission } = require("../schema/formSubmissionCount.schema");

const router = express.Router();
dotenv.config();

/***********************View Record Add *************************** */

router.post("/addViewCount", async (req, res) => {
  try {
    const { formId } = req.body;
    const formViewed = true;

    const ifFormExists = await Fields.findOne({ formId: formId });
    if (!ifFormExists) {
      return res.status(400).json({ message: "Form Does Not Exists" });
    }

    const formSubmission = new FormSubmission({
      formId: formId,
      formViewed: formViewed,
    });
    await formSubmission.save();

    return res.status(201).json({ message: "Form viewed added successfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

/***********************Start Record Add *************************** */

router.post("/addStartCount", async (req, res) => {
  try {
    const { formId } = req.body;
    const formStarted = true;
    const ifFormExists = await Fields.findOne({ formId: formId });
    if (!ifFormExists) {
      return res.status(400).json({ message: "Form Does Not Exists" });
    }

    const formSubmission = new FormSubmission({
      formId: formId,
      formStarted: formStarted,
    });

    await formSubmission.save();

    return res.status(201).json({ message: "Form viewed added successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

/***********************Completed Record Add *************************** */

router.post("/addCompleteCount", async (req, res) => {
  try {
    const { formId } = req.body;
    const formSubmitted = true;

    const ifFormExists = await Fields.findOne({ formId: formId });
    if (!ifFormExists) {
      return res.status(400).json({ message: "Form Does Not Exists" });
    }

    const formSubmission = new FormSubmission({
      formId: formId,
      formSubmitted: formSubmitted,
    });

    await formSubmission.save();

    return res.status(201).json({ message: "Form viewed added successfully" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
/*********************GET form w.r.t workspace Id************* */
router.get("/count/:id", async (req, res) => {
  try {
    const formId = req.params.id;
    var viewCount = 0;
    var startCount = 0;
    var submissionCount = 0;

    const ifFormExists = await Fields.findOne({
      formId: formId,
    });
    if (!ifFormExists) {
      return res.status(400).json({ message: "Form Data Does Not Exists" });
    }

    const viewQuery = await FormSubmission.find({
      $and: [
        {
          formId: formId,
        },
        {
          formViewed: true,
        },
      ],
    });

    const startQuery = await FormSubmission.find({
      $and: [
        {
          formId: formId,
        },
        {
          formStarted: true,
        },
      ],
    });

    const submitQuery = await FormSubmission.find({
      $and: [
        {
          formId: formId,
        },
        {
          formSubmitted: true,
        },
      ],
    });

    viewCount = viewQuery.length;
    startCount = startQuery.length;
    submissionCount = submitQuery.length;

    const totalCount = { viewCount, startCount, submissionCount };
    return res.status(200).json({ totalCount });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
