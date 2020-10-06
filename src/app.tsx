import React, { Suspense } from "react";
import Routes from "./routes";

import "./utils/FontAwesome";
import "./utils/I18next";

import Loading from "./pages/Loading/Loading";
import AuthStore from "./undux/AuthStore";
import SessionCheck from "./utils/SessionCheck";

import "bootstrap";
import "jquery";
import "./styles/global.scss";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthStore.Container>
        <SessionCheck>
          <Routes />
        </SessionCheck>
      </AuthStore.Container>
    </Suspense>
  );
}

export default App;
