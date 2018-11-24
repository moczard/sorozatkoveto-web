import React, { Component } from 'react';
import ModalImage from 'react-modal-image';
import {
  Button, Collapse, Well, Tab, Tabs, Label, Row, Grid, Col,
} from 'react-bootstrap';
import StarRatingBar from './Rating';
import defaultpic from './default_pic2.png';


class SeriesElement extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div className="series_list_element">
        <Grid fluid>
          <Row className="">
            <Col lg={3}>
              <ModalImage
                className="series_img"
                small={
                  this.props.series.image ? this.props.series.image : defaultpic
                }
                hideDownload
              />
            </Col>
            <Col lg={6}>
              <h1 className="series_name">{this.props.series.name}</h1>
              <h3>
                {this.props.series.networkName
                  ? this.props.series.networkName
                  : 'Unknown'}
              </h3>
            </Col>
            <Col lg={3}>
              <Label bsStyle="success">Followed</Label>
            </Col>
          </Row>
          <Row className="">
            <StarRatingBar name="series.name" />
            <div>
              <Button className="SeriesCollapseButton" onClick={() => this.setState({ open: !this.state.open })}>
                {this.state.open ? (
                  <i className="fas fa-caret-up" />
                ) : (
                  <i className="fas fa-caret-down" />
                )}
              </Button>
              <Collapse in={this.state.open}>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                  <Tab eventKey={1} title="1. Season">
                    <div>
                      <Well>{this.props.series.summary}</Well>
                    </div>
                  </Tab>
                  <Tab eventKey={2} title="2. Season">
                    <div>
                      <h1>{this.props.series.name}</h1>
                    </div>
                  </Tab>
                </Tabs>
              </Collapse>
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default SeriesElement;
