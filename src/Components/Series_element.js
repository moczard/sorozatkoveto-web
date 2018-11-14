import React, { Component } from "react";
import ModalImage from "react-modal-image";
import StarRatingBar from "./Rating";
import { Button, Collapse, Well, Tab, Tabs } from "react-bootstrap";
import defaultpic from "./default_pic2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SeriesElement extends Component {
  state = {
    series: this.props.series,
    open: false
  };

  render() {
    console.log(this.state.series);
    return (
      <div className="series_list_element">
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
          alt={this.state.series.show.name}
        />
        <h1 className="series_name">{this.state.series.show.name}</h1>
        <h3>
          {this.state.series.show.network.name
            ? this.state.series.show.network.name
            : "Unknown"}
        </h3>
        <StarRatingBar name="series.name" />
        <div>
          <Button onClick={() => this.setState({ open: !this.state.open })}>
            {this.state.open ? (
              <i class="fas fa-caret-up" />
            ) : (
              <i class="fas fa-caret-down" />
            )}
          </Button>
          <Collapse in={this.state.open}>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="1. Season">
                <div>
                  <Well>{this.state.series.show.summary}</Well>
                </div>
              </Tab>
              <Tab eventKey={2} title="2. Season">
                <div>
                  <h1>{this.state.series.show.name}</h1>
                </div>
              </Tab>
              <Tab eventKey={3} title="3 Season">
                <div>
                  <h1>{this.state.series.show.type}</h1>
                </div>
              </Tab>
            </Tabs>
          </Collapse>
        </div>
      </div>
    );
  }
}

export default SeriesElement;
