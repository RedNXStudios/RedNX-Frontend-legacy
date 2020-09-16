import React, { Suspense } from "react";
import AuthStore from "./undux/AuthStore";
import Loading from "./pages/Loading";
import Routes from "./routes";

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
