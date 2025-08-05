import React, { useState, useRef } from 'react';

import './Styles.scss';

const Dashboard = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };


  return (
   <div className="main-dashboard">
    <h1 className="main-heading">All of the available forms</h1>
    <div className="tab-wrapper">
        <ul className="tab-list">
          <li className={"tab"} >
            Onboarding Form
          </li>

          <li
            className={`tab`}
          >
            Registration Form
          </li>
          <li
            className={`tab dropdown-tab ${isDropdownOpen ? "open" : ""}`}
            onClick={handleDropdownToggle}
            ref={dropdownRef}
          >
            Courses
            <ul className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
              <li onClick={() => handleTabClick("course1")}>Course 1</li>
              <li onClick={() => handleTabClick("course2")}>Course 2</li>
              <li onClick={() => handleTabClick("course3")}>Course 3</li>
            </ul>
          </li>
        </ul>

        <div className="tab-content">
          <p>
          </p>
        </div>
      </div>
   </div>
  )
};

export default Dashboard;
