import { Router } from "express";

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  logIn,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);

router.post("/", createUser);
router.post("/login", logIn);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
