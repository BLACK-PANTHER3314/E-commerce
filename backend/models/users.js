const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // minlength: 5,
      // maxlength: 30,
      trim: true,
      // unique: false,
    },
    password: {
      type: String,
      required: true,
      // minlength: 8,
      // maxlength: 24,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: true,
      minlength: 11,
    },
    address: {
      type: String,
      required: false,
      // minlength: 10,
      // maxlength: 100,
    },
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
