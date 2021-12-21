import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

import generateToken from "../utils/generateToken.js";
import User from "../models/user.js";

const getAllUsers = asyncHandler(async (req, res) => {
  const allUsers = await User.find({});

  if (allUsers) res.json(allUsers);
  else {
    res.status(404);
    throw new Error("Database has no user.");
  }
});

const getDetailsOfAUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({
    _id: mongoose.Types.ObjectId(req.params.id),
  });

  if (user) res.json({ user });
  else {
    res.status(404);
    throw new Error("User does not exist.");
  }
});

const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password)))
    res.json(generateToken(user._id));
  else {
    res.status(401);
    throw new Error("Invalid email or password.");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, bio, profilePic, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(400);
    throw new Error("User already exists.");
  }

  const createdUser = await User.create({
    name,
    email,
    bio,
    profilePic,
    password,
  });

  if (createdUser) {
    res.status(201).json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      bio: createdUser.bio,
      profilePic,
      token: generateToken(createdUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

const updateUser = asyncHandler(async (req, res) => {
  console.log("reached");

  console.log("the request is ", req.body);
  // const { profilePic, name, email, bio, password } = req.body;
  // const user = await User.findOne({ email });
});

export {
  authenticateUser,
  getAllUsers,
  getDetailsOfAUser,
  registerUser,
  updateUser,
};
