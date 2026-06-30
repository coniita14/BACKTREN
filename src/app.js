import express from "express";
import cors from "cors";
import morgan from "morgan";

import healthRoutes from "./router/health.routes.js";
import userRoutes from "./router/user.route.js";
import materiaRoutes from "./router/materia.route.js";
import alumnoMateriaRoutes from "./router/alumnoMateria.route.js";
import dictanRoutes from "./router/dictan.route.js";
import cursanRoutes from "./router/cursan.route.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/usuarios", userRoutes);
app.use("/materias", materiaRoutes);
app.use("/alumno-materia", alumnoMateriaRoutes);
app.use("/dictan", dictanRoutes);
app.use("/cursan", cursanRoutes);
export default app;
