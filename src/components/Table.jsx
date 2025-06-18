import React, { useState, useMemo } from "react";


import IndividualResponse from "./IndividualResponse";
import "./Table.scss";

const PAGE_SIZE = 5;

const Table = ({ data }) => {
  const { responses, meta: { items = [] } = {} } = data;
  
  const [page, setPage] = useState(0);
  const [expandedRows, setExpandedRows] = useState(new Set());

  const totalPages = Math.ceil(responses.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = page * PAGE_SIZE;
    return responses.slice(start, start + PAGE_SIZE);
  }, [page, responses]);

  const toggleRow = (id) => {
    setExpandedRows((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) {
        copy.delete(id);
      } else {
        copy.add(id);
      }
      return copy;
    });
  };

  return (
    <div className="responses-table">
      <h2>All Responses</h2>
      <table>
        <thead>
          <tr>
            <th>Submitted</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((resp) => {
            const isExpanded = expandedRows.has(resp.responseId);
            let email = "";
            const answersStr = Object.entries(resp.answers || {})
              .map(([qid, ans]) => {
                const vals =
                  ans.textAnswers?.answers?.map((a) => a.value) || [];
                if (vals[0].includes('@')) {
                  email = vals;
                }
                return vals.join(", ");
              })
              .join(" │ ");
              return (
                <>
                  <tr key={resp.responseId}>
                    <td>{new Date(resp.lastSubmittedTime).toLocaleString()}</td>
                    <td>{email}</td>
                    <td>
                      <span
                        className="expand-btn"
                        onClick={() => toggleRow(resp.responseId)}
                      >
                        {isExpanded ? '-' : '+'}
                      </span>
                    </td>
                </tr>
                {isExpanded && (
                  <IndividualResponse answers={resp.answers} items={items} />
                )}
              </>
            );
          })}
        </tbody>
      </table>

      <div className="pagination">
        <span className="btn"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </span>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <span className="btn"
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </span>
      </div>
    </div>
  );
};

export default Table;
