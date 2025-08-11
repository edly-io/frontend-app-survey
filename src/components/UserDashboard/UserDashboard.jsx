import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from 'react-router-dom';

import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";
import { getConfig } from "@edx/frontend-platform";

import { ResponseDetails } from "../TableTemp";

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("registration");
  const [formId, setFormId] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [ searchParams ] = useSearchParams();
  const username = searchParams.get('username') || '';
  const email = searchParams.get('email') || '';

  const [coursesList, setCoursesList] = useState([]);
  const [data, setData] = useState({
    meta: {
      items: []
    },
    responses: []
  })

  const apiUrl = `${getConfig().LMS_BASE_URL}/api/`;

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleOutsideClick = (e) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await getAuthenticatedHttpClient().get(
          apiUrl + 'dashboard/'
        )

        setCoursesList(responses.data.feedback_forms);
      } catch (error) {
        console.log(error);
      }
    } 

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let URL = "";

      if (activeTab === 'onboarding') {
        URL = `onboarding/q?email=${email}`;
      } else if (activeTab === 'registration') {
        URL = `registration/q?username=${username}`;
      } else {
        URL = `course/q?form_id=${formId}&username=${username}`;
      }

      try {
        const responses = await getAuthenticatedHttpClient().get(
          apiUrl + 'user/' + URL
        )
        setData(responses.data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [activeTab]);


  return (
    <>
      <div className="back-button">
        <Link to="/">← Back</Link>
      </div>
      <h1 className="main-heading">All of the available forms</h1>
      <div className="tab-wrapper">
        <ul className="tab-list">
          <li
            className={`tab ${activeTab === "registration" ? "active" : ""}`}
            onClick={() => handleTabClick("registration")}
          >
            Registration Form
          </li>
          <li
            className={`tab ${activeTab === "onboarding" ? "active" : ""}`}
            onClick={() => handleTabClick("onboarding")}
          >
            Participation Form
          </li>
          <li
            className={`tab dropdown-tab ${isDropdownOpen ? "open" : ""} ${
              coursesList.map(({ course }) => course).includes(activeTab)
                ? "active"
                : ""
            }`}
            onClick={handleDropdownToggle}
            ref={dropdownRef}
          >
            Evaluation Forms
            <ul className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
              {coursesList.map(({ id, course, form_id }) => (
                <li onClick={() => {
                  handleTabClick(course);
                  setFormId(form_id)
                }} key={id}>{course}</li>
              ))}
            </ul>
          </li>
        </ul>

        <div className="tab-content">
          <p>
            Selected tab: <strong>{activeTab}</strong>
          </p>
        </div>
      </div>

      <div className="response-wrapper">
        <ResponseDetails 
          answers={
            data.responses?.length > 0 
              ? data.responses[0].answers
              : data.responses
            } 
          items={
            data.meta.items
          } 
        />
      </div>
    </>
  )
}


export default UserDashboard;