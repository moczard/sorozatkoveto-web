import React, { Component } from "react";
import testData from "./proba_adat.json";
import SeriesElement from "./Series_element";

class SeriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: testData
    };
  }
  render() {
    console.log(this.state.series);
    return (
      <div>
        {this.state.series.map(series => (
          <SeriesElement series={series} />
        ))}
      </div>
    );
  }
}

export default SeriesList;
