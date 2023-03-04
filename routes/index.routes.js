const express = require("express");
const Question = require("../models/Question.model");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// keep me alive: Sends an http request to an endpoint that makes an operation with the database.

const QuestionModel = require("../models/Question.model");

router.get("/keep-alive", (req, res, next) => {
  Question.find()
    .then(() => {
      res.status(200).json({ message: "It worked" });
    })
    .catch(() => {
      res.status(500).json({ message: "It didn't work" });
    });
});

module.exports = router;
