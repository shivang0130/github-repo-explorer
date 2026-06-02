import { useState } from "react";

interface SearchBarProps {
  onSearch: (
    username: string
  ) => void;
}

function SearchBar({
  onSearch
}: SearchBarProps) {

  const [username, setUsername] =
    useState("");

  const handleSubmit = () => {

    if (!username.trim())
      return;

    onSearch(username.trim());

  };

  return (
    <div>

      <input
        type="text"
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) =>
          setUsername(
            e.target.value
          )
        }
      />

      <button
        onClick={handleSubmit}
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;