import React, { Component } from "react";
import { Navbar, Button, Grid, Row, Col } from "react-bootstrap";
import "./App.css";
import SeriesList from "./Components/SeriseList";
import MenuBAr from "./Components/Menu";
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";
import SearchForm from "./Components/SearchForm";

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <Navbar fluid class="">
          <Navbar.Header>
            <Button
              bsStyle="primary"
              className="btn-margin"
              onClick={this.goTo.bind(this, "home")}
            >
              Home
            </Button>
            {!isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
            )}
            {isAuthenticated() && (
              <Button
                bsStyle="primary"
                className="btn-margin"
                onClick={this.logout.bind(this)}
              >
                Log Out
              </Button>
            )}
          </Navbar.Header>
        </Navbar>

        <ScrollUpButton />
        <Grid fluid>
          <Row className="">
            <Col lg={3}>
              <MenuBAr />
            </Col>
            <Col lg={6}>
              <SeriesList />
            </Col>
            <Col lg={3} />
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
