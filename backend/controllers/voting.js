import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

import VotingSession from "../models/votingSession.js";
import User from "../models/user.js";

const getAllOngoingVotingSessions = asyncHandler(async (req, res) => {
  const allVotingSessions = await VotingSession.find({ isGoingOn: true });

  if (!allVotingSessions) {
    res.status(404);
    throw new Error("No voting session found.");
  }

  return res.json({ allVotingSessions }).status(200);
});

const getJustOneVotingSession = asyncHandler(async (req, res) => {
  const votingSession = await VotingSession.findOne({ _id: req.params.id });

  if (!votingSession) {
    res.status(404);
    throw new Error("Voting session is not found.");
  }

  return res.json({ votingSession }).status(200);
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
      bio: existingUserInDatabase[0].bio,
      name: existingUserInDatabase[0].name,
      voteCountForThisCandidate: 0,
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
    });
  } else {
    res.status(400);
    throw new Error("Invalid new voting session data.");
  }
});

const endAVotingSession = asyncHandler(async (req, res) => {
  const votingSession = await VotingSession.find({
    _id: mongoose.Types.ObjectId(req.params.id),
  });

  let arrayThatWillBeModified = votingSession[0].candidates.toObject();
  let highestVotersCountForThisSession =
    arrayThatWillBeModified[0].voteCountForThisCandidate;
  let winnerWithAllHisOrHerDetails = arrayThatWillBeModified[0];
  let isDraw = false;

  for (let i = 0; i < arrayThatWillBeModified.length; i++) {
    if (
      arrayThatWillBeModified[i].voteCountForThisCandidate >
      winnerWithAllHisOrHerDetails.voteCountForThisCandidate
    ) {
      highestVotersCountForThisSession =
        arrayThatWillBeModified[i].voteCountForThisCandidate;
      winnerWithAllHisOrHerDetails = arrayThatWillBeModified[i];
    }
  }

  for (let i = 0; i < arrayThatWillBeModified.length; i++) {
    if (
      arrayThatWillBeModified[i].voteCountForThisCandidate ==
        winnerWithAllHisOrHerDetails.voteCountForThisCandidate &&
      arrayThatWillBeModified[i]._id != winnerWithAllHisOrHerDetails._id
    )
      isDraw = true;
  }

  if (!isDraw) {
    await VotingSession.updateOne(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        isGoingOn: false,
        dateEnded: Date.now(),
        winnerId: mongoose.Types.ObjectId(winnerWithAllHisOrHerDetails._id),
        highestVotersCount: highestVotersCountForThisSession,
      }
    );
  } else {
    await VotingSession.updateOne(
      {
        _id: mongoose.Types.ObjectId(req.params.id),
      },
      {
        isGoingOn: false,
        dateEnded: Date.now(),
        isDraw: true,
        highestVotersCount: highestVotersCountForThisSession,
      }
    );
  }
});

const updateVotingSessionWithNewVote = asyncHandler(async (req, res) => {
  const { personWhoCastedVote, personWhoReceivedVote, votingSessionId } =
    req.body;
  const votingSession = await VotingSession.find({
    _id: mongoose.Types.ObjectId(votingSessionId),
  });

  if (votingSession)
    await VotingSession.updateOne(
      {
        _id: mongoose.Types.ObjectId(votingSessionId),
      },
      {
        $inc: {
          votersCount: 1,
        },
      }
    );

  let arrayThatWillBeModified = votingSession[0].candidates.toObject();

  for (let i = 0; i < arrayThatWillBeModified.length; i++) {
    if (arrayThatWillBeModified[i]._id.toString() == personWhoReceivedVote)
      arrayThatWillBeModified[i].voteCountForThisCandidate =
        arrayThatWillBeModified[i].voteCountForThisCandidate + 1;

    arrayThatWillBeModified[i]._id = mongoose.Types.ObjectId(
      arrayThatWillBeModified[i]._id
    );
  }

  const modifiedArray = arrayThatWillBeModified;
  let result = await VotingSession.findOne({
    _id: mongoose.Types.ObjectId(votingSessionId),
  });

  result.candidates = modifiedArray;
  result.whoVotedForThisSession = [
    ...result.whoVotedForThisSession,
    personWhoCastedVote,
  ];

  await result.save();
});

export {
  addVotingSession,
  getAllOngoingVotingSessions,
  endAVotingSession,
  getJustOneVotingSession,
  updateVotingSessionWithNewVote,
};
