import express from "express";
const router = express.Router();
import {
  authenticateUser,
  registerUser,
  getAllUsers,
} from "../controllers/user.js";

router.route("/").post(registerUser).get(getAllUsers);
router.post("/login", authenticateUser);

export default router;
