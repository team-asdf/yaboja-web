import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "./AuthContext";
import { PATH } from "../consts/consts";

const ProtectedRoute = ({
  initialized,
  component: Component,
  init = true,
  ...rest
}) => (
  <Route
    render={props =>
      initialized === init ? (
        <Component {...props} />
      ) : (
        <Redirect to={PATH.HOME} />
      )
    }
    {...rest}
  />
);

const ProtectedRouteContainer = ({ component, init = true, ...rest }) => {
  return (
    <AuthConsumer>
      {({ state, actions }) => (
        <ProtectedRoute
          initialized={state.initialized}
          component={component}
          init={init}
          rest={rest}
        />
      )}
    </AuthConsumer>
  );
};

export default ProtectedRouteContainer;
