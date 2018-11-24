import React, { Component } from 'react';
import testData from './proba_adat.json';
import SeriesElement from './SeriesElement';

class SeriesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      series: testData,
    };
  }

  render() {
    return (
      <div>
        {this.props.series.map(series => (
          <SeriesElement series={series} />
        ))}
      </div>
    );
  }
}

export default SeriesList;
