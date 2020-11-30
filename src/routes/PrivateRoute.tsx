import React from "react";
import { RouteProps as RouterPropsDOM, Route, Redirect } from 'react-router-dom'
import UnduxStores from "../undux/UnduxStores";

const PrivateRoute:React.FC<RouterPropsDOM> = ({ component: Component, ...rest }) => {
  let { auth } = UnduxStores.useStores();
  return auth.get("isAuthenticated") ? (
    <Route component={Component} {...rest} />
  ) : (
    <Redirect to="login" />
  );
}

export default PrivateRoute;
