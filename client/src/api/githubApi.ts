import axios from "axios";
import type { GitHubResponse } from "../types/github.types";

const API_URL =
  import.meta.env.VITE_API_URL +
  "/api/github";

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

export const getGitHubSuggestions =
  async (
    query: string
  ): Promise<string[]> => {

    const response =
      await axios.get<string[]>(
        `${API_URL}/suggestions/${query}`
      );

    return response.data;
  };