// import useAxios from "axios-hooks";

import Table from "./Table";
import AutoDashboard from "./AutoDashboard";

const Dashboard = ({ accessToken, formId }) => {
  // const [{ data, loading, error }] = useAxios({
  //   url: `https://forms.googleapis.com/v1/forms/${formId}/responses`,
  //   headers: { Authorization: `Bearer ${accessToken}` },
  // });

  return (
    <>
      <Table accessToken={accessToken} formId={formId} />
      <AutoDashboard accessToken={accessToken} formId={formId} />
    </>
  );
};

export default Dashboard;
