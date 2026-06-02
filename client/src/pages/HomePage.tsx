import { useState } from "react";

import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import RepositoryList from "../components/RepositoryList";

import { getGitHubProfile } from "../api/githubApi";

import type {
  GitHubResponse,
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

  return (
    <div className="min-h-screen bg-slate-100">
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

      <div className="max-w-6xl mx-auto px-4 pb-10">
        <SearchBar
          onSearch={handleSearch}
          loading={loading}
        />

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {loading && (
          <div className="text-center text-lg py-10">
            Loading profile...
          </div>
        )}

        {!loading && data && (
          <>
            <ProfileCard
              user={data.user}
            />

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold">
                Repositories
              </h2>

              <span className="bg-slate-900 text-white px-4 py-2 rounded-full">
                {data.repos.length}
              </span>
            </div>

            <RepositoryList
              repos={data.repos}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;