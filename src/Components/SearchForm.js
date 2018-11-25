import React, { Component } from 'react';
import {
  FormControl, ControlLabel,
} from 'react-bootstrap';
import connect from '../Socket/socket';
import SeriesSearchElement from '../Components/SeriesSearchElement';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.socket = connect();
    this.setupSocket();

    this.state = {
      genres: [],
      series: [],
      ratings: [],
      userData: {},
    };
    this.socket.emit('genres');
    this.socket.emit('getByEmailHash', { emailHash: localStorage.getItem('emailHash') });
  }

  setupSocket() {
    this.socket.on('genres', (data) => {
      this.setState({ genres: data });
    });
    this.socket.on('series', (data) => {
      this.setState({ series: data });
    });
    this.socket.on('user', (data) => {
      this.setState({ userData: data[0] });
    });
    this.socket.on('ratings', (data) => {
      this.setState({ ratings: data });
    });

    this.socket.on('ratingsChange', () => {
      this.socket.emit('findAllBySeriesIds', { seriesIds: this.state.userData.followedSeries });
    });
  }

  handleGenreChange = () => {
    const genre = this.genreInput.value ? this.genreInput.value : '';
    this.socket.emit('findByGenre', { genre })
  }

  handleTitleChange = () => {
    const title = this.titleInput.value ? this.titleInput.value : '';
    this.socket.emit('findByTitle', { title })
  }

  handleRating = (seriesId, season, episode, rating) => {
    this.socket.emit('addRatingsForEpisode', {
      emailHash: localStorage.getItem('emailHash'), seriesId, season, episode, rating
    });
  }

  render() {
    return (
      <form >
        <h1>Search</h1>
        <FormControl type="text" placeholder="Searh here" inputRef={ref => { this.titleInput = ref; }} onChange={this.handleTitleChange} />
        <h3>Genres</h3>
        <div className="genre_select_div">
          <FormControl classname="genre_select" componentClass="select" placeholder="Genre" inputRef={ref => { this.genreInput = ref; }} onChange={this.handleGenreChange} >
            {this.state.genres.map(genre => <option key={genre} value={genre}>{genre}</option>)}
          </FormControl>
        </div >
        {
          this.state.series.map(series => (
            <SeriesSearchElement
              key={series.id}
              series={series}
              followedSeries={this.state.userData.followedSeries}
              ratings={this.state.ratings.filter(rts => rts.seriesId === series.id)}
            />
          ))
        }
      </form >
    );
  }
}

export default SearchForm;
