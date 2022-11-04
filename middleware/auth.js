const jwt  = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports = async (req, res, next) => {
  try {
    const token        = req.headers.authorization;
    const tokenSplit   = token.split(" ")[1];
    const decodedToken = jwt.verify(tokenSplit, process.env.SECRET);

    const user = await User.findOne({
      _id: decodedToken.id,
    });
    
    if (!user) {
      return res.status(400).json({
        message: "Invalid user credentials",
      });
    } else {
      res.locals._Id = decodedToken.id;
      res.locals._fullname = user.fullname;
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: "Unauthorized request!",
      message:
        "All requests to route are protected, Sign up or In to gain access!",
    });
  }
};
