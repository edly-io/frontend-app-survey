import "core-js/stable";
import "regenerator-runtime/runtime";

import {
  APP_INIT_ERROR,
  APP_READY,
  subscribe,
  initialize,
  getConfig,
  mergeConfig,
} from "@edx/frontend-platform";
import { AppProvider, ErrorPage } from "@edx/frontend-platform/react";
import ReactDOM from "react-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "@edx/frontend-component-header";
import { FooterSlot } from "@edx/frontend-component-footer";
import messages from "./i18n";
import App from "./app/App";

import "./index.scss";

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <GoogleOAuthProvider clientId={getConfig().GOOGLE_CLIENT_ID}>
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
    handlers: {
    config: () => {
      mergeConfig({
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      }, 'App loadConfig override handler');
    },
  },
});
