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
        <Navbar fluid >
          <DropdownButton id="LogoutDropdown" className="LogoutDropdown" title={<i className="fas fa-user-circle" />} noCaret bsSize="large" key={1}>
            <MenuItem
              eventKey="1"
              onClick={this.props.logout}
            >
              Logout
            </MenuItem>

          </DropdownButton>
        </Navbar>
        <ScrollUpButton />
        <Grid fluid>
          <Col className="MenuCol" sm={2} md={3} lg={3}>
            <MenuBar />
          </Col>
          <Col sm={8} lg={6}>
            <Switch>
              <Route path="/home" component={SeriesList} explicit />
              <Route path="/search" component={SearchForm} explicit />
              <Route path="/about" component={AboutModal} explicit />
            </Switch>
          </Col>
          <Col sm={2} md={3} lg={3} />
        </Grid>

      </div>
    );
  }
}

export default App;
