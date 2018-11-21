import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import { Home, Setting, Login, About } from "./pages";

import { NavigationBar } from "./components";
import ProtectedRoute from "./contexts/ProtectedRoute";

const App = () => (
  <div>
    <Router>
      <AuthProvider>
        <NavigationBar />
        <Switch>
          <ProtectedRoute path="/setting" component={Setting} />
          <ProtectedRoute path="/about" component={About} />
          <ProtectedRoute path="/login" init={false} component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </AuthProvider>
    </Router>
  </div>
);

render(<App />, document.getElementById("root"));
