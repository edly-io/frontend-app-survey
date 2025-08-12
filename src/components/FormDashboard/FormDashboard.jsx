import { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';

import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";
import { getConfig } from "@edx/frontend-platform";

import Loader from '../Loader';
import AutoDashboard from "../AutoDashboard";
import Table from '../TableTemp';
import RangeToggle from '../RangeToggle';

const FormDashboard = () => {
  const [ searchParams ] = useSearchParams();
  const type = searchParams.get('type') || '';
  const title = searchParams.get('title') || '';
  const id = searchParams.get('id') || '';
  const [isPie, setIsPie] = useState(1);

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
    <>
      <div className="back-button">
        <Link to="/">
          <span className='back-btn-text'>← Dashboard</span>
        </Link>
      </div>

      <div className="tab-wrapper">
        <ul className="tab-list">
          <li 
            className={`tab ${type === "onboarding" ? "active" : ""}`} 
            onClick={() => navigate(`/${FORM_DASHBOARD}?type=onboarding&title=Participation%20Form`)}
          >
            Participation Form
          </li>
          <li 
            className={`tab ${type === "registration" ? "active" : ""}`} 
            onClick={() => navigate(`/${FORM_DASHBOARD}?type=registration&title=Registration%20Form`)} 
          >
            Registration Form
          </li>
          <li
            className={`tab dropdown-tab ${isDropdownOpen ? "open" : ""} ${
              formsData.map(({ form_id }) => form_id).includes(id)
                ? "active"
                : ""
            }`}
            onClick={handleDropdownToggle}
            ref={dropdownRef}
          >
            Evaluation Forms
            <ul className={`dropdown ${isDropdownOpen ? "show" : ""}`}>
              {formsData.map(({ id, course, form_id }) => (
                <li key={id} onClick={() => navigate(`/${FORM_DASHBOARD}?type=course&id=${form_id}&title=${course}`)}>{course}</li>
              ))}
            </ul>
          </li>
        </ul>
        <h1 className="main-heading">{title}</h1>  
      </div>
      <Table data={data} />
      <RangeToggle value={isPie} onChange={setIsPie} label="Bar" />
      <AutoDashboard data={data} isPie={isPie} />
    </>
  );
};

export default FormDashboard;
