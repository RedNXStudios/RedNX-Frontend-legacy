import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import UnduxStores, { StoreProps } from "../undux/UnduxStores";
import ProfileLoader from "../services/ProfileLoader";

import OnlyPublicRoute from "./OnlyPublicRoute";
import PrivateRoute from "./PrivateRoute";

const SideBar = React.lazy(() => import("../components/SideBar"));
const NavBar = React.lazy(() => import("../components/NavBar"));

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Auth/Login"));
const Register = React.lazy(() => import("../pages/Auth/Register"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Channel = React.lazy(() => import("../pages/Channel"));
const Watch = React.lazy(() => import("../pages/Watch"));

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
      <ProfileLoader />
      <NavBar />
      <SideBar />
      <Switch>
        <Route exact component={Home} path="/" />
        <Route component={Channel} path="/channel/:link" />
        <Route component={Watch} path="/watch/:guid" />
        <PrivateRoute component={Dashboard} path="/dashboard" />
      </Switch>
    </div>
  );
}

export default UnduxStores.withStores(Routes);
