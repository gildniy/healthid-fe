import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { supplyStyles } from '../../../assets/styles/suppliers/suppliers';
import RatingStars from '../../shared/RatingStars';

const Rating = (props) => {
  const { rating, starClass } = props;
  return (
    <Fragment>
      <Grid item xs={12}>
        <Typography variant="p" align="left" style={supplyStyles.starLabel}>
          Rating
        </Typography>
      </Grid>
      <RatingStars rating={rating} starClass={starClass} />
    </Fragment>
  );
};

Rating.propTypes = {
  rating: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  starClass: PropTypes.string
};

Rating.defaultProps = {
  rating: '',
  starClass: ''
};

export default Rating;
