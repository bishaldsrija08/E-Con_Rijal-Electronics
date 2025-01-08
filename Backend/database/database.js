//Database Connection Code
const mongoose = require("mongoose");
const User = require("../model/userModel");
const adminSeeder = require("../adminSeeder");
exports.connectDatabase = async () => {

  //Connecting to DataBase code goes here
try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully!");
} catch (error) {
    console.log(error)
}

//admin seed function invoke
adminSeeder()
 }