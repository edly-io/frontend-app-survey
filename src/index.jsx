import "core-js/stable";
import "regenerator-runtime/runtime";

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
} from "@edx/frontend-platform";
import { AppProvider, ErrorPage } from "@edx/frontend-platform/react";
import ReactDOM from "react-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "@edx/frontend-component-header";
import { FooterSlot } from "@edx/frontend-component-footer";
import messages from "./i18n";
import App from "./app/App";

import "./index.scss";

// TODO
const GOOGLE_CLIENT_ID =
  "CLIENT_ID_HERE";

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <Header />
        <App />
        <FooterSlot />
      </GoogleOAuthProvider>
    </AppProvider>,
    document.getElementById("root")
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(
    <ErrorPage message={error.message} />,
    document.getElementById("root")
  );
});

initialize({
  messages,
});
