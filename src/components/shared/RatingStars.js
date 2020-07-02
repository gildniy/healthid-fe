import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from '@material-ui/icons/Star';
import { Grid } from '@material-ui/core';
import { supplyStyles } from '../../assets/styles/suppliers/suppliers';

const RatingStars = (props) => {
  const createStars = (stars, starClass) => {
    let allStars = stars;
    const starArray = [];

    for (let i = 0; i < 5; i += 1) {
      starArray.push((
        <StarIcon
          key={i}
          className={starClass}
          style={(allStars < 1) ? supplyStyles.emptyStar : supplyStyles.starStyle}
        />
      ));

      allStars -= 1;
    }

    return starArray;
  };

  const { rating, starClass } = props;
  return (
    <Grid item xs={12}>
      {createStars(rating, starClass)}
    </Grid>
  );
};

RatingStars.propTypes = {
  rating: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  starClass: PropTypes.string
};

RatingStars.defaultProps = {
  rating: '',
  starClass: ''
};

export default RatingStars;
