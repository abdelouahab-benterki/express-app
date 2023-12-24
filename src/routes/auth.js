// Dependencies
const { Router } = require("express");

// Utilities
const { hashPassword } = require("../utils/helpers");

// DB Models
const User = require("../database/schemas/User");

// Passport
const passport = require("passport");

const authRouter = Router();

// Routes

// Login Route
authRouter.post("/login", passport.authenticate("local"), (req, res) => {
  console.log("Logged in");
  res.sendStatus(200);
});

// Register Route
authRouter.post("/register", async (req, res) => {
  const { email } = req.body;
  const userDB = await User.findOne({ email });
  if (userDB) {
    res.status(400).send({ msg: "User already exists!" });
  } else {
    const password = hashPassword(req.body.password);
    const newUser = await User.create({ email, password });
    res.sendStatus(201);
  }
});

// Auth Middleware
const authMiddleware = (req, res, next) => {
  if (req.user) next();
  else res.sendStatus(401);
};

module.exports = { authRouter, authMiddleware };
