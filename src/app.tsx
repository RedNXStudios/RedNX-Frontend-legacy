import React, { Suspense } from "react";
import AuthStore from "./undux/AuthStore";
import Loading from "./pages/Loading/Loading";
import Routes from "./routes";

import "bootstrap";
import "jquery";

import "./utils/FontAwesome";
import "./utils/I18next";
import "./styles/global.scss";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <AuthStore.Container>
        <Routes />
      </AuthStore.Container>
    </Suspense>
  );
}

export default App;
