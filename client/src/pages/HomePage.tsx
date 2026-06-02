import { useState } from "react";

import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import RepositoryList from "../components/RepositoryList";

import { getGitHubProfile } from "../api/githubApi";

import type {
  GitHubResponse,
  GitHubRepo,
} from "../types/github.types";

function HomePage() {
  const [data, setData] =
    useState<GitHubResponse | null>(
      null
    );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [sortBy, setSortBy] =
    useState("stars");

  const handleSearch = async (
    username: string
  ) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getGitHubProfile(
          username
        );

      setData(response);
    } catch {
      setData(null);

      setError(
        "GitHub user not found."
      );
    } finally {
      setLoading(false);
    }
  };

  const sortedRepos: GitHubRepo[] =
    data?.repos
      ? [...data.repos].sort(
          (a, b) => {
            switch (sortBy) {
              case "name":
                return a.name.localeCompare(
                  b.name
                );

              case "updated":
                return (
                  new Date(
                    b.updated_at
                  ).getTime() -
                  new Date(
                    a.updated_at
                  ).getTime()
                );

              case "stars":
              default:
                return (
                  b.stargazers_count -
                  a.stargazers_count
                );
            }
          }
        )
      : [];

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-14 mb-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white">
            GitHub Repo Explorer
          </h1>

          <p className="text-slate-300 mt-4">
            Explore GitHub profiles and repositories
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 pb-10">

        <SearchBar
          onSearch={handleSearch}
          loading={loading}
        />

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center text-lg py-10">
            Loading profile...
          </div>
        )}

        {/* Data */}
        {!loading && data && (
          <>
            <ProfileCard
              user={data.user}
            />

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

              <div>
                <h2 className="text-3xl font-bold">
                  Repositories
                </h2>

                <p className="text-gray-500">
                  {data.repos.length} repositories found
                </p>
              </div>

              <div className="flex gap-3 items-center">

                <span className="bg-slate-900 text-white px-4 py-2 rounded-full">
                  {data.repos.length}
                </span>

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                  className="
                    bg-white
                    border
                    border-gray-300
                    rounded-lg
                    px-4
                    py-2
                    shadow-sm
                    focus:outline-none
                    focus:ring-2
                    focus:ring-slate-900
                  "
                >
                  <option value="stars">
                    Sort by Stars
                  </option>

                  <option value="name">
                    Sort by Name
                  </option>

                  <option value="updated">
                    Sort by Updated
                  </option>
                </select>

              </div>
            </div>

            <RepositoryList
              repos={sortedRepos}
            />
          </>
        )}

        {/* Empty State */}
        {!loading &&
          !error &&
          !data && (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold text-slate-700">
                Search for a GitHub User
              </h2>

              <p className="text-slate-500 mt-2">
                Enter a username above to explore repositories.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}

export default HomePage;