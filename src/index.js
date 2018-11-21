import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import { Home, Setting, Login, About } from "./pages";

import { NavigationBar } from "./components";
import ProtectedRoute from "./contexts/ProtectedRoute";

import { PATH } from "./consts/consts";

import "./scss/main.scss";

const App = () => (
  <div className="site default-layout">
    <Router>
      <AuthProvider>
        <NavigationBar />
        <Switch>
          <ProtectedRoute path={PATH.SETTING} component={Setting} />
          <ProtectedRoute path={PATH.ABOUT} component={About} />
          <ProtectedRoute path={PATH.LOGIN} init={false} component={Login} />
          <Route path={PATH.HOME} component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
  </div>
);

render(<App />, document.getElementById("root"));
