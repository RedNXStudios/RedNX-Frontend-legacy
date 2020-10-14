import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AuthStore, { StoreProps } from "../undux/AuthStore";
import ChannelStore from "../undux/ChannelStore";
import FeedStore from "../undux/FeedStore";
import ProfileStore from "../undux/ProfileStore";
import SideBarStore from "../undux/SideBarStore";
import WatchStore from "../undux/WatchStore";

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
      <ProfileStore.Container>
        <ChannelStore.Container>
          <WatchStore.Container>
            <FeedStore.Container>
              <SideBarStore.Container>
                <NavBar />
                <SideBar />
                <Switch>
                  <Route exact component={Home} path="/" />
                  <Route component={Channel} path="/channel/:link" />
                  <Route component={Watch} path="/watch/:guid" />
                  <PrivateRoute component={Dashboard} path="/dashboard" />
                </Switch>
              </SideBarStore.Container>
            </FeedStore.Container>
          </WatchStore.Container>
        </ChannelStore.Container>
      </ProfileStore.Container>
    </div>
  );
}

export default AuthStore.withStore(Routes);
