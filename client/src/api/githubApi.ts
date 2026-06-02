import axios from "axios";
import type { GitHubResponse } from "../types/github.types";

const API_URL =
  "http://localhost:5000/api/github";

export const getGitHubProfile =
  async (
    username: string
  ): Promise<GitHubResponse> => {

    const response =
      await axios.get<GitHubResponse>(
        `${API_URL}/${username}`
      );

    return response.data;
  };