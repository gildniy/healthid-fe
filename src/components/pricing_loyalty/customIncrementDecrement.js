import React from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton } from '@material-ui/core';
import increase from '../../assets/images/pricing/increase.png';
import decrease from '../../assets/images/pricing/decrease.png';

export const CustomIncrementDecrement = ({
  handleBtnChange,
}) => (
  <Grid
    item
    container
    justify="space-evenly"
    direction="column"
    className="pricing-popper__icons-wrapper"
  >
    <IconButton
      className="pricing-popper__icon-btn"
      aria-owns="menu-list-grow"
      aria-haspopup="true"
      disableRipple
      onClick={() => handleBtnChange('add')}
    >
      <img src={increase} style={{ width: '5px' }} alt="increase" />
    </IconButton>
    <IconButton
      className="pricing-popper__icon-btn"
      aria-owns="menu-list-grow"
      aria-haspopup="true"
      disableRipple
      onClick={() => handleBtnChange('remove')}
    >
      <img src={decrease} style={{ width: '5px' }} alt="decrease" />
    </IconButton>
  </Grid>
);

CustomIncrementDecrement.propTypes = {
  handleBtnChange: PropTypes.func.isRequired,
};

export default CustomIncrementDecrement;
