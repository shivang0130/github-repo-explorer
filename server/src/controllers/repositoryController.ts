import { Request, Response } from "express";

import {
  fetchRepositoryDetails,
} from "../services/repositoryService";

interface RepositoryParams {
  owner: string;
  repo: string;
}

export const getRepositoryDetails =
  async (
    req: Request<RepositoryParams>,
    res: Response
  ): Promise<void> => {

    try {

      const {
        owner,
        repo,
      } = req.params;

      const data =
        await fetchRepositoryDetails(
          owner,
          repo
        );

      res.status(200).json(
        data
      );

    } catch {

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch repository details",
      });

    }

  };