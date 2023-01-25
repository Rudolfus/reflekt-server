const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: [true, "Please include a question."],
      maxLength: 140,
    },
    topic: {
      type: String,
      required: [true, "Please inlcude a topic."],
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
    answerCount: {
      type: Number,
      default: 0,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Question = model("Question", questionSchema);

module.exports = Question;
