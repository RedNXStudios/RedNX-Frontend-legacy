import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthStore, { StoreProps } from "../undux/AuthStore";
import SideBarStore from "../undux/SideBarStore";

import OnlyPublicRoute from "./OnlyPublicRoute";
import PrivateRoute from "./PrivateRoute";

const SideBar = React.lazy(() => import("../components/SideBar/SideBar"));
const NavBar = React.lazy(() => import("../components/NavBar/NavBar"));

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));

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
      <div className="page-content">
        <Switch>
          <Route exact component={Home} path="/" />
          <PrivateRoute component={Dashboard} path="/dashboard" />
        </Switch>
      </div>
    </div>
  );
}

export default AuthStore.withStore(Routes);
