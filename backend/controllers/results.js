import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

import VotingSession from "../models/votingSession.js";

const getAllEndedVotingSessions = asyncHandler(async (req, res) => {
  const allVotingSessions = await VotingSession.find({ isGoingOn: false });

  if (!allVotingSessions) {
    res.status(404);
    throw new Error("No voting session found.");
  }

  return res.json({ allVotingSessions }).status(200);
});

export {
  getAllEndedVotingSessions,
};
