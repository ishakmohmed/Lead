import express from "express";
const router = express.Router();
import {
  authenticateUser,
  registerUser,
  getAllUsers,
  getDetailsOfAUser,
} from "../controllers/user.js";

router.route("/").post(registerUser).get(getAllUsers);
router.route("/:id").get(getDetailsOfAUser);
router.post("/login", authenticateUser);

export default router;
