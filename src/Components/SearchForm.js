import React, { Component } from 'react';
import {
  Button, FormControl, Checkbox, ControlLabel,
} from 'react-bootstrap';
import connect from '../Socket/socket';
import SeriesList from '../Components/SeriesList';

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
    this.socket.emit('findByTitle');
    this.myInput = '';
  }

  setupSocket() {
    this.socket.on('genres', (data) => {
      this.setState({ genres: data });
    });
    this.socket.on('series', (data) => {
      this.setState({ series: data });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleGenreChange() {
    console.log(this.inputEl)
  }

  handleTitleChange = () => {
    this.socket.emit('findByTitle', { title: this.myInput.value })
    console.log(this.state.series)
    console.log(this.myInput.value)

  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ControlLabel>Search</ControlLabel>
        <FormControl type="text" placeholder="Searh here" inputRef={ref => { this.myInput = ref; }} onChange={this.handleTitleChange} />
        <Checkbox unchecked>Series only</Checkbox>
        <FormControl componentClass="select" placeholder="Genre" inputRef={el => this.inputEl = el} onChange={this.handleGenreChange} >
          {this.state.genres.map(genre => <option value={genre}>{genre}</option>)}
        </FormControl>
        <Button bsStyle="primary">Submit</Button>
        <SeriesList series={this.state.series}></SeriesList>
      </form>
    );
  }
}

export default SearchForm;
