import axios from "axios";

import cache from "../utils/cache";

import {
  GitHubResponse,
  GitHubUser,
  GitHubRepo,
} from "../types/github.types";

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
        `https://api.github.com/users/${username}`
      );

    const repoResponse =
      await axios.get<GitHubRepo[]>(
        `https://api.github.com/users/${username}/repos`
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