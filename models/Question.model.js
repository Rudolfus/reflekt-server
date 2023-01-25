const { Schema, model } = require("mongoose");

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      maxLength: 140,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null /* null is used as a default value in the case
      that the user who created the question is not found in the database */,
    },
    deleted: {
      type: Boolean,
      default: false,
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
