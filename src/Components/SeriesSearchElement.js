import React, { Component } from 'react';
import ModalImage from 'react-modal-image';
import {
  Button, Collapse, Tab, Tabs, Row, Grid, Col,
} from 'react-bootstrap';
import defaultpic from './default_pic2.png';
import EpisodeSearchElement from './EpisodeSearchElement';
import connect from '../Socket/socket';


class SeriesSearchElement extends Component {
  constructor(props) {
    super(props);
    this.socket = connect();
    this.setupSocket();
    this.state = {
      open: false,
    };
  }

  setupSocket() {
    this.socket.on('dbresponse', (data) => {
      // TODO ERROR handling
    });
  }

  handleFollow = () => {
    this.socket.emit('addToFollowed', { emailHash: localStorage.getItem('emailHash'), seriesId: this.props.series.id });
  }

  render() {
    return (
      <div className="series_list_element">
        <Grid fluid>
          <Row className="">
            <Col lg={3}>
              <ModalImage
                className="series_img"
                small={this.props.series.image ? this.props.series.image : defaultpic}
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
              {this.props.followedSeries.includes(this.props.series.id) ? 'Followed' : <Button bsStyle="success" onClick={this.handleFollow}>Follow</Button>}
            </Col>
          </Row>
          <Row>
            {this.props.series.summary}
          </Row>
          <Row className="">
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
                  {this.props.series.seasons.map(season => (
                    <Tab eventKey={season.number} title={`${season.number}.Season`}>
                      {season.episodes.map(episode => (
                        <div>
                          <EpisodeSearchElement episode={episode} />
                        </div>
                      ))}
                    </Tab>
                  ))}
                </Tabs>
              </Collapse>
            </div>
          </Row>
        </Grid>
      </div>
    );

  }
}

export default SeriesSearchElement;
