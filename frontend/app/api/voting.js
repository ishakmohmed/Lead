import client from "./client";

const addVotingSession = (votingSessionData) =>
  client.post("/api/votes", votingSessionData);

const getAllVotingSessions = () => {
  client.get("/api/votes");
};

export default { addVotingSession, getAllVotingSessions };
