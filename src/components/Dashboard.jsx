import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AutoDashboard from "./AutoDashboard";
import Table from './Table';

import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";
import { getConfig } from "@edx/frontend-platform";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const apiUrl = `${getConfig().LMS_BASE_URL}/api/`;

  useEffect(() => {
    const fetchFormsData = async () => {
      try {
        const response = await getAuthenticatedHttpClient().get(
          apiUrl + "responses/"
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

  if (loading) return <></>;
  if (error) <>{error}</>;

  if (Object.keys(data).length === 0) return <></>;
  //   navigate("404", { replace: true });
  //   return null;
  // }

  return (
    <>
      <Table responses={data.responses} />
      <AutoDashboard data={data} />
    </>
  );
};

export default Dashboard;
