const router = require("express").Router();

const mongoose = require("mongoose");

const Answer = require("../models/Answer.model");

//  POST /api/answers  -  Creates a new answer
router.post("/answers", (req, res, next) => {
  const { answer, isPublic } = req.body;

  Answer.create({ answer, isPublic })

    .then((response) => res.json(response))
    .catch((err) => {
      console.log("error creating new answer", err);
      res.status(500).json(err);
    });
});

// GET /api/answers -  Retrieves all of the answers
router.get("/answers", (req, res, next) => {
  Answer.find()
    .then((allAnswers) => res.json(allAnswers))
    .catch((err) => {
      console.log("error getting all answers", err);
      res.status(500).json(err);
    });
});

//  GET /api/answers/:answerId -  Retrieves a specific answer by id
router.get("/answers/:answerId", (req, res, next) => {
  const { answerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Answer.findById(answerId)
    .then((answer) => res.status(200).json(answer))
    .catch((err) => {
      console.log("error getting answer details from DB", err);
      res.status(500).json(err);
    });
});

// PUT  /api/answers/:answerId  -  Updates a specific answer by id
router.put("/answers/:answerId", (req, res, next) => {
  const { answerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Answer.findByIdAndUpdate(answerId, req.body, { new: true })
    .then((updatedAnswer) => res.json(updatedAnswer))
    .catch((err) => {
      console.log("error updating answer", err);
      res.status(500).json(err);
    });
});

// DELETE  /api/answers/:answerId  -  Deletes a specific answer by id
router.delete("/answers/:answerId", (req, res, next) => {
  const { answerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(answerId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Answer.findByIdAndRemove(answerId)
    .then(() =>
      res.json({
        message: `Answer with ${answerId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("error deleting answer", err);
      res.status(500).json(err);
    });
});

module.exports = router;
