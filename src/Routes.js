import React from 'react';
import { Route, Router } from 'react-router-dom';
import Callback from './Authentication/Callback';
import Auth from './Authentication/AuthenticationService';
import history from './Authentication/History';
import App from './App';

const auth = new Auth();

const handleAuthentication = (nextState) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export const logout = () => {
  auth.logout();
};

const makeMainRoutes = () => (
  <Router history={history} component={App}>
    <div>
      <Route
        path="/callback"
        render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
      />
      {auth.isAuthenticated()
        ? <Route path="/" component={props => <App logout={logout} {...props} />} />
        : auth.login()}
    </div>
  </Router>
);

export default makeMainRoutes;
