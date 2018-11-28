import React, { Component } from 'react';
import SeriesElement from './SeriesElement';
import connect from '../Socket/socket';
import { Label } from 'react-bootstrap';

class SeriesList extends Component {
  constructor(props) {
    super(props);
    this.socket = connect();
    this.setupSocket();
    this.state = {
      series: [],
      userData: {},
      ratings: []
    };

    this.socket.emit('getByEmailHash', { emailHash: localStorage.getItem('emailHash') });
  }

  setupSocket() {
    this.socket.on('user', (data) => {
      this.setState({ userData: data[0] });
      this.socket.emit('findAllByIds', { ids: data[0].followedSeries });
      this.socket.emit('findAllBySeriesIds', { seriesIds: data[0].followedSeries });
    });

    this.socket.on('series', (data) => {
      this.setState({ series: data });
    });

    this.socket.on('ratings', (data) => {
      this.setState({ ratings: data });
    });

    this.socket.on('ratingsChange', () => {
      this.socket.emit('findAllBySeriesIds', { seriesIds: this.state.userData.followedSeries });
    });
  }

  handleWatched = (seriesId, season, episode) => {
    this.socket.emit('addToWatched', {
      emailHash: localStorage.getItem('emailHash'), seriesId, season, episode,
    });
  }

  handleRating = (seriesId, season, episode, rating) => {
    this.socket.emit('addRatingsForEpisode', {
      emailHash: localStorage.getItem('emailHash'), seriesId, season, episode, rating
    });
  }

  render() {
    const { series } = this.state;
    const { userData } = this.state;
    return (

      <div>
        <div className="series_list_title">
          <h1>My List <Label bsStyle="default">{series.length}</Label> </h1>
        </div>
        {series.length === 0 ?
          <div className="text-center">"
          <h2 className="no_series_text">You are folowing no series.<br /><br /> Navigate to <i className="fa fa-search"></i>Search to add some. </h2>
          </div> :
          <div>
            {series.map(oneSeries => (
              <SeriesElement
                series={oneSeries}
                watchedEpisodes={userData.watchedEpisodes}
                handleWatched={this.handleWatched}
                ratings={this.state.ratings.filter(rts => rts.seriesId === oneSeries.id)}
                handleRating={this.handleRating}
                key={userData._id}
              />
            ))}
          </div>


        }
      </div>
    );
  }
}

export default SeriesList;
