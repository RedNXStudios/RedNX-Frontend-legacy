import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthStore, { StoreProps } from "../undux/AuthStore";
import PrivateRoute from "./PrivateRoute";

import Home from "../pages/Home";

class Routes extends React.Component<StoreProps> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact component={Home} path="/" />
          <PrivateRoute component={Home} path="/f" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default AuthStore.withStore(Routes);
