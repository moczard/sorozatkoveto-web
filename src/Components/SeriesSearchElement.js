import React, { Component } from 'react';
import ModalImage from 'react-modal-image';
import {
  Button, Collapse, Tab, Tabs, Row, Grid, Col, Label
} from 'react-bootstrap';
import Parser from 'html-react-parser';
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
              <h3>
                {this.props.rating && this.props.rating.length
                  ? this.props.rating[0].sum / this.props.rating[0].count : null}
              </h3>
            </Col>
            <Col lg={3}>
              <div className="followed_label_div">
                {this.props.followedSeries.includes(this.props.series.id) ? <Label className="followed_label" bsStyle="success" >Followed</Label> : <Button bsStyle="success" onClick={this.handleFollow}>Follow</Button>}
              </div>
            </Col>

          </Row>
          <hr></hr>
          <Row >
            <div className="series_summary_div">
              {this.props.series.summary ? <div>{Parser(this.props.series.summary)}</div> : <div></div>}
            </div>
          </Row>
          <Row className="">
            <div className="text-center">
              <Button className="SeriesCollapseButton" onClick={() => this.setState({ open: !this.state.open })}>
                {this.state.open ? (
                  <i className="fas fa-caret-up" />
                ) : (
                    <i className="fas fa-caret-down" />
                  )}
              </Button>
            </div>
            {this.state.open ?
              <div>
                <Collapse in={this.state.open}>
                  <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                    {this.props.series.seasons.map(season => (
                      <Tab eventKey={season.number} title={`${season.number}.Season`}>
                        {season.episodes.map(episode => (
                          <div>
                            <EpisodeSearchElement key={episode.id} episode={episode} />
                          </div>
                        ))}
                      </Tab>
                    ))}
                  </Tabs>
                </Collapse>
              </div>
              :
              <div></div>}
          </Row>
        </Grid>
      </div>

    );

  }
}

export default SeriesSearchElement;
