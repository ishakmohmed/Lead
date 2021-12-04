import client from "./client";

const addVotingSession = (votingSessionData) =>
  client.post("/api/votes", votingSessionData);

export default { addVotingSession };
