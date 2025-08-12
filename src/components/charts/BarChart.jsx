import React, { useMemo } from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTooltip } from "victory";

const DEFAULT_PALETTE = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc949",
  "#af7aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ac"
];

const BarChart = ({ questionId, formStructure, responses, title }) => {
  // 1. Find the question definition
  const item = formStructure.items.find(
    (i) => i.questionItem?.question?.questionId === questionId
  );
  const options = item?.questionItem?.question?.choiceQuestion?.options ?? [];

  // 2. Count up each option
  const counts = useMemo(() => {
    const acc = {};
    options.forEach((o) => {
      acc[o.value] = 0;
    });

    responses.forEach((r) => {
      const answer =
        r.answers?.[questionId]?.textAnswers?.answers?.[0]?.value;
      if (answer in acc) {
        acc[answer]++;
      }
    });

    return acc;
  }, [options, responses, questionId]);

  // 3. Build the data array and attach colors
  const data = useMemo(() => {
    return Object.entries(counts)
      .map(([x, y], idx) => ({
        x,
        y,
        fill: DEFAULT_PALETTE[idx % DEFAULT_PALETTE.length]
      }))
      .filter((d) => d.y > 0); // keep behavior same as your pie (hide zero-count)
  }, [counts]);

  const total = data.reduce((sum, d) => sum + d.y, 0);

  const labelsFn = ({ datum }) =>
    `${datum.x}: ${datum.y} (${total > 0 ? ((datum.y / total) * 100).toFixed(1) : 0}%)`;

  return (
    <div className="chart-container newSmallCard newCard">
      <p className="cartTitle">{title}</p>

      <VictoryChart domainPadding={{ x: 30 }}>
        <VictoryAxis
          // show category labels
          tickValues={data.map((d) => d.x)}
          style={{
            tickLabels: { angle: -35, textAnchor: "end", fontSize: 10 }
          }}
        />
        <VictoryAxis dependentAxis />
        <VictoryBar
          data={data}
          x="x"
          y="y"
          labels={labelsFn}
          labelComponent={<VictoryTooltip />}
          style={{
            data: {
              fill: ({ datum }) => datum.fill,
              width: 16
            }
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default BarChart;
