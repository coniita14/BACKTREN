import express from "express";
import cors from "cors";
import morgan from "morgan";

import healthRoutes from "./router/health.routes.js";
import userRoutes from "./router/user.route.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/usuarios", userRoutes);

export default app;
