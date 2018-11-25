import React, { Component } from 'react';
import {
  Button, Grid, Col, Row
} from 'react-bootstrap';
import ModalImage from 'react-modal-image';
import StarRatingBar from './Rating';
import defaultpic from './default_pic2.png';


class EpisodeElement extends Component {
  watchEpisode = () => {
    this.props.handleWatched(this.props.seriesId, this.props.season, this.props.episode.number);
  }

  rateEpisode = (rating) => {
    this.props.handleRating(this.props.seriesId, this.props.season, this.props.episode.number, rating);
  }

  render() {
    return (
      <div className="episode-list-element">
        <Grid fluid>
          <Row>
            <Col md={4} lg={4}>
              <ModalImage
                className="series_img"
                small={
                  this.props.episode.image ? this.props.episode.image : defaultpic
                }
                large={
                  this.props.episode.image ? this.props.episode.image : defaultpic
                }
                hideDownload
              />
            </Col>
            <Col lg={6}>
              <h3>
                {this.props.episode.name}
              </h3>
              <h4>
                Runtime:
             <b> {this.props.episode.runtime}</b>
              </h4>
              <h4>Episode: {this.props.episode.number}</h4>

              <StarRatingBar
                rating={this.props.rating && this.props.rating.length
                  ? this.props.rating[0].sum / this.props.rating[0].count : null}
                changeRating={this.rateEpisode}
              />
            </Col>
            <Col md={2} lg={2}>
              <Button
                className="watched_button"
                onClick={this.watchEpisode}
                disabled={this.props.isWatched}
              >
                {this.props.isWatched ? (
                  <i className="fas fa-eye" />
                ) : (
                    <i className="fas fa-eye-slash" />
                  )}
              </Button>
            </Col>
          </Row>
          <Row>
            <hr></hr>
          </Row>

        </Grid>
      </div >

    );
  }
}

export default EpisodeElement;
