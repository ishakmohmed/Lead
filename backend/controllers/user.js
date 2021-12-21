import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
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
  const { id, userInfo } = req.body;
  const salt = await bcrypt.genSalt(10);
  let user = await User.findOne({
    _id: mongoose.Types.ObjectId(id),
  });

  user.name = userInfo.name;
  user.email = userInfo.email;
  user.profilePic = userInfo.profilePic;
  user.bio = userInfo.bio;
  user.password = userInfo.password;

  await user.save();
});

export {
  authenticateUser,
  getAllUsers,
  getDetailsOfAUser,
  registerUser,
  updateUser,
};
