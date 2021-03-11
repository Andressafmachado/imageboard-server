const express = require("express");
const User = require("../models").user;
const { Router } = express;
const bcrypt = require("bcrypt");

const router = new Router();

// router.get("/", (request, response) => response.send("Welcome to user!"));

router.get("/", async (req, res, next) => {
  try {
    console.log("Im getting all the users");
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    next(e);
  }
});

//Create a new user
router.post("/", async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    if (
      !email ||
      email === " " ||
      !password ||
      password === " " ||
      !fullName ||
      fullName === " "
    ) {
      res.status(400).send("Must provide email, password and fullName");
    } else {
      const newUser = await User.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.json(newUser);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
