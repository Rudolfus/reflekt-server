const { Schema, model } = require("mongoose");

const answerSchema = new Schema(
  {
    answer: {
      type: String,
      required: [true, "Please include an answer."],
      maxLength: 140,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Answer = model("Answer", answerSchema);

module.exports = Answer;
