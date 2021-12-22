import client from "./client";

const addVotingSession = (votingSessionData, onUploadProgress) =>
  client.post("/api/votes", votingSessionData, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });

const getAllOngoingVotingSessions = () => {
  return client.get("/api/votes");
};

const getAllEndedVotingSessions = () => {
  return client.get("/api/votes/results");
};

const getJustOneVotingSession = (votingSessionId) => {
  return client.get(`/api/votes/${votingSessionId}`);
};

const endAVotingSession = (votingSessionId) => {
  client.post(`/api/votes/${votingSessionId}`);
};

const updateVotingSessionWithNewVote = (
  personWhoReceivedVote,
  personWhoCastedVote,
  votingSessionId
) => {
  client.put("/api/votes", {
    personWhoCastedVote,
    personWhoReceivedVote,
    votingSessionId,
  });
};

export default {
  addVotingSession,
  endAVotingSession,
  getAllOngoingVotingSessions,
  getAllEndedVotingSessions,
  getJustOneVotingSession,
  updateVotingSessionWithNewVote,
};
