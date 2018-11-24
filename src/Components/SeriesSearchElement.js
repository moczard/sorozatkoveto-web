import React, { Component } from 'react';
import ModalImage from 'react-modal-image';

import {
    Button, Collapse, Tab, Tabs, Row, Grid, Col,
} from 'react-bootstrap';

import defaultpic from './default_pic2.png';
import EpisodeSearchElement from './EpisodeSearchElement';

class SeriesSearchElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }
    render() {
        return (
            <div className="series_list_element">
                <Grid fluid>
                    <Row className="">
                        <Col lg={3}>
                            <ModalImage
                                className="series_img"
                                small={
                                    this.props.series.image ? this.props.series.image : defaultpic
                                }
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
                            <Button bsStyle="success">Follow</Button>
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
                                    {this.props.series.seasons.map(seasons => (
                                        <Tab eventKey={seasons.number} title={`${seasons.number}.Season`}>

                                            {seasons.episodes.map(episodes => (
                                                <div>

                                                    <EpisodeSearchElement episode={episodes} />
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