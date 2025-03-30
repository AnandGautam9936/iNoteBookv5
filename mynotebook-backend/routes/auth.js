const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const { query, validationResult, body } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

JWT_Token = 'ThisisaJ$TsecertToken';

//Create a User using: POST "/api/auth/createuser" Doesn't require authentication
router.post(
  "/createuser",
  [
    body("email", "Enter a valid name!").isEmail(),
    body("name", "Enter a valid email!").isLength({ min: 3 }),
    body("password", "Enter a valid password!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // Creating a logic for the bad request
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    // If the user already exist with the same email that will be a bad request
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "A user with the same email alredy exists" });
      }

      //Creating a secure password
      var salt = bcrypt.genSaltSync(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      //Creating a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });

      const data = {
        user : {
          id: user.id
        }
      }
      var token = jwt.sign(data, JWT_Token);
      success = true;
      res.json({success, token});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

//Create a User using: POST "/api/auth/login" Doesn't require authentication
router.post(
  "/login",
  [
    body("email", "Enter a valid name!").isEmail(),
    body("password", "Enter a valid password!").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    // Creating a logic for the bad request
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    // If the user already exist with the same email that will be a bad request
    const {email, password} = req.body;
    try {
      const user = await User.findOne({email});
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ success, error: "Please try to login with coerrect creds." });
      }

      const isPasswordMatching = await bcrypt.compare(password, user.password);
      console.log(isPasswordMatching);
      if (!isPasswordMatching) {
        return res
          .status(400)
          .json({success, error: "Please try to login with coerrect creds." });
      }

      const data = {
        user : {
          id: user.id
        }
      }
      var token = jwt.sign(data, JWT_Token);
      success = true;
      console.log(token);
      res.json({success, token});
      
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);

//Create a User using: POST "/api/auth/getuser" require authentication
router.post(
  "/getuser", fetchuser,
  async (req, res) => {
    try {
      userid = req.user.id;
      const user = await User.findById(userid).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error.");
    }
  }
);


module.exports = router;
