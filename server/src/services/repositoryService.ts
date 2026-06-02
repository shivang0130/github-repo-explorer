import axios from "axios";

export const fetchRepositoryDetails =
  async (
    owner: string,
    repo: string
  ) => {

    const response =
      await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`
      );

    return response.data;
  };