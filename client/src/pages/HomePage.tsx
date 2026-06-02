import {
  useState
} from "react";

import SearchBar
from "../components/SearchBar";

import ProfileCard
from "../components/ProfileCard";

import RepositoryList
from "../components/RepositoryList";

import {
  getGitHubProfile
} from "../api/githubApi";

import type {
    GitHubResponse
} from "../types/github.types";

function HomePage() {

  const [data, setData] =
    useState<
      GitHubResponse | null
    >(null);

  const handleSearch =
    async (
      username: string
    ) => {

      try {

        const response =
          await getGitHubProfile(
            username
          );

        setData(response);

      } catch (error) {

        console.error(error);

      }

    };

  return (
    <div>

      <h1>
        GitHub Repo Explorer
      </h1>

      <SearchBar
        onSearch={
          handleSearch
        }
      />

      {data && (
        <>
          <ProfileCard
            user={data.user}
          />

          <RepositoryList
            repos={data.repos}
          />
        </>
      )}

    </div>
  );
}

export default HomePage;