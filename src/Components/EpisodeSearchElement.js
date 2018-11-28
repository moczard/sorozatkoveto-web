import React, { Component } from 'react';
import {
    Grid, Col, Row, Panel, Button
} from 'react-bootstrap';
import Parser from 'html-react-parser';
import ModalImage from 'react-modal-image';
import defaultpic from './default_pic2.png';



class EpisodeSearchElement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isWatched: false,
            open: false
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
                <Grid fluid>
                    <Row>
                        <Col lg={3}>
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
                        <Col lg={7}>
                            <h2>{this.props.episode.name}</h2>
                            <h4>
                                Runtime:
                      {this.props.episode.runtime}
                            </h4>
                            <h4>Episode: {this.props.episode.number}</h4>
                            <h4>Rating: {this.props.rating && this.props.rating.length
                                ? this.props.rating[0].sum / this.props.rating[0].count : null}
                            </h4>


                        </Col>
                    </Row>

                    <Row className="summary_row">
                        <Button className="" onClick={() => this.setState({ open: !this.state.open })}>
                            Summary
                             {this.state.open ? (
                                <i className="fas fa-caret-up" />
                            ) : (
                                    <i className="fas fa-caret-down" />
                                )}
                        </Button>
                        <Panel className="summary_collapse_panel" expanded={this.state.open} >
                            <Panel.Collapse>
                                <Panel.Body>
                                    {this.props.episode.summary ? <div>{Parser(this.props.episode.summary)}</div> : <div>Not available</div>}
                                </Panel.Body>
                            </Panel.Collapse>
                        </Panel>


                    </Row>
                </Grid>
                <hr></hr>
            </div>

        );

    }
}

export default EpisodeSearchElement;
