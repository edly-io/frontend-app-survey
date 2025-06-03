import React from 'react';
import {
  VictoryBar,
  VictoryPie,
  VictoryChart,
  VictoryAxis,
  VictoryTheme
} from 'victory';

const sampleBarData = [
  { category: 'Math', value: 40 },
  { category: 'Science', value: 55 },
  { category: 'History', value: 30 },
  { category: 'Art', value: 20 }
];

const samplePieData = [
  { x: 'Beginner', y: 35 },
  { x: 'Intermediate', y: 40 },
  { x: 'Advanced', y: 25 }
];

const sampleLineData = [
  { week: 1, submissions: 10 },
  { week: 2, submissions: 25 },
  { week: 3, submissions: 45 },
  { week: 4, submissions: 30 }
];

export default function DashboardCharts() {
  return (
    <div style={{ display: 'grid', gap: '2rem', padding: '2rem' }}>
      {/* Bar Chart */}
      <div>
        <h3>Course Popularity</h3>
        <VictoryBar
          data={sampleBarData}
          x="category"
          y="value"
          style={{ data: { fill: '#4c6ef5' } }}
        />
      </div>

      {/* Pie Chart */}
      <div>
        <h3>Skill Level Distribution</h3>
        <VictoryPie
          data={samplePieData}
          innerRadius={50}
          labelRadius={80}
          style={{
            data: { stroke: '#fff', strokeWidth: 2 },
            labels: { fontSize: 12 },
            width: '30%',
          }}
        />
      </div>

      {/* Line Chart with Axes */}
      <div>
        <h3>Weekly Submissions</h3>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: [20, 20], y: [10, 10] }}
          style={{
            width: '30%',
          }}
        >
          <VictoryAxis
            tickValues={[1, 2, 3, 4]}
            label="Week"
            style={{
              axisLabel: { padding: 30, fontSize: 12 }
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => `${t}`}
            label="Submissions"
            style={{
              axisLabel: { padding: 40, fontSize: 12 }
            }}
          />
          <VictoryBar
            data={sampleLineData}
            x="week"
            y="submissions"
            style={{ data: { fill: '#f472b6' } }}
          />
        </VictoryChart>
      </div>
    </div>
  );
}
