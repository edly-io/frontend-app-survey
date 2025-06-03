import React from "react";
import { VictoryChart, VictoryAxis, VictoryHistogram } from "victory";

const ScaleHistogram = ({ questionId, responses }) => {
  const data = responses.reduce((arr, r) => {
    const v = r.answers?.[questionId]?.textAnswers?.answers?.[0]?.value;
    const n = parseInt(v, 10);
    if (!isNaN(n)) arr.push({ x: n });
    return arr;
  }, []);

  return (
    <div className="chart-container">
      <h3>Scale Distribution</h3>
      <VictoryChart domainPadding={20}>
        <VictoryAxis label="Value" />
        <VictoryAxis dependentAxis label="Count" />
        <VictoryHistogram data={data} />
      </VictoryChart>
    </div>
  );
};

export default ScaleHistogram;
