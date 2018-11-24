import React, { Component } from 'react';
import {
  Navbar, DropdownButton, MenuItem, Grid, Col,
} from 'react-bootstrap';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button';
import SearchForm from './Components/SearchForm';
import AboutModal from './Components/AboutModal';
import MenuBar from './Components/Menu';
import SeriesList from './Components/SeriesList';
import { logout } from './Routes';


class App extends Component {
  constructor() {
    super();


  }


  render() {
    return (
      <div>
        <Navbar fluid class="">
          <DropdownButton title={<i className="fas fa-user-circle" />} noCaret bsSize="large">
            <MenuItem
              eventKey="1"

            >
              <a href="https://szoftarch.eu.auth0.com/v2/logout" onClick={logout}>Logout</a>
            </MenuItem>

          </DropdownButton>
        </Navbar>
        <ScrollUpButton />
        <Grid fluid>
          <Col classname="MenuCol" lg={3}>
            <MenuBar />
          </Col>
          <Col lg={6}>
            <Switch>
              <Route path="/home" component={SeriesList} explicit />
              <Route path="/search" component={SearchForm} explicit />
              <Route path="/about" component={AboutModal} explicit />
            </Switch>
          </Col>
          <Col lg={3} />
        </Grid>

      </div>
    );
  }
}

export default App;
