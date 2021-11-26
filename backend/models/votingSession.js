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
  candidates,
  isGoingOn: {
    type: Boolean,
    default: true,
  },
  creatorId,
  dateCreated,
  votersCount,
  highestVotersCount,
  winner,
  dateEnded,
});
