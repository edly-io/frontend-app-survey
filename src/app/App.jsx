import React, { useState } from "react";

import { Container } from "@openedx/paragon";
import LoginButton from "./LoginButton";
import Dashboard from "../components/Dashboard";

const formIdEn = "14MuRMvwkwu2g3tFH3KGcAa9fR_3rCf3RfDRKTZ9MyiA";

const App = () => {
  const [token, setToken] = useState("");

  return (
    <main>
      <Container className="py-5">
        {!token ? (
          <LoginButton
            onSuccess={(token) => setToken(token)}
            onError={(error) => console.log(error)}
          />
        ) : (
          <Dashboard accessToken={token} formId={formIdEn} />
        )}
      </Container>
    </main>
  );
};

export default App;