import React, { Suspense } from "react";
import AuthStore from "./undux/AuthStore";
import Loading from "./pages/Loading";
import Routes from "./routes";

import "./utils/FontAwesome";
import "./styles/global.scss";

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <div className="content">
        <AuthStore.Container>
          <Routes />
        </AuthStore.Container>
      </div>
    </Suspense>
  );
}

export default App;
