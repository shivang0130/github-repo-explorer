import { Router } from "express";
import { getGitHubProfile, getGitHubSuggestions } from "../controllers/githubController";

const router = Router();

router.get(
  "/suggestions/:query",
  getGitHubSuggestions
);

router.get(
  "/:username",
  getGitHubProfile
);

export default router;