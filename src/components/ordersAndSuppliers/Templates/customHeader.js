import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, IconButton, CircularProgress
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ConfirmLogo from '../../../assets/images/sellScreen/Confirm.png';

export const CustomHeader = ({
  classes,
  header,
  someMissing,
  loading,
  handleUpdate,
  editable,
  editReceiveOrder
}) => (
  <Grid container justify="space-between" className={classes.headerContainer}>
    <Grid item container xs={8} alignContent="center">
      <Typography variant="h6" style={{ fontWeight: 500 }}>
        {header}
      </Typography>
    </Grid>
    {editable
      ? (
        !loading ? (
          <Grid item xs={4} align="right">
            <IconButton
              aria-label="confirm"
              onClick={handleUpdate}
              disabled={someMissing}
              className={classes.popperBtn}
            >
              <img src={ConfirmLogo} style={{ width: '1.3rem' }} alt="" />
            </IconButton>
          </Grid>
        ) : (
          <Grid item xs={4} align="right" className={classes.progressWrapper}>
            <CircularProgress
              disableShrink
              size={18}
              thickness={5}
              className={classes.progress}
            />
          </Grid>
        )
      ) : (
        <IconButton onClick={() => editReceiveOrder()}>
          <EditIcon />
        </IconButton>
      )}
  </Grid>
);

CustomHeader.propTypes = {
  classes: PropTypes.instanceOf(Object),
  header: PropTypes.string,
  someMissing: PropTypes.bool,
  loading: PropTypes.bool,
  editable: PropTypes.bool,
  handleUpdate: PropTypes.func.isRequired,
  editReceiveOrder: PropTypes.func.isRequired,
};

CustomHeader.defaultProps = {
  classes: {},
  header: '',
  someMissing: false,
  editable: true,
  loading: false
};

export default CustomHeader;
