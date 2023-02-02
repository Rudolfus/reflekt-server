const router = require("express").Router();
const mongoose = require("mongoose");

const Question = require("../models/Question.model");
const User = require("../models/User.model");

//  POST /api/questions  -  Creates a new question
router.post("/questions", (req, res, next) => {
  const { question, topic, isPublic } = req.body;

  let newQuestion;

  Question.create({ question, topic, isPublic })
    .then((questionCreated) => {
      newQuestion = questionCreated._id;

      return User.findByIdAndUpdate(
        req.payload._id,
        {
          $push: {
            questions: newQuestion,
          },
        },
        { new: true }
      );
    })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      console.log("error creating new question", err);
      res.status(500).json(err);
    });
});

// GET /api/questions -  Retrieves all of the questions
router.get("/questions", (req, res, next) => {
  Question.find()
    .then((allQuestions) => res.json(allQuestions))
    .catch((err) => {
      console.log("error getting all questions", err);
      res.status(500).json(err);
    });
});

//  GET /api/questions/:questionId -  Retrieves a specific question by id
router.get("/questions/:questionId", (req, res, next) => {
  const { questionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Question.findById(questionId)
    .then((question) => res.status(200).json(question))
    .catch((err) => {
      console.log("error getting question details from DB", err);
      res.status(500).json(err);
    });
});

// PUT  /api/questions/:questionId  -  Updates a specific question by id
router.put("/questions/:questionId", (req, res, next) => {
  const { questionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Question.findByIdAndUpdate(questionId, req.body, { new: true })
    .then((updatedQuestion) => res.json(updatedQuestion))
    .catch((err) => {
      console.log("error updating question", err);
      res.status(500).json(err);
    });
});

// DELETE  /api/questions/:questionId  -  Deletes a specific question by id
router.delete("/questions/:questionId", (req, res, next) => {
  const { questionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(questionId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Question.findByIdAndRemove(questionId)
    .then(() =>
      res.json({
        message: `Question with ${questionId} is removed successfully.`,
      })
    )
    .catch((err) => {
      console.log("error deleting question", err);
      res.status(500).json(err);
    });
});

module.exports = router;
