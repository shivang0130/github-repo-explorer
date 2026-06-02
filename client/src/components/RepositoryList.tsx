import type { GitHubRepo } from "../types/github.types";

interface Props {
  repos: GitHubRepo[];
}

function RepositoryList({
  repos
}: Props) {

  return (
    <div>

      {repos.map((repo) => (

        <div
          key={repo.id}
        >

          <h3>
            {repo.name}
          </h3>

          <p>
            {
              repo.description
            }
          </p>

          <p>
            Language:
            {repo.language ??
              "N/A"}
          </p>

          <p>
            Stars:
            {
              repo.stargazers_count
            }
          </p>

          <p>
            Updated:
            {
              new Date(
                repo.updated_at
              ).toLocaleDateString()
            }
          </p>

        </div>

      ))}

    </div>
  );
}

export default RepositoryList;