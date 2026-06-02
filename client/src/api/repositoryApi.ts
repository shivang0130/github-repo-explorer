import axios from "axios";

const API_URL =
  "http://localhost:5000/api/repositories";

export const getRepositoryDetails =
  async (
    owner: string,
    repo: string
  ) => {

    const response =
      await axios.get(
        `${API_URL}/${owner}/${repo}`
      );

    return response.data;
  };