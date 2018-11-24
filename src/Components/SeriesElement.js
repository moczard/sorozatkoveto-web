import React, { Component } from 'react';
import ModalImage from 'react-modal-image';
import {
  Button, Collapse, Tab, Tabs, Label, Row, Grid, Col,
} from 'react-bootstrap';
import defaultpic from './default_pic2.png';
import EpisodeElement from './EpisodeElement';

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
                hideDownload
              />
            </Col>
            <Col lg={6}>
              <h1 className="series_name">{series.name}</h1>
              <h3>
                {series.networkName
                  ? series.networkName
                  : 'Unknown'}
              </h3>
            </Col>
            <Col lg={3}>
              <Label bsStyle="success">Followed</Label>
            </Col>
          </Row>
          <Row className="">
            <div>
              <Button className="SeriesCollapseButton" onClick={() => this.setState({ open: !open })}>
                {open ? (
                  <i className="fas fa-caret-up" />
                ) : (
                  <i className="fas fa-caret-down" />
                )}
              </Button>
              <Collapse in={open}>
                <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                  {series.seasons.map(season => (
                    <Tab eventKey={season.number} title={`${season.number}.Season`}>

                      {season.episodes.map(episode => (
                        <div>
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
                          />
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

export default SeriesElement;
