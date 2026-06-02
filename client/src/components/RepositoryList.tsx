import type { GitHubRepo } from "../types/github.types";

interface Props {
  repos: GitHubRepo[];
}

function RepositoryList({ repos }: Props) {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      {repos.map((repo) => (
        <div
          key={repo.id}
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

          <div className="flex flex-wrap gap-2">
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
        </div>
      ))}
    </div>
  );
}

export default RepositoryList;