import React from "react";
import useAxios from "axios-hooks";

import ChoicePieChart from "./charts/ChoicePieChart";
import ScaleHistogram from "./charts/ScaleHistogram";
import TextResponseChart from "./charts/TextResponseChart";
import DateLineChart from "./charts/DateLineChart";
import GridBarChart from "./charts/GridBarChart";

import "./AutoDashboard.scss";

const AutoDashboard = ({ accessToken, formIdEn, formIdFr }) => {
  const [{ data: formMetaEn, loading: loadingMetaEn, error: errMetaEn }] = useAxios({
    url: `https://forms.googleapis.com/v1/forms/${formIdEn}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const [{ data: formMetaFr, loading: loadingMetaFr, error: errMetaFr }] = useAxios({
    url: `https://forms.googleapis.com/v1/forms/${formIdFr}`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const [{ data: respDataEn, loading: loadingRespEn, error: errRespEn }] = useAxios({
    url: `https://forms.googleapis.com/v1/forms/${formIdEn}/responses`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const [{ data: respDataFr, loading: loadingRespFr, error: errRespFr }] = useAxios({
    url: `https://forms.googleapis.com/v1/forms/${formIdFr}/responses`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (loadingMetaEn || loadingRespEn || loadingMetaFr || loadingRespFr) return <p>Loading dashboard…</p>;
  if (errMetaEn || errRespEn || errMetaFr || errRespFr) return <p>Error loading data.</p>;

  const responses = [...respDataEn.responses || [], ...respDataFr.responses || []];
  const items = formMetaEn.items || [];

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
              formStructure={formMetaEn}
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
