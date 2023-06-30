const express = require("express");
const { ResultModel } = require("../models");
const { JwtService } = require("../services");

const ResultRouter = express.Router();

ResultRouter.get("/", JwtService.isAdmin, async (req, res) => {
  try {
    const results = await ResultModel.find({});
    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

ResultRouter.get("/:_id", JwtService.isAuth, async (req, res) => {
  try {
    const { _id } = req.params;
    const result = await ResultModel.find({ _id });
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

ResultRouter.post("/", JwtService.isAuth, async (req, res) => {
  try {
    await ResultModel.create({ ...req.body });
    res.status(200).send({ message: "Result has been created" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = ResultRouter;
