import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, IconButton, Tooltip
} from '@material-ui/core';
import ConfirmLogo from '../../../assets/images/sellScreen/Confirm.png';
import CancelLogo from '../../../assets/images/sellScreen/Cancel.png';
import { saleDetailsDialog as styles } from '../../../assets/css/sellScreenStyles';
import returnStyles from '../../../assets/styles/returns';

export const ProcessReturnHeader = ({
  batchesForReturn,
  handleClickToReturn,
  handleReturnDialogClose,
  dateSold,
  timeSold
}) => (
  <Fragment>
    <Grid container>
      <Grid item container xs={8} direction="column">
        <Typography variant="h5" style={{ ...returnStyles.name, ...returnStyles.avenirMedium }}>
          Select items to return
        </Typography>
        <Grid item container direction="row">
          <Typography variant="caption" style={styles.captionTextProdType}>
            {`${dateSold} at ${timeSold}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={4} align="right">
        <Tooltip
          title="Add to return cart"
        >
          <span>
            <IconButton
              aria-label="Edit"
              onClick={handleClickToReturn}
              disabled={!batchesForReturn.size}
              style={styles.icon}
            >
              <img src={ConfirmLogo} style={{ width: '20px' }} alt="" />
            </IconButton>
          </span>
        </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Tooltip
          title="Close"
        >
          <span>
            <IconButton
              aria-label="Edit"
              onClick={() => handleReturnDialogClose()}
              style={styles.icon}
            >
              <img src={CancelLogo} style={{ width: '20px' }} alt="" />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
    </Grid>
  </Fragment>
);

ProcessReturnHeader.propTypes = {
  handleReturnDialogClose: PropTypes.func.isRequired,
  handleClickToReturn: PropTypes.func.isRequired,
  batchesForReturn: PropTypes.arrayOf(Object).isRequired,
  timeSold: PropTypes.string.isRequired,
  dateSold: PropTypes.string.isRequired,
};

ProcessReturnHeader.defaultProps = {
};

export default ProcessReturnHeader;
