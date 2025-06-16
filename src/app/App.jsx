import React, { useState } from "react";

import { Container } from "@openedx/paragon";
import Dashboard from "../components/Dashboard";

const App = () => {
  return (
    <main>
      <Container className="py-5">
        <Dashboard />
      </Container>
    </main>
  );
};

export default App;