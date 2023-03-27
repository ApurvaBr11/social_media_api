import express from "express";
import {
  DeleteUser,
  FollowUser,
  getUser,
  UnFollowUser,
  UpdateUser,
} from "../Controllers/userController.js";

const router = express.Router();

router.get("/:id", getUser);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);
router.put("/:id/follow", FollowUser);
router.put("/:id/unfollow", UnFollowUser);

export default router;
