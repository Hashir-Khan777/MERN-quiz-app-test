const express = require("express");
const { UserModel } = require("../models");
const {
  JwtService,
  BcryptService,
  CloudinaryService,
  MulterService,
} = require("../services");

const AuthRouter = express.Router();

AuthRouter.post("/register", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const isUserAlreadyExist = await UserModel.findOne({ phone });
    if (isUserAlreadyExist) {
      return res.status(403).send({ message: "You are already registered" });
    }
    req.body.password = await BcryptService.bcryptPassword(password);
    const user = await UserModel.create({ ...req.body });
    res.status(200).send({
      ...user._doc,
      token: JwtService.generateToken(user._doc, "30d"),
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

AuthRouter.post(
  "/upload/image",
  MulterService.single("image"),
  async (req, res) => {
    try {
      const { folderName } = req.body;
      const { path } = req.file;
      const image = await CloudinaryService.uploadImage(path, folderName);
      res.status(200).send({ image });
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

AuthRouter.post("/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await UserModel.findOne({ phone });
    if (user) {
      const isPasswordCorrect = await BcryptService.comparePassword(
        password,
        user.password
      );
      if (isPasswordCorrect) {
        return res.status(200).send({
          ...user._doc,
          token: JwtService.generateToken(user._doc, "30d"),
        });
      }
      return res.status(403).send({ message: "Incorrect password" });
    }
    return res.status(404).send({ message: "Please register yourself" });
  } catch (err) {
    res.status(500).send(err);
  }
});

AuthRouter.post("/admin/login", async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await UserModel.findOne({ phone, role: "admin" });
    if (user) {
      const isPasswordCorrect = await BcryptService.comparePassword(
        password,
        user.password
      );
      if (isPasswordCorrect) {
        return res.status(200).send({
          ...user._doc,
          token: JwtService.generateToken(user._doc, "30d"),
        });
      }
      return res.status(403).send({ message: "Incorrect password" });
    }
    return res.status(404).send({ message: "You are not an admin" });
  } catch (err) {
    res.status(500).send(err);
  }
});

AuthRouter.get("/verify/user", JwtService.isAuth, async (req, res) => {
  try {
    const { user } = req;
    if (user) {
      const userModel = await UserModel.findOne({ _id: user?._id });
      return res.status(200).send(userModel);
    }
    return res.status(404).send({ message: "Please register yourself" });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = AuthRouter;
