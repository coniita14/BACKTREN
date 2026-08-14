import { Router } from "express";

import {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
} from "../controllers/user.controller.js";
import { verifyToken } from "../security/auth.middleware.js";
import { rateLimitMiddleware } from "../security/rateLimit.js";

const router = Router();

router.get("/", verifyToken, rateLimitMiddleware({ max: 60 }), getAllUsers);
router.get("/:id", verifyToken, rateLimitMiddleware({ max: 60 }), getUser);
router.post(
  "/",
  rateLimitMiddleware({ max: 20, windowMs: 60 * 1000 }),
  createUser,
);
router.put(
  "/:id",
  verifyToken,
  rateLimitMiddleware({ max: 20, windowMs: 60 * 1000 }),
  updateUser,
);
router.delete(
  "/:id",
  verifyToken,
  rateLimitMiddleware({ max: 10, windowMs: 60 * 1000 }),
  deleteUser,
);

router.post(
  "/login",
  rateLimitMiddleware({
    max: 5,
    windowMs: 60 * 1000,
    message: "Demasiados intentos de login. Intente nuevamente en 1 minuto.",
  }),
  login,
);

export default router;
