import React from "react";
import useAxios from "axios-hooks";

import ChoicePieChart from "./charts/ChoicePieChart";
import ScaleHistogram from "./charts/ScaleHistogram";
import TextResponseChart from "./charts/TextResponseChart";
import DateLineChart from "./charts/DateLineChart";
import GridBarChart from "./charts/GridBarChart";

import "./AutoDashboard.scss";

const AutoDashboard = ({ data }) => {
const { meta: formMeta, responses, meta: { items = [] } = {} } = data;

  return (
    <div className="auto-dashboard">
      {items.map((item) => {
        const q = item.questionItem?.question;
        if (!q) return null;

        const qid = q.questionId;
        const title = item.title;

        if (q.choiceQuestion) {
          // Multiple choice / Checkbox / Dropdown
          return (
            <ChoicePieChart
              key={qid}
              questionId={qid}
              formStructure={formMeta}
              responses={responses}
            />
          );
        }

        if (q.scaleQuestion || q.ratingQuestion) {
          // Linear scale or rating
          return (
            <ScaleHistogram key={qid} questionId={qid} responses={responses} />
          );
        }

        if (q.textQuestion) {
          // Short answer / paragraph
          return (
            <TextResponseChart
              key={qid}
              questionId={qid}
              responses={responses}
            />
          );
        }

        if (item.questionGroupItem) {
          // Grid (matrix) questions
          return (
            <GridBarChart
              key={qid}
              questionId={qid}
              formStructure={formMeta}
              responses={responses}
            />
          );
        }

        if (q.dateQuestion || q.timeQuestion) {
          // Date/time inputs
          return (
            <DateLineChart key={qid} questionId={qid} responses={responses} />
          );
        }

        // Fallback: show a simple text chart
        return (
          <TextResponseChart key={qid} questionId={qid} responses={responses} />
        );
      })}
    </div>
  );
};

export default AutoDashboard;
