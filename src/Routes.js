import React from "react";
import { Route, Router } from "react-router-dom";
import Callback from "./Authentication/Callback";
import Auth from "./Authentication/AuthenticationService";
import history from "./Authentication/History";
import App from "./App";
import Home from "./Home/Home";
import SearchForm from "./Components/SearchForm";

const auth = new Auth();

const handleAuthentication = nextState => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

const makeMainRoutes = () => (
  <Router history={history} component={App}>
    <div>
      <Route path="/" render={props => <App auth={auth} {...props} />} />
      <Route path="/home" render={props => <Home auth={auth} {...props} />} />
      <Route path="/search" component={SearchForm} explicit />
      <Route
        path="/callback"
        render={props => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
      />
    </div>
  </Router>
);

export default makeMainRoutes;
