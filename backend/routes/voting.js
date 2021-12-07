import express from "express";
const router = express.Router();
import {
  addVotingSession,
  endAVotingSession,
  getAllVotingSessions,
  getJustOneVotingSession,
  updateVotingSessionWithNewVote,
} from "../controllers/voting.js";

router
  .route("/")
  .post(addVotingSession)
  .get(getAllVotingSessions)
  .put(updateVotingSessionWithNewVote);
router.route("/:id").post(endAVotingSession).get(getJustOneVotingSession);

export default router;
