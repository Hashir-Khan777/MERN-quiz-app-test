const express = require("express");
const { QuestionModel } = require("../models");
const { JwtService } = require("../services");

const QuestionRouter = express.Router();

QuestionRouter.post("/", JwtService.isAdmin, async (req, res) => {
  try {
    const question = await QuestionModel.create({ ...req.body });
    res.status(200).send(question);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = QuestionRouter;
