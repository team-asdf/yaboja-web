import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import { Home, Setting, Login, About } from "./pages";

import { NavigationBar, Footer } from "./components";
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

          {/* <Route path={PATH.SETTING} component={Setting} /> */}
          <Route path={PATH.ABOUT} component={About} />
          <Route path={PATH.LOGIN} init={false} component={Login} />
          <Route path={PATH.HOME} component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
    <Footer />
  </div>
);

render(<App />, document.getElementById("root"));
