import RepositoryCard from "./RepositoryCard";

import type {
  GitHubRepo,
} from "../types/github.types";

interface Props {
  repos: GitHubRepo[];
}

function RepositoryList({
  repos,
}: Props) {

  return (
    <div className="grid md:grid-cols-2 gap-5">

      {repos.map((repo) => (

        <RepositoryCard
          key={repo.id}
          repo={repo}
        />

      ))}

    </div>
  );
}

export default RepositoryList;