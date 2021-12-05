import express from "express";
const router = express.Router();
import {
  addVotingSession,
  getAllVotingSessions,
} from "../controllers/voting.js";

router.route("/").post(addVotingSession).get(getAllVotingSessions);

export default router;
