import TableDataWrapper from "./TableDataWrapper";
import AutoDashboard from "./AutoDashboard";

const Dashboard = ({ accessToken, formId }) => {
  const formIdEn = "14MuRMvwkwu2g3tFH3KGcAa9fR_3rCf3RfDRKTZ9MyiA";
  const formIdFr = "17Mpxpp44GW4VPEXK0qLZcVLYc5Ikm_vNuipTMPngHxc";

  return (
    <>
      <TableDataWrapper accessToken={accessToken} formIdEn={formIdEn} formIdFr={formIdFr} />
      <AutoDashboard accessToken={accessToken} formIdEn={formIdEn} formIdFr={formIdFr} />
    </>
  );
};

export default Dashboard;
