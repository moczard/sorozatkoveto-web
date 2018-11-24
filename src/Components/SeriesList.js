import React, { Component } from 'react';
import testData from './proba_adat.json';
import SeriesElement from './SeriesElement';
import connect from '../Socket/socket';


class SeriesList extends Component {
  constructor(props) {
    super(props);
    this.socket = connect();
    this.setupSocket();
    this.state = {
      series: [],
    };
  }

  setupSocket() {
    this.socket.on('series', (data) => {
      this.setState({ series: data });
    });
  }

  render() {
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
