interface RecentSearchesProps {
  searches: string[];
  onSelect: (username: string) => void;
  onClear: () => void;
}

function RecentSearches({
  searches,
  onSelect,
  onClear,
}: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-slate-700">
          Recent Searches
        </h3>

        <button
          onClick={onClear}
          className="
            text-sm
            text-red-600
            hover:text-red-700
            font-medium
          "
        >
          Clear History
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <button
            key={search}
            onClick={() => onSelect(search)}
            className="
              px-4
              py-2
              bg-white
              border
              border-slate-300
              rounded-full
              hover:bg-slate-900
              hover:text-white
              transition
            "
          >
            {search}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RecentSearches;