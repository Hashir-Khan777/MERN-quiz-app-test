const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    marks: {
      type: Number,
      required: [true, "marks are required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", ResultSchema);
