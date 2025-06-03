import React from "react";
import { VictoryChart, VictoryAxis, VictoryLine } from "victory";

const DateLineChart = ({ questionId, responses }) => {
  const counts = {};
  responses.forEach((r) => {
    const d = new Date(r.lastSubmittedTime).toISOString().slice(0, 10);
    counts[d] = (counts[d] || 0) + 1;
  });

  const data = Object.entries(counts).map(([x, y]) => ({
    x: new Date(x),
    y,
  }));

  return (
    <div className="chart-container">
      <h3>Responses Over Time</h3>
      <VictoryChart scale={{ x: "time" }} domainPadding={10}>
        <VictoryAxis fixLabelOverlap />
        <VictoryAxis dependentAxis />
        <VictoryLine data={data} />
      </VictoryChart>
    </div>
  );
};

export default DateLineChart;
