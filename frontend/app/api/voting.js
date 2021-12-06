import client from "./client";

const addVotingSession = (votingSessionData) =>
  client.post("/api/votes", votingSessionData);

const getAllVotingSessions = () => {
  return client.get("/api/votes");
};

const getJustOneVotingSession = (votingSessionId) => {
  console.log("REACHED!");

  return client.get(`/api/votes/${votingSessionId}`);
};

const endAVotingSession = (votingSessionId) => {
  client.post(`/api/votes/${votingSessionId}`);
};

export default {
  addVotingSession,
  endAVotingSession,
  getAllVotingSessions,
  getJustOneVotingSession,
};
