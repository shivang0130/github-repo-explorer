import { Router } from "express";
import {
  getRepositoryDetails,
} from "../controllers/repositoryController";

const router = Router();

router.get(
  "/:owner/:repo",
  getRepositoryDetails
);

export default router;