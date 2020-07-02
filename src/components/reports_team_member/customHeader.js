import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, IconButton, CircularProgress
} from '@material-ui/core';
import ConfirmLogo from '../../assets/images/sellScreen/Confirm.png';
import CancelLogo from '../../assets/images/sellScreen/Cancel.png';

export const CustomHeader = ({
  selected,
  nonEmpty,
  isLoading,
  handleClose,
  handleUpdate
}) => (
  <Grid container className="pricing-popper__header-grid">
    <Grid item container xs={8} alignContent="center">
      <Typography variant="caption" className="pricing-popper__header-1">
        {`${selected.length} Product(s) selected`}
      </Typography>
    </Grid>
    {!isLoading ? (
      <Grid item xs={4} align="right">
        <IconButton
          aria-label="confirm"
          onClick={handleUpdate}
          disabled={!nonEmpty()}
          className="popper-btn"
        >
          <img src={ConfirmLogo} style={{ width: '1rem' }} alt="" />
        </IconButton>
        <IconButton
          aria-label="cancel"
          onClick={handleClose}
          className="popper-btn btn-close"
        >
          <img src={CancelLogo} style={{ width: '1rem' }} alt="" />
        </IconButton>
      </Grid>
    ) : (
      <Grid item xs={4} align="right" className="progress-wrapper">
        <CircularProgress
          disableShrink
          size={18}
          thickness={5}
          className="progress"
        />
      </Grid>
    )}
  </Grid>
);

CustomHeader.propTypes = {
  selected: PropTypes.arrayOf(String),
  nonEmpty: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
};

CustomHeader.defaultProps = {
  selected: [],
  isLoading: false
};

export default CustomHeader;
