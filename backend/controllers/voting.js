import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

import VotingSession from "../models/votingSession.js";
import User from "../models/user.js";

const getAllVotingSessions = asyncHandler(async (req, res) => {
  const allVotingSessions = await VotingSession.find({ isGoingOn: true });

  if (!allVotingSessions) {
    res.status(404);
    throw new Error("No voting session found.");
  }

  return res.json({ allVotingSessions }).status(200);
});

const addVotingSession = asyncHandler(async (req, res) => {
  const { candidates, nameOfSession, creatorId } = req.body;
  const creatorIdAsMongooseId = mongoose.Types.ObjectId(creatorId);

  for (let i = 0; i < candidates.length; i++) {
    const existingUserInDatabase = await User.find({ _id: candidates[i]._id });

    if (!existingUserInDatabase) {
      res.status(400);
      throw new Error("Invalid new voting session data.");
    }

    candidates[i] = {
      ...candidates[i],
      name: existingUserInDatabase[0].name,
    };
  }

  const createdVotingSession = await VotingSession.create({
    candidates,
    nameOfSession,
    creatorId: creatorIdAsMongooseId,
  });

  if (createdVotingSession) {
    res.status(201).json({
      _id: createdVotingSession._id,
      nameOfSession: createdVotingSession.nameOfSession,
      creatorId: createdVotingSession.creatorId,
      candidates: createdVotingSession.candidates,
      voteCountForThisCandidate: 0,
    });
  } else {
    res.status(400);
    throw new Error("Invalid new voting session data.");
  }
});

const endAVotingSession = asyncHandler(async (req, res) => {
  await VotingSession.updateOne(
    {
      _id: mongoose.Types.ObjectId(req.params.id),
    },
    {
      isGoingOn: false,
      dateEnded: Date.now(),
    }
  );
});

export { addVotingSession, getAllVotingSessions, endAVotingSession };
