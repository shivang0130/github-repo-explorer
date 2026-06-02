import axios from "axios";
import {
  GitHubResponse,
  GitHubUser,
  GitHubRepo
} from "../types/github.types";

export const fetchGitHubData = async (
  username: string
): Promise<GitHubResponse> => {

  const userResponse = await axios.get<GitHubUser>(
    `https://api.github.com/users/${username}`
  );

  const repoResponse = await axios.get<GitHubRepo[]>(
    `https://api.github.com/users/${username}/repos`
  );

  return {
    user: userResponse.data,
    repos: repoResponse.data
  };
};