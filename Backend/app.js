const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

//Tell NodeJS to use dotenv
require("dotenv").config();
const { connectDatabase } = require("./database/database");

// DataBase connection function
connectDatabase();

//Form bata ako data buj vaneko talako linele
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Test API to check if server is live or not
app.get("/", (req, res) => {
  res.status(200).json({
    message: "I'm Live.",
  });
});

//Register user API
app.post("/register", async (req, res) => {
  const { email, password, phoneNumber, userName } = req.body;
  if (!email || !password || !phoneNumber || !userName) {
    return res.status(400).json({
      message: "Please provide email, password, phoneNumber",
    });
  }

  //Check if that email user is already registered or not.

  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User with this email is already exit's",
    });
  }

  //else
  await User.create({
    userName: userName,
    userPhoneNumber: phoneNumber,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
  });

  res.status(201).json({
    message: "User registered successfully!",
  });
});

// Login user API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide both email & password",
    });
  }

  //check if that email user already exists
  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(404).json({
      message: "User with that email is not Registered",
    });
  }

  //password check
  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);

  if (isMatched) {
// Generate Token - Token is a unique identifier
const token = jwt.sign({id: userFound[0]._id},process.env.SECRET_KEY,{
  expiresIn: '30d'
})

    res.status(200).json({
      message: "User logged in successfully",
      token
    });
  } else {
    res.status(404).json({
      message: "Invalid Password",
    });
  }
});

// Listen server
const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Project Successfully runs at ${port}.`);
});