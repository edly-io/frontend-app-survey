import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import AutoDashboard from "../AutoDashboard";
import Table from '../TableTemp';

import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";
import { getConfig } from "@edx/frontend-platform";

const FormDashboard = () => {
  const [ searchParams ] = useSearchParams();
  const type = searchParams.get('type') || '';
  const id = searchParams.get('id') || '';

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const apiUrl = `${getConfig().LMS_BASE_URL}/api/`;

  const getCookieValue = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

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
  }, []);

  if (loading) return <>Loading...</>;
  if (error) <>{error}</>;

  if (Object.keys(data).length === 0) return <></>;

  console.log(data);

  return (
    <>
      <Table data={data} />
      <AutoDashboard data={data} />
    </>
  );
};

export default FormDashboard;
