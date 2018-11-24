import React, { Component } from 'react';
import StarRatingBar from "./Rating";

class EpisodeElement extends Component {
    state = {
        series: this.props.episodes,
        isWatched: false,

    };


    WatchEpisode() {
        this.setState({
            iswatched: true;
        });
    }


    render() {
        return (
            <div className="EpisodeElement">
                <Grid>
                    <Col>
                        <ModalImage
                            className="series_img"
                            small={
                                this.state.series.show.image
                                    ? this.state.series.show.image.medium
                                    : { defaultpic }
                            }
                            large={
                                this.state.series.show.image
                                    ? this.state.series.show.image.original
                                    : "Sorry"
                            }
                            hideDownload={true}
                        />
                    </Col>
                    <Col>
                        <h4>name</h4>
                        <h4>Rating</h4>
                        <h4>runtime </h4>
                    </Col>
                    <Col>
                        <Button
                            disabled={this.state.isWatched}>
                            <i class={isWacthed ? "fas fa-eye" : "fas fa-eyes-slash"} />
                        </Button>
                    </Col>
                </Grid>
            </div>
        );
    }
}

export default EpisodeElement;