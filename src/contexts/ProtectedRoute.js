import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthConsumer } from "./AuthContext";

const ProtectedRoute = ({
  initialized,
  component: Component,
  init = true,
  ...rest
}) => (
  <Route
    render={props =>
      initialized === init ? <Component {...props} /> : <Redirect to="/" />
    }
    {...rest}
  />
);

const ProtectedRouteContainer = ({ component, init = true, ...rest }) => (
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

export default ProtectedRouteContainer;
