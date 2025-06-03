import React, { useState, useMemo } from "react";
import useAxios from "axios-hooks";
import "./Table.scss";

const PAGE_SIZE = 3;

const Table = ({ formId, accessToken }) => {
  const [{ data, loading, error }] = useAxios({
    url: `https://forms.googleapis.com/v1/forms/${formId}/responses`,
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const responses = useMemo(() => {
    const list = data?.responses || [];
    return list
      .slice()
      .sort(
        (a, b) => new Date(b.lastSubmittedTime) - new Date(a.lastSubmittedTime)
      );
  }, [data]);

  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(responses.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = page * PAGE_SIZE;
    return responses.slice(start, start + PAGE_SIZE);
  }, [page, responses]);

  if (loading) return <p>Loading responses…</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="responses-table">
      <h2>All Responses</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Submitted</th>
            <th>Answers</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((resp) => {
            const answersStr = Object.entries(resp.answers || {})
              .map(([qid, ans]) => {
                const vals =
                  ans.textAnswers?.answers?.map((a) => a.value) || [];
                return vals.join(", ");
              })
              .join(" │ ");
            return (
              <tr key={resp.responseId}>
                <td>{resp.respondentEmail || "—"}</td>
                <td>{new Date(resp.lastSubmittedTime).toLocaleString()}</td>
                <td>{answersStr}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
