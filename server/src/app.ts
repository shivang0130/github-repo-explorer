import express from "express";
import cors from "cors";

import githubRoutes from "./routes/githubRoutes";
import repositoryRoutes
from "./routes/repositoryRoutes";

const app = express();

const allowedOrigins: string[] =
  [
    "http://localhost:5173",
    process.env.CLIENT_URL,
  ].filter(
    (url): url is string =>
      Boolean(url)
  );

app.use(
  cors({
    origin: allowedOrigins,
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