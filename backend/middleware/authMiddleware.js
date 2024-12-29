const JWT = require("jsonwebtoken");
const User = require("../models/users");

// user protected routes token based

module.exports.requireSignIN = (req, res, next) => {
  try {
    const decode = JWT.verify(req.headers.authorization, process.env.JWT_KEY); // check both keys are same
    // console.log("decode:", decode); // it contain decode id= user id who signed, it give exp and making date
    req.user = decode; // in this maybe we add user in req with it value =decode. it use in isAdmin middleware

    // console.log("user:", req.user);

    next();
    //here we just compare token code(string ) with req token string
  } catch (error) {
    console.log("Error by middleware:requireSignIn", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

// isAdmin(admin access)
// Middleware to check if the user is an admin
module.exports.isAdmin = async (req, res, next) => {
  try {
    let user = await User.findById(req.user._id);
    if (user.role === 1) {
      next();
    }
    return res
      .status(403)
      .json({ message: "Forbidden. You are not an admin." });
  } catch (error) {
    console.log("Error in isAdmin middleware:", error);

    res.status(500).json({
      message: "Internal server error check admin middleware.",
      error: error,
    });
  }
};
