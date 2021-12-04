import express from "express";
const router = express.Router();
import { addVotingSession } from "../controllers/voting.js";

router.route("/").post(addVotingSession);

export default router;
