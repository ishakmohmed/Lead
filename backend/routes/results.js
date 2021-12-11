import express from "express";
const router = express.Router();
import {
  addVotingSession,
  endAVotingSession,
  getAllOngoingVotingSessions,
  getAllEndedVotingSessions,
  getJustOneVotingSession,
  updateVotingSessionWithNewVote,
} from "../controllers/voting.js";

router
  .route("/")
  .post(addVotingSession)
  .get(getAllOngoingVotingSessions)
  .put(updateVotingSessionWithNewVote);
router.route("/results", getAllEndedVotingSessions);
router.route("/:id").post(endAVotingSession).get(getJustOneVotingSession);

export default router;
