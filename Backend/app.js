const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Tell NodeJS to use dotenv
require("dotenv").config();

const { connectDatabase } = require("./database/database");
const {
  loginUser,
  registerUser,
} = require("./controllers/auth/authController");

//Routes here
const authRoute = require("./routes/aut/authRoute");
const productRoute = require("./routes/product/productRoute");
const adminUserRoute = require('./routes/adminUser/adminUser')
const userReviewRoute = require('./routes/userReviewRoute/userReviewRout')

//Routes end here

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

//Handling routes here!
app.use("", authRoute);
app.use("", productRoute);
app.use("", adminUserRoute);
app.use("", userReviewRoute)

//telling node to give access to uploads
app.use(express.static("uploads"));

// Listen server
const port = process.env.PORT;
app.listen(port, (req, res) => {
  console.log(`Project Successfully runs at ${port}.`);
});