import React from "react";
import {
  RouteProps as RouterPropsDOM,
  Route,
  Redirect,
} from "react-router-dom";
import UnduxStores from "../undux/UnduxStores";

const OnlyPublicRoute: React.FC<RouterPropsDOM> = ({
  component: Component,
  ...rest
}) => {
  let { auth } = UnduxStores.useStores();
  return auth.get("isAuthenticated") ? (
    <Redirect to="/" />
  ) : (
    <Route component={Component} {...rest} />
  );
};

export default OnlyPublicRoute;
