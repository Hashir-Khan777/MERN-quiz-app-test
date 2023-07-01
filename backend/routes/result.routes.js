const express = require("express");
const { ResultModel, SubjectModel } = require("../models");
const { JwtService } = require("../services");

const ResultRouter = express.Router();

ResultRouter.get("/", JwtService.isAdmin, async (req, res) => {
  try {
    const results = await ResultModel.find({}).populate([
      {
        path: "subject",
        populate: {
          path: "questions",
        },
      },
      { path: "student" },
    ]);
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

ResultRouter.get("/:subject/:student", JwtService.isAuth, async (req, res) => {
  try {
    const { subject, student } = req.params;
    const result = await ResultModel.findOne({ student, subject }).populate([
      {
        path: "subject",
        populate: {
          path: "questions",
        },
      },
      { path: "student" },
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

ResultRouter.post("/", JwtService.isAuth, async (req, res) => {
  try {
    await SubjectModel.findOneAndUpdate(
      { _id: req.body.subject },
      { $addToSet: { attempted: req.body.student } },
      { new: true }
    );
    const createdResult = await ResultModel.create({ ...req.body });
    const result = await ResultModel.findOne({
      _id: createdResult._id,
    }).populate([
      {
        path: "subject",
        populate: {
          path: "questions",
        },
      },
      { path: "student" },
    ]);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = ResultRouter;
