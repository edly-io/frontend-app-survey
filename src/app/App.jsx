import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Container } from "@openedx/paragon";
import { getConfig } from "@edx/frontend-platform";
import { getAuthenticatedHttpClient } from "@edx/frontend-platform/auth";

import { Dashboard, FormDashboard, UserDashboard } from "../components";

const App = () => {
  const [isAllowed, setIsAllowed] = useState(false);

  const apiUrl = `${getConfig().LMS_BASE_URL}/api/`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await getAuthenticatedHttpClient().get(
          apiUrl + 'allowed/'
        )

        setIsAllowed(responses.data.is_allowed);
      } catch (error) {
        console.log(error);
      }
    } 

    fetchData();
  }, [])

  return (
    <main>
      {isAllowed ? (
        <Container className="py-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="form-dashboard/" element={<FormDashboard />} key={location.search} />
            <Route path="user-dashboard/" element={<UserDashboard />} key={location.search} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </Container>
        ): <h1>403: You do not have necessary permissions to access this page.</h1>
      }
    </main>
  );
};

export default App;