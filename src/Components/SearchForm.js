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
    };
    this.socket.emit('genres');
  }

  setupSocket() {
    this.socket.on('genres', (data) => {
      this.setState({ genres: data });
    });
    this.socket.on('series', (data) => {
      console.log(data)
      this.setState({ series: data });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleGenreChange = () => {
    const genre = this.genreInput.value ? this.genreInput.value : '';
    this.socket.emit('findByGenre', { genre })
  }

  handleTitleChange = () => {
    const title = this.titleInput.value ? this.titleInput.value : '';
    this.socket.emit('findByTitle', { title })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ControlLabel>Search</ControlLabel>
        <FormControl type="text" placeholder="Searh here" inputRef={ref => { this.titleInput = ref; }} onChange={this.handleTitleChange} />
        <FormControl componentClass="select" placeholder="Genre" inputRef={ref => { this.genreInput = ref; }} onChange={this.handleGenreChange} >
          {this.state.genres.map(genre => <option value={genre}>{genre}</option>)}
        </FormControl>
        {this.state.series.map(series => (
          <SeriesSearchElement series={series} />
        ))}
      </form>
    );
  }
}

export default SearchForm;
