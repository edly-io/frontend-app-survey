import React, { useState } from "react";

import { Container } from "@openedx/paragon";
import LoginButton from "./LoginButton";
import Dashboard from "../components/Dashboard";

// TODO
const FORM_ID = "FORM_ID_HERE";

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
          <Dashboard accessToken={token} formId={FORM_ID} />
        )}
      </Container>
    </main>
  );
};

export default App;