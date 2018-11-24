import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';

class StarRatingBar extends Component {
  render() {
    return (
      <StarRatings
        rating={this.props.rating ? this.props.rating : 0}
        starRatedColor="yellow"
        starHoverColor="yellow"
        changeRating={this.props.changeRating}
        numberOfStars={5}
      />
    );
  }
}

export default StarRatingBar;
