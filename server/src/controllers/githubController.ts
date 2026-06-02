import { Request, Response } from "express";
import { fetchGitHubData } from "../services/githubService";

interface GitHubParams {
  username: string;
}

export const getGitHubProfile = async (
  req: Request<GitHubParams>,
  res: Response
): Promise<void> => {
  try {
    const { username } = req.params;

    const data = await fetchGitHubData(username);

    res.status(200).json(data);

  } catch (error) {

    res.status(404).json({
      success: false,
      message: "GitHub user not found"
    });

  }
};