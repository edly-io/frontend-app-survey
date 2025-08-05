import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { Container } from "@openedx/paragon";

import { Dashboard, FormDashboard, UserDashboard } from "../components";

const App = () => {
  return (
    <main>
      <Container className="py-5">
       <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path="form-dashboard/" element={<FormDashboard />} />
         <Route path="user-dashboard/" element={<UserDashboard />} />
       </Routes>
      </Container>
    </main>
  );
};

export default App;