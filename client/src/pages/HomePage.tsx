import { useState, useEffect, useMemo } from "react";

import SearchBar from "../components/SearchBar";
import ProfileCard from "../components/ProfileCard";
import RepositoryList from "../components/RepositoryList";
import RecentSearches from "../components/RecentSearches";

import { getGitHubProfile } from "../api/githubApi";

import type {
  GitHubResponse,
  GitHubRepo,
} from "../types/github.types";

type SortOption =
  | "stars"
  | "name"
  | "updated";

type SearchSource =
  | "manual"
  | "recent";

const RECENT_SEARCHES_KEY =
  "recentSearches";

const REPOS_PER_PAGE = 10;

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
    useState<SortOption>(
      "stars"
    );

  const [searchSource, setSearchSource] =
    useState<SearchSource>(
      "manual"
    );

  const [recentSearches, setRecentSearches] =
    useState<string[]>([]);
  
    const [visibleRepos, setVisibleRepos] =
  useState(REPOS_PER_PAGE);

  useEffect(() => {
    const savedSearches =
      localStorage.getItem(
        RECENT_SEARCHES_KEY
      );

    if (savedSearches) {
      setRecentSearches(
        JSON.parse(savedSearches)
      );
    }
  }, []);

  const clearSearchHistory = () => {
    localStorage.removeItem(
      RECENT_SEARCHES_KEY
    );

    setRecentSearches([]);
  };

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

setVisibleRepos(
  REPOS_PER_PAGE
);

      setRecentSearches((prev) => {
        const updated = [
          username,
          ...prev.filter(
            (item) =>
              item !== username
          ),
        ].slice(0, 5);

        localStorage.setItem(
          RECENT_SEARCHES_KEY,
          JSON.stringify(updated)
        );

        return updated;
      });

    } catch (error: any) {

      setError(
        error?.response?.data
          ?.message ||
          "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  const sortedRepos: GitHubRepo[] =
    useMemo(() => {

      if (!data?.repos) {
        return [];
      }

      return [...data.repos].sort(
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
      );

    }, [
      data?.repos,
      sortBy,
    ]);


    const displayedRepos =
  sortedRepos.slice(
    0,
    visibleRepos
  );

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

      <div className="max-w-6xl mx-auto px-4 pb-10">

        <SearchBar
          onSearch={(username) => {
            setSearchSource(
              "manual"
            );

            handleSearch(
              username
            );
          }}
          loading={
            loading &&
            searchSource ===
              "manual"
          }
        />

        <RecentSearches
          searches={
            recentSearches
          }
          onSelect={(
            username
          ) => {
            setSearchSource(
              "recent"
            );

            handleSearch(
              username
            );
          }}
          onClear={
            clearSearchHistory
          }
        />

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}

        {/* Lightweight loading indicator */}
        {loading && (
          <div className="flex justify-center items-center gap-3 py-4">

            <div
              className="
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-slate-300
                border-t-slate-900
              "
            />

            <span className="text-slate-600">
              Loading latest profile...
            </span>

          </div>
        )}

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

        {data && (
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
                  {data.repos.length}
                  {" "}
                  repositories found
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
                      e.target
                        .value as SortOption
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
    repos={displayedRepos}
  />

  <div className="mt-8">

    <p className="text-center text-gray-500 mb-4">
      Showing{" "}
      {Math.min(
        visibleRepos,
        sortedRepos.length
      )}{" "}
      of{" "}
      {sortedRepos.length}{" "}
      repositories
    </p>

    {visibleRepos <
      sortedRepos.length && (

      <div className="flex justify-center">

        <button
          onClick={() =>
            setVisibleRepos(
              (prev) =>
                prev +
                REPOS_PER_PAGE
            )
          }
          className="
            bg-slate-900
            text-white
            px-6
            py-3
            rounded-xl
            hover:bg-black
            transition
          "
        >
          Load More
        </button>

      </div>

    )}

  </div>

          </>
        )}

      </div>
    </div>
  );
}

export default HomePage;