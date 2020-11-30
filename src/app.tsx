import React, { Suspense } from "react";
import Routes from "./routes";

import "./utils/FontAwesome";
import "./utils/I18next";

import Loading from "./pages/Loading/Loading";
import UnduxStores from "./undux/UnduxStores";
import SessionCheck from "./services/SessionCheck";

import "bootstrap";
import "jquery";
import "./styles/global.scss";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <UnduxStores.Container>
        <SessionCheck>
          <Routes />
        </SessionCheck>
      </UnduxStores.Container>
    </Suspense>
  );
}

export default App;
