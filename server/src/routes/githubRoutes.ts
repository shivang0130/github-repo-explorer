import { Router } from "express";
import { getGitHubProfile } from "../controllers/githubController";

const router = Router();

router.get("/:username", getGitHubProfile);

export default router;