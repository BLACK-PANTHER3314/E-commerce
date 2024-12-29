const mongoose = require("mongoose");
const User = require("../models/users");
const JWT = require("jsonwebtoken");

const {
  hashPassword,
  comparePassword,
} = require("../utilities or helpers/authHelper");
module.exports.registerController = async (req, res) => {
  try {
    const { name, email, password, role, address, phone } = req.body;
    //validation server-side
    if (!name) {
      return res.json({ message: "Name is Required" });
    }
    if (!email) {
      return res.json({ message: "Email is Required" });
    }
    if (!password) {
      return res.json({ message: "Password is Required" });
    }
    // if (!role) {
    //   return res.json({ message: "Name is Required" });
    // }
    if (!address) {
      return res.json({ message: "Address is Required" });
    }
    if (!phone) {
      return res.json({ message: "Phone is Required" });
    }

    //check user exist
    let user = await User.findOne({ email: email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    //if user is not exist then create one (new user)
    if (!user) {
      const hashedPassword = await hashPassword(password);
      let newUser = await new User({
        name: name,
        email: email,
        password: hashedPassword,
        role: role,
        address: address,
        phone: phone,
      });
      newUser
        .save()
        .then(
          res.status(200).json({ message: "User is Created", user: newUser })
        );
    }
  } catch (error) {
    const { email, password } = req.body;
    res.status(500).json({ message: "error in registration", error: error });
    console.log("Error:", error);
  }
};

// loginController

module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res
        .status(404)
        .json({ message: "Email or Password are Required" });
    }
    //user verification
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User is not register" });
    }
    //password verification  (compare hashed password)
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(200).json({ message: "Invalid Password" });
    }
    //generate token
    if (matchPassword) {
      const token = JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
        expiresIn: "7d",
      });
      console.log("token", token);
      res.status(200).json({
        message: "login successfully",
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          address: user.address,
          phone: user.phone,
        },
        token: token,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "error in Login", error: error });
    console.log("Error:", error);
  }
};

//test controller
module.exports.testController = async (req, res) => {
  res.json({ message: "Test Controller Working" });
};
