import mongoose from "mongoose";

// Every data here doesn't have "required: true" key-value pair
// The reason is because a whole lot of the data wouldn't be available initially in every document
// And will be added/deleted/modified when needed
// Making things easy cause there's only one schema for voting sessions which every screen in the frontend will deal with

const votingSessionSchema = mongoose.Schema({
  nameOfSession: {
    type: String,
    minlength: 5,
    maxlength: 20,
  },
  candidates: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      profilePic: String,
      name: String,
      bio: String,
      voteCountForThisCandidate: Number,
    },
  ],
  whoVotedForThisSession: [String],
  isGoingOn: {
    type: Boolean,
    default: true,
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  votersCount: {
    type: Number,
    default: 0,
  },
  highestVotersCount: {
    type: Number,
    default: 0,
  },
  winnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  dateEnded: {
    type: Date,
    default: null,
  },
  isDraw: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("VotingSession", votingSessionSchema);
