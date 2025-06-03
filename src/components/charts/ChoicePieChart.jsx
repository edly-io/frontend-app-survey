import React from "react";
import { VictoryPie, VictoryTooltip } from "victory";

const ChoicePieChart = ({ questionId, formStructure, responses }) => {
  const item = formStructure.items.find(
    (i) => i.questionItem?.question?.questionId === questionId
  );
  const title = item?.title || "Untitled Question";
  const options = item?.questionItem?.question?.choiceQuestion?.options || [];

  const counts = options.reduce((acc, o) => {
    acc[o.value] = 0;
    return acc;
  }, {});
  responses.forEach((r) => {
    const ans = r.answers?.[questionId]?.textAnswers?.answers?.[0]?.value;
    if (ans) counts[ans] = (counts[ans] || 0) + 1;
  });

  const data = Object.entries(counts)
    .map(([x, y]) => ({ x, y }))
    .filter((d) => d.y > 0);

  return (
    <div className="chart-container">
      <h3>{title}</h3>
      <VictoryPie
        data={data}
        colorScale="qualitative"
        labels={({ datum }) => `${datum.x}: ${datum.y}`}
        labelComponent={<VictoryTooltip />}
      />
    </div>
  );
};

export default ChoicePieChart;
