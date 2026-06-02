import express from "express";
import cors from "cors";

import githubRoutes from "./routes/githubRoutes";
import repositoryRoutes
from "./routes/repositoryRoutes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
  })
);

app.use(express.json());

app.use(
  "/api/github",
  githubRoutes
);

app.use(
  "/api/repositories",
  repositoryRoutes
);

export default app;