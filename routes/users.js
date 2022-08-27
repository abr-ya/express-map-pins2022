const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save user and respond
    const user = await newUser.save();
    res.status(201).json(user._id);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async ({ body: { username, password }}, res) => {
  try {
    const WRONG_MESSAGE = "Wrong username or password"
    // find user
    const user = await User.findOne({ username });

    // validate password & send response
    const validPassword = user && await bcrypt.compare(password, user.password);
    if (validPassword) {
      res.status(200).json({ _id: user._id, username: user.username });
    } else {
      res.status(400).json(WRONG_MESSAGE);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
