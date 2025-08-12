import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";
import { getConfig } from "@edx/frontend-platform";

import './Styles.scss';

const PAGE_SIZE = 10;

const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [data, setData] = useState({
    users: [],
    feedback_forms: [],
  })
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(data.users.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = page * PAGE_SIZE;
    return data.users.slice(start, start + PAGE_SIZE);
  }, [page, data.users]);

  const apiUrl = `${getConfig().LMS_BASE_URL}/api/`;
  const FORM_DASHBOARD = '/form-dashboard';

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await getAuthenticatedHttpClient().get(
          apiUrl + 'dashboard/'
        )

        setData(responses.data);
      } catch (error) {
        console.log(error);
      }
    } 

    fetchData();
  }, [])


  return (
   <div className="main-dashboard">
    <h1 className="main-heading">Dashboard</h1>
    <div className="tab-wrapper">
      <ul className="tab-list">
        <li className="tab" onClick={() => navigate(`${FORM_DASHBOARD}?type=onboarding&title=Participation%20Form`)}>Participation Form</li>
        <li className="tab" onClick={() => navigate(`${FORM_DASHBOARD}?type=registration&title=Registration%20Form`)} >Registration Form</li>
        <li
          className={`tab dropdown-tab ${isDropdownOpen ? "open" : ""}`}
          onClick={handleDropdownToggle}
          ref={dropdownRef}
        >
          Evaluation Forms
          <ul className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
            {data.feedback_forms.map(({ id, course, form_id }) => (
              <li key={id} onClick={() => navigate(`${FORM_DASHBOARD}?type=course&id=${form_id}&title=${course}`)}>{course}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>

    <div className="table-container">
      <div className="table-responsive">
        <table className="submissions-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map(({ id, username, email }) => (
              <tr key={id}>
                <td>{username}</td>
                <td>{email}</td>
                <td>
                  <Link to={`/user-dashboard?username=${username}&email=${email}`}>
                    <span className='back-btn-text'>View Details</span>
                  </Link>
                </td>
              </tr>
            ))}
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
   </div>
  )
};

export default Dashboard;
