import React, { Suspense } from "react";
import Net from "./utils/Net";
import { deleteAuthenticationToken } from "./utils/LocalStorage";
import Routes from "./routes";

import "bootstrap";
import "jquery";

import "./utils/FontAwesome";
import "./utils/I18next";
import "./styles/global.scss";
import Loading from "./pages/Loading/Loading";
import AuthStore from "./undux/AuthStore";

function App() {
  Net.get("/api/auth/checksession").then((response) => {
    if (response.data && response.data.isValid === false) {
      deleteAuthenticationToken();
    }
  });
  return (
    <Suspense fallback={<Loading />}>
      <AuthStore.Container>
        <Routes />
      </AuthStore.Container>
    </Suspense>
  );
}

export default App;
