import React from "react";
import Router from "router";
import AppContextProvider from "context";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  const clientID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientID}>
      <AppContextProvider>
        <Router />
      </AppContextProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
