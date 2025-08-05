import React, { useMemo } from "react";
import { VictoryPie, VictoryTooltip } from "victory";

const ChoicePieChart = ({ questionId, formStructure, responses, title }) => {
  // 1. Find the question definition
  const item = formStructure.items.find(
    (i) => i.questionItem?.question?.questionId === questionId
  );
  const options = item?.questionItem?.question?.choiceQuestion?.options ?? [];

  // 2. Count up each option
  const counts = useMemo(() => {
    const acc = {};
    options.forEach((o) => { acc[o.value] = 0; });
    responses.forEach((r) => {
      const answer =
        r.answers?.[questionId]?.textAnswers?.answers?.[0]?.value;
      if (answer in acc) {
        acc[answer]++;
      }
    });
    return acc;
  }, [options, responses, questionId]);

  // 3. Build the data array and compute total
  const data = Object.entries(counts)
    .map(([x, y]) => ({ x, y }))
    .filter((d) => d.y > 0);
  const total = data.reduce((sum, d) => sum + d.y, 0);

  return (
    <div className="chart-container newSmallCard newCard">
      <p className="cartTitle">{title}</p>
      <VictoryPie
        data={data}
        colorScale="qualitative"
        // 4. Show both count and percentage in the tooltip
        labels={({ datum }) =>
          `${datum.x}: ${datum.y} (${((datum.y / total) * 100).toFixed(1)}%)`
        }
        labelComponent={<VictoryTooltip />}
      />
    </div>
  );
};

export default ChoicePieChart;
