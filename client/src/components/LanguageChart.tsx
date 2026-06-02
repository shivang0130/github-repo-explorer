import type {
  GitHubRepo,
} from "../types/github.types";

interface Props {
  repos: GitHubRepo[];
}

function LanguageChart({
  repos,
}: Props) {

  const languageMap:
    Record<string, number> = {};

  repos.forEach((repo) => {

    const language =
      repo.language;

    if (!language) {
      return;
    }

    languageMap[language] =
      (languageMap[
        language
      ] || 0) + 1;

  });

  const totalRepos =
    Object.values(
      languageMap
    ).reduce(
      (sum, count) =>
        sum + count,
      0
    );

  const chartData =
    Object.entries(
      languageMap
    )
      .map(
        ([name, value]) => ({
          name,
          value,
          percentage:
            (
              (value /
                totalRepos) *
              100
            ).toFixed(1),
        })
      )
      .sort(
        (a, b) =>
          b.value - a.value
      )
      .slice(0, 6);

  if (
    chartData.length === 0
  ) {
    return null;
  }

  return (
    <div
      className="
        bg-white
        rounded-3xl
        shadow-lg
        p-6
        mb-8
        border
        border-gray-100
      "
    >

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >
            Language Distribution
          </h2>

          <p
            className="
              text-sm
              text-gray-500
              mt-1
            "
          >
            Based on public repositories
          </p>

        </div>

        <div
          className="
            bg-slate-900
            text-white
            px-4
            py-2
            rounded-full
            text-sm
            font-medium
          "
        >
          {totalRepos} Repos
        </div>

      </div>

      <div className="space-y-5">

        {chartData.map(
          (language) => (

            <div
              key={
                language.name
              }
            >

              <div className="flex justify-between mb-2">

                <div>

                  <span
                    className="
                      font-semibold
                      text-slate-800
                    "
                  >
                    {
                      language.name
                    }
                  </span>

                  <span
                    className="
                      text-gray-500
                      text-sm
                      ml-2
                    "
                  >
                    (
                    {
                      language.value
                    }{" "}
                    repos)
                  </span>

                </div>

                <span
                  className="
                    font-medium
                    text-slate-700
                  "
                >
                  {
                    language.percentage
                  }
                  %
                </span>

              </div>

              <div
                className="
                  h-3
                  bg-slate-200
                  rounded-full
                  overflow-hidden
                "
              >

                <div
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-slate-900
                    via-slate-700
                    to-slate-500
                  "
                  style={{
                    width:
                      `${language.percentage}%`,
                  }}
                />

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default LanguageChart;