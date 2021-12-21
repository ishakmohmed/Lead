import express from "express";
const router = express.Router();
import {
  authenticateUser,
  registerUser,
  getAllUsers,
  getDetailsOfAUser,
  updateUser,
} from "../controllers/user.js";

router.route("/update").post(updateUser);
router.route("/").post(registerUser).get(getAllUsers);
router.route("/:id").get(getDetailsOfAUser);
router.post("/login", authenticateUser);

export default router;
