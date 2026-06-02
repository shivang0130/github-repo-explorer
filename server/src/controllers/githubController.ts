import { Request, Response } from "express";
import axios from "axios";
import { fetchGitHubData } from "../services/githubService";

interface GitHubParams {
  username: string;
}

export const getGitHubProfile = async (
  req: Request<GitHubParams>,
  res: Response
): Promise<void> => {

  try {

    const { username } =
      req.params;

    const data =
      await fetchGitHubData(
        username
      );

    res.status(200).json(data);

  } catch (error) {

    if (
      axios.isAxiosError(error)
    ) {

      if (
        error.response?.status === 404
      ) {

        res.status(404).json({
          success: false,
          message:
            "GitHub user not found",
        });

        return;
      }

      if (
        error.response?.status === 403
      ) {

        res.status(403).json({
          success: false,
          message:
            "GitHub API rate limit exceeded",
        });

        return;
      }
    }

    res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });

  }
};