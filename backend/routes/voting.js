import express from "express";
const router = express.Router();
import {
  addVotingSession,
  endAVotingSession,
  getAllVotingSessions,
} from "../controllers/voting.js";

router.route("/").post(addVotingSession).get(getAllVotingSessions);
router.route("/:id").post(endAVotingSession);

export default router;
