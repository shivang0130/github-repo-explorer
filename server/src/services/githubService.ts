import axios from "axios";

import cache from "../utils/cache";

import {
  GitHubResponse,
  GitHubUser,
  GitHubRepo,
} from "../types/github.types";

const githubHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

export const fetchGitHubData =
  async (
    username: string
  ): Promise<GitHubResponse> => {

    const cacheKey =
      `github:${username}`;

    const cachedData =
      cache.get<GitHubResponse>(
        cacheKey
      );

    if (cachedData) {

      console.log(
        `[CACHE HIT] ${username}`
      );

      return cachedData;
    }

    console.log(
      `[CACHE MISS] ${username}`
    );

    const userResponse =
      await axios.get<GitHubUser>(
        `https://api.github.com/users/${username}`,
        {
          headers:
            githubHeaders,
        }
      );

    const repoResponse =
      await axios.get<GitHubRepo[]>(
        `https://api.github.com/users/${username}/repos`,
        {
          headers:
            githubHeaders,

          params: {
            per_page: 100,
            sort: "updated",
          },
        }
      );

    const data = {
      user: userResponse.data,
      repos: repoResponse.data,
    };

    cache.set(
      cacheKey,
      data
    );

    return data;
  };

export const fetchUserSuggestions =
  async (
    query: string
  ): Promise<string[]> => {

    const response =
      await axios.get(
        "https://api.github.com/search/users",
        {
          headers:
            githubHeaders,

          params: {
            q: query,
            per_page: 5,
          },
        }
      );

    return response.data.items.map(
      (
        user: {
          login: string;
        }
      ) => user.login
    );
  };