import React, { Component } from 'react';
import {
    Button, Grid, Col, Row,
} from 'react-bootstrap';
import ModalImage from 'react-modal-image';
import StarRatingBar from './Rating';
import defaultpic from './default_pic2.png';
import connect from '../Socket/socket';
class EpisodeElement extends Component {

    constructor() {
        super();
        this.socket = connect();

        this.state = {
            isWatched: false

        };
    }



    WatchEpisode = () => {
        /*Adding socket */
        if (this.state.isWatched) {
            return;
        }
        this.setState({ isWatched: true });
    }


    render() {
        return (
            <div>
                <Grid>
                    <Col>

                        <ModalImage
                            className="series_img"
                            small={
                                this.props.image ? this.props.image : defaultpic
                            }
                            hideDownload
                        />
                    </Col>
                    <Col>
                        <h2>
                            {this.props.name}
                        </h2>
                        <h4>
                            Runtime:
                      {this.props.runtime}
                        </h4>
                        <h4>{this.props.number}</h4>

                        <StarRatingBar />
                    </Col>
                    <Col>
                        <Button
                            onClick={this.WatchEpisode}
                            disabled={this.state.isWatched}
                        >

                            {this.state.isWatched ? (
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
