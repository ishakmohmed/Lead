import client from "./client";

const addVotingSession = (votingSessionData) =>
  client.post("/api/votes", votingSessionData);

const getAllVotingSessions = () => {
  return client.get("/api/votes");
};

const endAVotingSession = (votingSessionId) => {
  client.post(`/api/votes/${votingSessionId}`);
};

export default { addVotingSession, endAVotingSession, getAllVotingSessions };
