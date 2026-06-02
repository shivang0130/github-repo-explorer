import { useState } from "react";

interface SearchBarProps {
  onSearch: (username: string) => void;
  loading: boolean;
}

function SearchBar({
  onSearch,
  loading,
}: SearchBarProps) {
  const [username, setUsername] =
    useState("");

  const handleSubmit = () => {
    if (!username.trim()) return;

    onSearch(username.trim());
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          type="text"
          placeholder="Search GitHub username..."
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter")
              handleSubmit();
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
          onClick={handleSubmit}
          disabled={loading}
          className="
          bg-slate-900
          text-white
          px-8
          rounded-xl
          hover:bg-black
          transition
          "
        >
          {loading
            ? "Searching..."
            : "Search"}
        </button>
      </div>
    </div>
  );
}

export default SearchBar;