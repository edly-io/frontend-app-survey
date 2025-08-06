import { useState, useMemo } from "react";

import ResponseDetail from "./ResponseDetail";

const PAGE_SIZE = 10;

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
    <div className="table-container">
      <h2>Recent Submissions</h2>
      <div className="table-responsive">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Submitted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(response => {

              const isExpanded = expandedRows.has(response.responseId);
              let email = "";
              let timeStamp = new Date(response.lastSubmittedTime).toLocaleString();

              Object.entries(response.answers || {})
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
                  <tr key={response.responseId}>
                    <td>{email}</td>
                    <td>{timeStamp === 'Invalid Date' ? 'Unavailble' : timeStamp}</td>
                    <td onClick={() => toggleRow(response.responseId)} className="actionData">
                      <span>
                      {isExpanded ? '-' : '+'}
                      </span>
                    </td>
                  </tr>
                  {isExpanded && <ResponseDetail answers={response.answers} items={items} />}
                </>
              )
            })}
          </tbody>
        </table>

        <div className="pagination-container">
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
    </div>
  )
}


export default Table;