// User login xa ki nai check gareko!
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const promisify = require("util").promisify;
const isAuthenticated = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: "Please send token!",
    });
  }
  //patahyo vane k garne
  //verify if the token is legit or not
  // jwt.verify(token, process.env.SECRET_KEY, (err,success)=>{
  //     if(err){
  //         res.status(400).json({
  //             message: "Something went wrong!"
  //         })
  //     }else{
  //         res.status(200).json({
  //             message: "Valid token"
  //         })
  //     }
  // })

  // Alternative
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    const doesUserExist = await User.findOne({ _id: decoded.id });

    if (!doesUserExist) {
      return res.status(404).json({
        message: "User doesn't exists with the token/id.",
      });
    }
    req.user = doesUserExist;

    next();
    // console.log(decoded);

    // if (!decoded) {
    //   return res.status(403).json({
    //     message: "Don't try to do this!",
    //   });
    // }
  } catch (error) {
    res.status(500).json({
      message: "Don't try to do this.",
    });
  }

  //Chec if decoded.id(userId) exists in the user talbe
};

module.exports = isAuthenticated;
