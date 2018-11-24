import React, { Component } from "react";
import { Button, FormControl, Checkbox, ControlLabel } from "react-bootstrap";

class SearchForm extends Component {
  state = {
    genreOptions: { 1: "Drama", 2: "Comedy", 3: "Thriller" }
  };

  handleSubmit(event) {

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ControlLabel>Search</ControlLabel>
        <FormControl type="text" placeholder="Searh here" />
        <Checkbox unchecked>Series only</Checkbox>
        <FormControl componentClass="select" placeholder="Genre">
          <option value="other">Genre</option>
          <option value="other">Drama</option>
          <option value="other">Comedy</option>
          <option value="other">.....</option>
        </FormControl>
        <Button bsStyle="primary">Submit</Button>
      </form>
    );
  }
}

export default SearchForm;
