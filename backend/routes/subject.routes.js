const express = require("express");
const { SubjectModel } = require("../models");
const { JwtService } = require("../services");

const SubjectRouter = express.Router();

SubjectRouter.get("/", async (req, res) => {
  try {
    const subjects = await SubjectModel.find({}).populate("questions");
    res.status(200).send(subjects);
  } catch (err) {
    res.status(500).send(err);
  }
});

SubjectRouter.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const subject = await SubjectModel.find({ _id }).populate("questions");
    res.status(200).send(subject);
  } catch (err) {
    res.status(500).send(err);
  }
});

SubjectRouter.post("/", JwtService.isAdmin, async (req, res) => {
  try {
    const subject = await SubjectModel.create({ ...req.body }).populate(
      "questions"
    );
    res.status(200).send(subject);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = SubjectRouter;
