const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const newPass = await bcrypt.hash(req.body.password, 10);
  try {
    const newUser = await User.create({
      userName: req.body.userName,
      email: req.body.email,
      password: newPass,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET);
    res.status(200).json({ token, userName: newUser.userName});
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      res.status(400).json({ message: "Email is already taken" });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(401).json({ message: "Invalid Email or password" });
    }
    bcrypt.compare(password, existUser.password, (err, isMatch) => {
      if (err || !isMatch) {
        return res
          .status(401)
          .json({ message: "Invalid Username or password" });
      }
      const token = jwt.sign({ id: existUser._id }, process.env.SECRET);
      res.status(200).json({ token, userName: existUser.userName });
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.getUserData = async (req, res) => {
  const token = req.body.token;
  const userId = jwt.verify(token, `${process.env.SECRET}`);

  try {
    const UserData = await User.findOne({ _id: userId.id }).populate("cvs");
    return res.status(200).json(UserData);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
