import React, { Component } from 'react';
import ModalImage from 'react-modal-image';
import {
  Button, Collapse, Tab, Label, Row, Grid, Col, Popover, OverlayTrigger, Tabs, Badge
} from 'react-bootstrap';
import Parser from 'html-react-parser';
import defaultpic from './default_pic2.png';
import EpisodeElement from './EpisodeElement';

import 'react-responsive-tabs/styles.css';


class SeriesElement extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  render() {
    const { series } = this.props;
    const { open } = this.state;
    const popoverSummary = (
      <Popover id="popover-summary" title="Summary">
        {series.summary ? <div>{Parser(series.summary)}</div> : <div></div>}
      </Popover>
    );
    return (

      <div className="series_list_element">
        <Grid fluid>
          <Row className="">
            <Col lg={3}>
              <ModalImage
                className="series_img"
                small={
                  series.image ? series.image : defaultpic
                }
                large={
                  series.image ? series.image : defaultpic
                }
                hideDownload
              />
            </Col>
            <Col lg={6}>
              <h1 className="series_name">{series.name}
                <Badge className="episode_count_badge">{this.props.watchedEpisodes.filter(watchedEpisode => (
                  watchedEpisode.seriesId === series.id)).length}
                </Badge>
              </h1>
              <h3>
                {series.networkName
                  ? series.networkName
                  : 'Unknown'}
              </h3>
            </Col >
            <OverlayTrigger trigger="click" placement="right" overlay={popoverSummary}>
              <Col md={2} lg={3}>
                <div className="followed_label_div">
                  <Label className="followed_label" bsStyle="success" >Followed</Label>
                </div>
              </Col>
            </OverlayTrigger>
          </Row>
          <Row >
            <div className="text-center">
              <Button className="SeriesCollapseButton" bsSize="large" onClick={() => this.setState({ open: !open })}>
                {open ? (
                  <i className="fas fa-caret-up" />
                ) : (
                    <i className="fas fa-caret-down" />
                  )}
              </Button>
            </div>
          </Row>
          <Row>
            {this.state.open ?
              <div>
                <Collapse in={open}>
                  <Tabs defaultActiveKey={1} id="series_tab">
                    {series.seasons.map(season => (
                      <Tab eventKey={season.number} title={`${season.number}.Season`}>
                        {season.episodes.length > 0 ?
                          <div>
                            {season.episodes.map(episode => (

                              <EpisodeElement
                                episode={episode}
                                isWatched={this.props.watchedEpisodes.filter(watchedEpisode => (
                                  watchedEpisode.seriesId === series.id
                                  && watchedEpisode.season === season.number
                                  && watchedEpisode.episode === episode.number
                                )).length}
                                rating={this.props.ratings.length
                                  ? this.props.ratings.filter(rating => (
                                    rating.season === season.number
                                    && rating.episode === episode.number
                                  ))
                                  : null}
                                handleWatched={this.props.handleWatched}
                                handleRating={this.props.handleRating}
                                season={season.number}
                                seriesId={series.id}
                                key={series.id}
                              />

                            ))}
                          </div>

                          : <div className="text-center">
                            <h2> No information is available yet</h2>
                          </div>
                        }
                      </Tab>
                    ))}
                  </Tabs>

                </Collapse>
              </div>
              :
              <div></div>}
          </Row>
        </Grid>
      </div >

    );
  }
}

export default SeriesElement;
