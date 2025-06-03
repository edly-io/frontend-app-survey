import React from "react";
import { VictoryChart, VictoryAxis, VictoryBar } from "victory";

const TextResponseChart = ({ questionId, responses }) => {
  let answered = 0;
  let unanswered = 0;

  responses.forEach((r) => {
    const v = r.answers?.[questionId]?.textAnswers?.answers?.[0]?.value;
    if (v && v.trim()) answered++;
    else unanswered++;
  });

  const data = [
    { x: "Answered", y: answered },
    { x: "Unanswered", y: unanswered },
  ];

  return (
    <div className="chart-container">
      <h3>Text Response Completion</h3>
      <VictoryChart domainPadding={20}>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryBar data={data} />
      </VictoryChart>
    </div>
  );
};

export default TextResponseChart;
