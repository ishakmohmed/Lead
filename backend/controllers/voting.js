import asyncHandler from "express-async-handler";
import VotingSession from "../models/votingSession.js";

const addVotingSession = asyncHandler(async (req, res) => {
  const { candidates, nameOfSession, creatorId } = req.body;

  console.log("ROUTE HANDLER HAS BEEN REACHED!!!!!!!!!!!!!!!!!!!!");
  console.log("1- candidates > ", candidates);
  console.log("2- nameOfSession > ", nameOfSession);
  console.log("3- creatorId > ", creatorId);

  // const user = await User.findOne({ email });

  // if (user) {
  //   res.status(400);
  //   throw new Error("User already exists.");
  // }

  // const createdUser = await User.create({
  //   name,
  //   email,
  //   bio,
  //   profilePic,
  //   password,
  // });

  // if (createdUser) {
  //   res.status(201).json({
  //     _id: createdUser._id,
  //     name: createdUser.name,
  //     email: createdUser.email,
  //     bio: createdUser.bio,
  //     profilePic,
  //     token: generateToken(createdUser._id),
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error("Invalid user data.");
  // }
});

export { addVotingSession };
