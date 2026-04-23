const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { username, password, pic } = req.body;

  if (!username || !password) {
    res.status(400);
    throw new Error("Please enter both username and password");
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    res.status(400);
    throw new Error("Username already exists");
  }

  const user = await User.create({
    username,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.name,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create the user");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user.id,
      username: user.name,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

// /api/user?search
const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        // check if url has smth like /api/user?search=tuomas
        username: { $regex: req.query.search, $options: "i" }, // compare usernames to esarch param, i means case-sensitive
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } }); // latter find excludes current logged in user.
  // ^ ne means not equal.
  res.send(users);
});

module.exports = { registerUser, authUser, allUsers };
