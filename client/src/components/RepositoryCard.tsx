import { useState } from "react";

import { getRepositoryDetails } from "../api/repositoryApi";

import type {
  GitHubRepo,
  GitHubRepoDetails,
} from "../types/github.types";

interface RepositoryCardProps {
  repo: GitHubRepo;
}

function RepositoryCard({
  repo,
}: RepositoryCardProps) {

  const [expanded, setExpanded] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [details, setDetails] =
    useState<GitHubRepoDetails | null>(
      null
    );

  const handleToggle = async () => {

    if (expanded) {

      setExpanded(false);

      return;
    }

    if (!details) {

      try {

        setLoading(true);

        const data =
          await getRepositoryDetails(
            repo.owner.login,
            repo.name
          );

        setDetails(data);

      } catch {

        console.error(
          "Failed to fetch repository details"
        );

      } finally {

        setLoading(false);

      }

    }

    setExpanded(true);

  };

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      hover:-translate-y-1
      hover:shadow-xl
      transition-all
      duration-300
      "
    >

      <div className="flex justify-between items-start mb-3">

        <h3 className="font-bold text-xl">
          {repo.name}
        </h3>

        <span className="text-yellow-500 font-semibold">
          ⭐ {repo.stargazers_count}
        </span>

      </div>

      <p className="text-gray-600 mb-5 min-h-[48px]">
        {repo.description ||
          "No description available"}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {repo.language || "N/A"}
        </span>

        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          Updated{" "}
          {new Date(
            repo.updated_at
          ).toLocaleDateString()}
        </span>

      </div>

      <button
        onClick={handleToggle}
        className="
        text-slate-900
        font-medium
        hover:underline
        "
      >
        {expanded
          ? "Hide Details"
          : "Show Details"}
      </button>

      {loading && (
        <div className="mt-4 text-gray-500">
          Loading details...
        </div>
      )}

      {expanded &&
        details && (

          <div className="mt-4 border-t pt-4 space-y-2">

            <p>
              <strong>
                Open Issues:
              </strong>{" "}
              {
                details.open_issues_count
              }
            </p>

            <p>
              <strong>
                Forks:
              </strong>{" "}
              {
                details.forks_count
              }
            </p>

            <p>
              <strong>
                Default Branch:
              </strong>{" "}
              {
                details.default_branch
              }
            </p>

            <p>
              <strong>
                Visibility:
              </strong>{" "}
              {
                details.visibility
              }
            </p>

            <p>
              <strong>
                Created:
              </strong>{" "}
              {new Date(
                details.created_at
              ).toLocaleDateString()}
            </p>

          </div>

        )}

    </div>
  );
}

export default RepositoryCard;