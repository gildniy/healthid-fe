import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import {
  Button, Grid, Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import localForage from 'localforage';
import { RenderPopper } from '../../stock_control/utils/utils';
import { offlineStyles } from '../../../assets/styles/navbar/lowerNavbarStyles';
import RenderCheckBox from './renderCheckbox';
import { unregister } from '../../../registerServiceWorker';
import notify from '../Toaster';

const OfflineStoragePopper = ({
  classes, offlineEl, client,
  handleOfflineClick
}) => {
  const initialState = {
    assets: true,
    pendingRequests: true,
    appData: false,
  };
  const [state, setState] = useState(initialState);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClearStorage = () => {
    try {
      state.assets && unregister();
      state.pendingRequests
        && window.localStorage.removeItem('MUTATIONS')
        && sessionStorage.clear();
      state.appData
        && localForage.clear()
        && client.clearStore();
      window.location.reload();
    } catch (err) {
      notify(err.message);
    }
  };

  const noChoice = () => {
    const { assets, pendingRequests, appData } = state;
    if (assets || pendingRequests || appData) {
      return true;
    }
    return false;
  };

  const open = Boolean(offlineEl);

  return (
    <RenderPopper
      open={open}
      anchorEl={offlineEl}
      onClickAway={() => handleOfflineClick()}
      modifiers={{
        offset: {
          enabled: true,
          offset: '0, 1vh',
        }
      }}
    >
      <Grid container className={classes.GridWrapper}>
        <Grid item xs={12} className={classes.headerWrapper}>
          <Typography variant="h5" style={{ color: '#4D4F5C' }}>
            Browser Storage
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.buttonSection}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={handleClearStorage}
          >
            <Typography variant="subtitle1" className={classes.buttonTypo}>
              {noChoice() ? 'clear site data' : 'Refresh Page'}
            </Typography>
          </Button>
        </Grid>
        <Grid item container xs={12} className={classes.optionsSection}>
          <RenderCheckBox
            checked={state.assets}
            name="assets"
            classes={classes}
            handleChange={handleChange}
            label1="Refresh assets"
            label2=" - app would refresh automatically"
          />
          <Typography variant="caption" className={classes.labelTinyOption}>
            Unregister service workers
          </Typography>
          <RenderCheckBox
            checked={state.pendingRequests}
            name="pendingRequests"
            classes={classes}
            handleChange={handleChange}
            label1="Clear pending requests"
            label2=" - app would refresh automatically"
          />
          <Typography variant="caption" className={classes.labelTinyOption}>
            Local and session storage (mutations)
          </Typography>
          <RenderCheckBox
            checked={state.appData}
            name="appData"
            classes={classes}
            handleChange={handleChange}
            label1="Clear data on the app"
            label2=" - app would reload data, may take a while"
          />
          <Typography variant="caption" className={classes.labelTinyOption}>
            IndexDB
          </Typography>
        </Grid>
      </Grid>
    </RenderPopper>
  );
};

OfflineStoragePopper.propTypes = {
  classes: PropTypes.instanceOf(Object),
  client: PropTypes.instanceOf(Object),
  offlineEl: PropTypes.instanceOf(Object),
  handleOfflineClick: PropTypes.func.isRequired
};

OfflineStoragePopper.defaultProps = {
  classes: {},
  client: {},
  offlineEl: {},
};

export default withStyles(offlineStyles)(withApollo(OfflineStoragePopper));
