import type { GitHubUser } from "../types/github.types";

interface ProfileCardProps {
  user: GitHubUser;
}

function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8 border border-gray-100">
      
      {/* Cover Banner */}
      <div className="h-40 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900" />

      <div className="px-8 pb-8">

        {/* Profile Section */}
        <div className="-mt-24 flex flex-col md:flex-row gap-8">

          <img
  src={user.avatar_url}
  alt={user.login}
  className="
    w-44
    h-44
    rounded-full
    border-8
    border-white
    shadow-2xl
    bg-white
    object-cover
    shrink-0
  "
/>

          <div className="flex-1 pt-8">

            <h2 className="text-4xl font-bold text-white">
              {user.name || user.login}
            </h2>

            <div className="mt-2">
              <span
                className="
                  inline-flex
                  items-center
                  bg-slate-100
                  text-slate-700
                  px-4
                  py-1.5
                  rounded-full
                  text-sm
                  font-medium
                "
              >
                @{user.login}
              </span>
            </div>

            <p className="text-gray-600 mt-4 max-w-3xl leading-relaxed">
              {user.bio || "No bio available"}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">

          <div
            className="
              bg-gradient-to-br
              from-slate-50
              to-slate-100
              rounded-2xl
              p-6
              text-center
            "
          >
            <p className="text-4xl font-bold text-slate-900">
              {user.followers.toLocaleString()}
            </p>

            <p className="text-gray-500 mt-2">
              Followers
            </p>
          </div>

          <div
            className="
              bg-gradient-to-br
              from-slate-50
              to-slate-100
              rounded-2xl
              p-6
              text-center
            "
          >
            <p className="text-4xl font-bold text-slate-900">
              {user.following.toLocaleString()}
            </p>

            <p className="text-gray-500 mt-2">
              Following
            </p>
          </div>

          <div
            className="
              bg-gradient-to-br
              from-slate-50
              to-slate-100
              rounded-2xl
              p-6
              text-center
            "
          >
            <p className="text-4xl font-bold text-slate-900">
              {user.public_repos.toLocaleString()}
            </p>

            <p className="text-gray-500 mt-2">
              Repositories
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProfileCard;