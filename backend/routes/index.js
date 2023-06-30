const express = require("express");
const AuthRouter = require("./auth.routes");
const SubjectRouter = require("./subject.routes");
const QuestionRouter = require("./question.routes");
const ResultRouter = require("./result.routes");

const AppRouter = express.Router();

AppRouter.use("/auth", AuthRouter);
AppRouter.use("/subject", SubjectRouter);
AppRouter.use("/question", QuestionRouter);
AppRouter.use("/result", ResultRouter);

module.exports = AppRouter;
