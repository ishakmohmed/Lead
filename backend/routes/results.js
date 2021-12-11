import express from "express";
const router = express.Router();
import { getAllEndedVotingSessions } from "../controllers/results.js";

router.route("/").get(getAllEndedVotingSessions);

export default router;
