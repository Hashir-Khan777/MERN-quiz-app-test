const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "question is required"],
    },
    marks: {
      type: Number,
      required: [true, "marks are required"],
    },
    correctAnswer: {
      type: String,
      required: [true, "correct answer is required"],
    },
    options: [
      {
        type: String,
        required: [true, "options are required"],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", QuestionSchema);
