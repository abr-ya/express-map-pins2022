const User = require("../models/User");
const router = require("express").Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    // generate new password

    // create new user

    // save user and respond

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    // find user

    // validate password

    // send response

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
