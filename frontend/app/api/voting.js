import client from "./client";

const addVotingSession = (votingSessionData) =>
  client.post("/api/votes", votingSessionData);

const getAllVotingSessions = () => {
  return client.get("/api/votes");
};

export default { addVotingSession, getAllVotingSessions };
