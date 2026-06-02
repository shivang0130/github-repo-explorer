import axios from "axios";

const githubHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

export const fetchRepositoryDetails =
  async (
    owner: string,
    repo: string
  ) => {

    const response =
      await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`,
        {
          headers:
            githubHeaders,
        }
      );

    return response.data;
  };