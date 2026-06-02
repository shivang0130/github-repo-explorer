import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import type {
  GitHubRepo,
} from "../types/github.types";

interface Props {
  repos: GitHubRepo[];
}

const COLORS = [
  "#2563eb",
  "#7c3aed",
  "#059669",
  "#dc2626",
  "#ea580c",
  "#0891b2",
];

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

  const chartData =
    Object.entries(
      languageMap
    ).map(
      ([name, value]) => ({
        name,
        value,
      })
    );

  if (
    chartData.length === 0
  ) {
    return null;
  }

  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      p-6
      mb-8
      "
    >
      <h2
        className="
        text-2xl
        font-bold
        mb-6
        "
      >
        Language Distribution
      </h2>

      <div
        className="
        h-80
        "
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>

            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >

              {chartData.map(
                (
                  _,
                  index
                ) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}

            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LanguageChart;