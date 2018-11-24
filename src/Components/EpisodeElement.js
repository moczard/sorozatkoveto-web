import React, { Component } from 'react';
import {
  Button, Grid, Col,
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
      <div>
        <Grid>
          <Col>
            <ModalImage
              className="series_img"
              small={
                  this.props.episode.image ? this.props.episode.image : defaultpic
                }
              hideDownload
            />
          </Col>
          <Col>
            <h2>
              {this.props.episode.name}
            </h2>
            <h4>
                            Runtime:
              {this.props.episode.runtime}
            </h4>
            <h4>{this.props.episode.number}</h4>

            <StarRatingBar
                rating={this.props.rating && this.props.rating.length 
                    ? this.props.rating[0].sum / this.props.rating[0].count : null}
                changeRating={this.rateEpisode}
            />
          </Col>
          <Col>
            <Button
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
        </Grid>
      </div>

    );
  }
}

export default EpisodeElement;
