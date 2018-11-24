import React, { Component } from 'react';
import {
  Navbar, DropdownButton, MenuItem, Grid, Col,
} from 'react-bootstrap';
import './App.css';
import jwt from 'jsonwebtoken';
import md5 from 'md5';
import { Route, Switch } from 'react-router-dom';
import { CircleArrow as ScrollUpButton } from 'react-scroll-up-button';
import { publicKey, autOptions } from './Authentication/AuthenticationConfig';
import connect from './Socket/socket';
import SearchForm from './Components/SearchForm';
import AboutModal from './Components/AboutModal';
import MenuBar from './Components/Menu';
import SeriesList from './Components/SeriesList';


class App extends Component {
  constructor(props) {
    super(props);
    this.socket = connect();
  }

  async componentDidMount() {
    try {
      const auth = await jwt.verify(localStorage.getItem('id_token'), publicKey, autOptions);
      const emailHash = md5(auth['http://szoftarch/email']);
      localStorage.setItem('emailHash', emailHash);
      this.socket.emit('addUser', { emailHash });
    } catch (err) {
      // TODO
    }
  }


  render() {
    return (
      <div>
        <Navbar fluid class="">
          <DropdownButton title={<i className="fas fa-user-circle" />} noCaret bsSize="large">
            <MenuItem
              eventKey="1"
            >
              <a href="https://szoftarch.eu.auth0.com/v2/logout" onClick={this.props.logout}>Logout</a>
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
