import {
  useState,
  useEffect,
} from "react";

import {
  getGitHubSuggestions,
} from "../api/githubApi";

interface SearchBarProps {
  onSearch: (
    username: string
  ) => void;

  loading: boolean;
}

function SearchBar({
  onSearch,
  loading,
}: SearchBarProps) {

  const [username, setUsername] =
    useState("");

  const [
    suggestions,
    setSuggestions,
  ] = useState<string[]>([]);

  useEffect(() => {

    if (
      username.trim().length < 3
    ) {

      setSuggestions([]);

      return;

    }

    const timer =
      setTimeout(
        async () => {

          try {

            const data =
              await getGitHubSuggestions(
                username
              );

            setSuggestions(
              data
            );

          } catch {

            setSuggestions([]);

          }

        },
        500
      );

    return () =>
      clearTimeout(timer);

  }, [username]);

  const handleSubmit = (
    value?: string
  ) => {

    const searchValue =
      value || username;

    if (
      !searchValue.trim()
    ) {
      return;
    }

    onSearch(
      searchValue.trim()
    );

    setSuggestions([]);

    setUsername("");

  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mb-8 relative">

      <div className="flex flex-col md:flex-row gap-3">

        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) =>
            setUsername(
              e.target.value
            )
          }
          onKeyDown={(e) => {

            if (
              e.key === "Enter"
            ) {

              handleSubmit();

            }

          }}
          className="
            flex-1
            border
            rounded-xl
            p-4
            focus:outline-none
            focus:ring-2
            focus:ring-slate-900
          "
        />

        <button
          onClick={() =>
            handleSubmit()
          }
          disabled={loading}
          className="
            bg-slate-900
            text-white
            px-8
            rounded-xl
            hover:bg-black
            transition
            disabled:opacity-50
          "
        >
          {loading
            ? "Searching..."
            : "Search"}
        </button>

      </div>

      {suggestions.length > 0 && (

        <div
          className="
            absolute
            left-4
            right-4
            top-[88px]
            bg-white
            border
            rounded-xl
            shadow-lg
            z-50
            overflow-hidden
          "
        >

          {suggestions.map(
            (
              suggestion
            ) => (

              <button
                key={suggestion}
                onClick={() =>
                  handleSubmit(
                    suggestion
                  )
                }
                className="
                  w-full
                  text-left
                  px-4
                  py-3
                  hover:bg-slate-100
                  border-b
                  last:border-b-0
                  transition
                "
              >
                {suggestion}
              </button>

            )
          )}

        </div>

      )}

    </div>
  );
}

export default SearchBar;