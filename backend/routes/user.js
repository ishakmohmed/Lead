import express from "express";
const router = express.Router();
import {
  authenticateUser,
  registerUser,
  getAllUsers,
  getDetailsOfAUser,
  updateUser,
} from "../controllers/user.js";

router.route("/").post(registerUser).get(getAllUsers);
router.route("/:id").get(getDetailsOfAUser);
router.post("/update", updateUser);
router.post("/login", authenticateUser);

export default router;
