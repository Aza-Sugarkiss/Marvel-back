const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const User = require("../models/User");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    if (user) {
      if (
        SHA256(req.fields.password + user.salt).toString(encBase64) ===
        user.hash
      ) {
        res.status(200).json({
          _id: user._id,
          token: user.token,
          account: user.account,
        });
      } else {
        res.status(401).json({ error: "Unauthorized" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.fields.email,
    });
    if (!user) {
      const token = uid2(64);
      const salt = uid2(64);
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      const newUser = new User({
        email: req.fields.email,
        account: {
          username: req.fields.username,
          token: token,
          hash: hash,
          salt: salt,
        },
      });
      await newUser.save();
      res.status(200).json(newUser);
    } else {
      res
        .status(409)
        .json({ error: { message: "This email already has an account" } });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
