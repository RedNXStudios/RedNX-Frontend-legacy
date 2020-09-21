import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthStore, { StoreProps } from "../undux/AuthStore";
import SideBarStore from "../undux/SideBarStore";

import OnlyPublicRoute from "./OnlyPublicRoute";

const SideBar = React.lazy(() => import("../components/SideBar/SideBar"));
const NavBar = React.lazy(() => import("../components/NavBar/NavBar"));

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register"));

class Routes extends React.Component<StoreProps> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <OnlyPublicRoute component={Login} path="/login" />
          <OnlyPublicRoute component={Register} path="/register" />
          <Route component={SubRoute} />
        </Switch>
      </BrowserRouter>
    );
  }
}

function SubRoute() {
  return (
    <div className="wrapper">
      <SideBarStore.Container>
        <AuthStore.Container>
          <NavBar />
        </AuthStore.Container>
        <SideBar />
      </SideBarStore.Container>
      <Switch>
        <div className="page-content">
          <Route exact component={Home} path="/" />
        </div>
      </Switch>
    </div>
  );
}

export default AuthStore.withStore(Routes);
