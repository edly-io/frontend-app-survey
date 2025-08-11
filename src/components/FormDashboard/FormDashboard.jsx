import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";
import { getConfig } from "@edx/frontend-platform";

import Loader from '../Loader';
import AutoDashboard from "../AutoDashboard";
import Table from '../TableTemp';

const FormDashboard = () => {
  const [ searchParams ] = useSearchParams();
  const type = searchParams.get('type') || '';
  const id = searchParams.get('id') || '';

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [formsData, setFormData] = useState([]);
  const [error, setError] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const apiUrl = `${getConfig().LMS_BASE_URL}/api/`;
  const FORM_DASHBOARD = '/form-dashboard';

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const responses = await getAuthenticatedHttpClient().get(
          apiUrl + 'dashboard/'
        )

        setFormData(responses.data.feedback_forms);
      } catch (error) {
        console.log(error);
      }
    } 

    fetchData();
  }, [type, id])

  useEffect(() => {
    const language = getCookieValue('openedx-language-preference');
    const isEnglish = language === 'en';

    const fetchFormsData = async () => {
      let REQUEST_URL = "";

      if (type === 'course') {
        REQUEST_URL = `responses/course/q?form_id=${id}`;
      } else if (type === 'registration') {
        REQUEST_URL = `responses/registration`;
      } else if (type === 'onboarding') {
        REQUEST_URL = `responses/q?language=${isEnglish ? 'en' : 'fr-ca'}`
      }

      try {
        const response = await getAuthenticatedHttpClient().get(
          apiUrl + REQUEST_URL,
        )
        setData(response.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }

    fetchFormsData();
  }, [type, id]);

  if (loading) return <Loader />;
  if (error) <>{error}</>;

  if (Object.keys(data).length === 0) return <></>;

  return (
    <div className="main-dashboard">
      <div className="back-button">
        <Link to="/">← Back</Link>
      </div>

      <div className="tab-wrapper">
        <h1 className="main-heading">All of the available forms</h1>  
        <ul className="tab-list">
          <li className="tab" onClick={() => navigate(`/${FORM_DASHBOARD}?type=onboarding`)}>Participation Form</li>
          <li className="tab" onClick={() => navigate(`/${FORM_DASHBOARD}?type=registration`)} >Registration Form</li>
          <li
            className={`tab dropdown-tab ${isDropdownOpen ? "open" : ""}`}
            onClick={handleDropdownToggle}
            ref={dropdownRef}
          >
            Evaluation Forms
            <ul className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
              {formsData.map(({ id, course, form_id }) => (
                <li key={id} onClick={() => navigate(`/${FORM_DASHBOARD}?type=course&id=${form_id}`)}>{course}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <Table data={data} />
      <AutoDashboard data={data} />
    </div>
  );
};

export default FormDashboard;
