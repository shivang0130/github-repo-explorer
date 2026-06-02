import type { GitHubUser } from "../types/github.types";

interface ProfileCardProps {
  user: GitHubUser;
}

function ProfileCard({
  user
}: ProfileCardProps) {

  return (
    <div>

      <img
        src={user.avatar_url}
        alt={user.login}
        width={120}
      />

      <h2>{user.name}</h2>

      <p>{user.bio}</p>

      <p>
        Followers:
        {user.followers}
      </p>

      <p>
        Following:
        {user.following}
      </p>

      <p>
        Repositories:
        {user.public_repos}
      </p>

    </div>
  );
}

export default ProfileCard;