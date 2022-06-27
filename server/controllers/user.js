const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ msg: "User with given email doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ msg: "Invalid password" });

    const userForToken = {
      email: user.email,
      id: user._id,
      isAdmin: user.isAdmin,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: passwordHash,
    isAdmin: req.body.isAdmin || false,
  });

  try {
    const savedUser = await newUser.save();

    const userForToken = {
      email: savedUser.email,
      id: savedUser._id,
      isAdmin: savedUser.isAdmin,
    };

    const token = jwt.sign(userForToken, process.env.JWT_SECRET);

    res.status(200).json({ user: savedUser, token });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  login,
  register,
};
