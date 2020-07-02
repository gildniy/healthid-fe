import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, IconButton, CircularProgress
} from '@material-ui/core';
import ConfirmLogo from '../../assets/images/sellScreen/Confirm.png';
import CancelLogo from '../../assets/images/sellScreen/Cancel.png';

export const ProposeEditHeader = ({
  data,
  nonEmpty,
  isLoading,
  handleDialogClose,
  handleBatchUpdate
}) => (
  <Grid container>
    <Grid item container xs={8} direction="column">
      <Typography variant="h5" className="title">{data.name}</Typography>
      <Typography variant="subtitle1" className="subtitle">
          Specify batch to edit quantity
      </Typography>
    </Grid>
    {!isLoading ? (
      <Grid item xs={4} align="right">
        <IconButton
          aria-label="confirm"
          onClick={handleBatchUpdate}
          disabled={!nonEmpty}
          className="icon-button"
        >
          <img src={ConfirmLogo} style={{ width: '2rem' }} alt="" />
        </IconButton>
        <IconButton
          aria-label="cancel"
          onClick={handleDialogClose}
          className="icon-button close"
        >
          <img src={CancelLogo} style={{ width: '2rem' }} alt="" />
        </IconButton>
      </Grid>
    ) : (
      <Grid item xs={4} align="right">
        <CircularProgress
          disableShrink
          size={30}
          thickness={4.5}
          className="progress"
        />
      </Grid>
    )}
  </Grid>
);

ProposeEditHeader.propTypes = {
  data: PropTypes.instanceOf(Object),
  nonEmpty: PropTypes.bool,
  isLoading: PropTypes.bool,
  handleDialogClose: PropTypes.func.isRequired,
  handleBatchUpdate: PropTypes.func.isRequired,
};

ProposeEditHeader.defaultProps = {
  data: {},
  nonEmpty: false,
  isLoading: false
};

export default ProposeEditHeader;
