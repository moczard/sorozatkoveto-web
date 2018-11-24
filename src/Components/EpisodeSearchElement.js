import React, { Component } from 'react';
import {
    Grid, Col, Row,
} from 'react-bootstrap';
import ModalImage from 'react-modal-image';
import defaultpic from './default_pic2.png';


class EpisodeSearchElement extends Component {

    constructor(props) {
        super(props);
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
                                    this.props.episode.image ? this.props.episode.image : defaultpic
                                }
                                hideDownload
                            />
                        </Col>
                        <Col>
                            <h2>{this.props.episode.name}</h2>
                            <h4>
                                Runtime:
                      {this.props.episode.runtime}
                            </h4>
                            <h4>{this.props.episode.number}</h4>


                        </Col>
                    </Row>

                    <Row>
                        <div>{this.props.episode.summary}</div>
                    </Row>
                </Grid>
            </div>

        );

    }
}

export default EpisodeSearchElement;
