import React, { Component } from "react";
import StarRatings from "react-star-ratings";

class StarRatingBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* TODO: Implement rating change */
      rating: 0,
      name: this.props.name
    };
  }

  changeRating(newRating) {
    this.setState({
      rating: newRating
    });
  }
  render() {
    return (
      <StarRatings
        rating={this.state.rating}
        starRatedColor="yellow"
        starHoverColor="yellow"
        changeRating={this.changeRating}
        numberOfStars={5}
        name={this.state.name}
      />
    );
  }
}

export default StarRatingBar;
