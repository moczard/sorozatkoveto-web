import React, { Component } from 'react';
import {
    Button, Grid, Col, Row,
} from 'react-bootstrap';
import ModalImage from 'react-modal-image';
import StarRatingBar from './Rating';
import defaultpic from './default_pic2.png';
import connect from '../Socket/socket';

class EpisodeSearchElement extends Component {

    constructor(props) {
        super(props);
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
                    <Row>
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
                            <h2>{this.props.name}</h2>
                            <h4>
                                Runtime:
                      {this.props.runtime}
                            </h4>
                            <h4>{this.props.number}</h4>


                        </Col>
                    </Row>

                    <Row>
                        <div>{this.props.summary}</div>
                    </Row>
                </Grid>
            </div>

        );

    }
}

export default EpisodeSearchElement;
