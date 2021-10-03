//this route will be used as a component for protected tourtes
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, userInfo, role, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !localStorage.getItem("jwt") ? (
        <Component {...props} />
      ) : (
        <Redirect to="/dashboard" />
      )
    }
  />
);

export default PublicRoute;
