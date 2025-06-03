import React from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryGroup,
  VictoryBar,
  VictoryLegend,
} from "victory";

const GridBarChart = ({ questionId, formStructure, responses }) => {
  const gridItems = formStructure.items.filter(
    (i) =>
      i.questionItem?.question?.questionId === questionId || i.questionGroupItem
  );

  const groupDef = formStructure.items.find((i) => i.questionGroupItem)
    ?.questionGroupItem?.questionGroup;
  const columns = groupDef?.columns || [];

  const series = gridItems
    .filter((i) => i.questionItem?.question?.questionId)
    .map((rowItem) => {
      const rowId = rowItem.questionItem.question.questionId;
      const rowLabel = rowItem.title;
      const counts = columns.reduce((acc, col) => {
        acc[col.value] = 0;
        return acc;
      }, {});
      responses.forEach((r) => {
        const ans = r.answers?.[rowId]?.textAnswers?.answers || [];
        ans.forEach((a) => {
          if (counts[a.value] != null) counts[a.value]++;
        });
      });
      return {
        rowLabel,
        data: Object.entries(counts).map(([x, y]) => ({ x, y })),
      };
    });

  return (
    <div className="chart-container">
      <h3>{groupDef?.title || "Grid Question"}</h3>
      <VictoryChart domainPadding={20}>
        <VictoryAxis />
        <VictoryAxis dependentAxis />
        <VictoryGroup offset={20}>
          {series.map((s) => (
            <VictoryBar key={s.rowLabel} data={s.data} />
          ))}
        </VictoryGroup>
      </VictoryChart>
      <VictoryLegend
        x={50}
        y={10}
        orientation="horizontal"
        data={columns.map((col) => ({ name: col.value }))}
      />
    </div>
  );
};

export default GridBarChart;
