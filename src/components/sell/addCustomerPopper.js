import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Typography, Popper, Fade, ClickAwayListener,
  List,
} from '@material-ui/core';
import { AddCircle } from '@material-ui/icons';
import { addCustomerPopper as styles } from '../../assets/css/sellScreenStyles';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';
import { useStateValue } from '../../providers/stateProvider';

export const AddCustomerPopper = ({
  handleAddNewCustomer,
  renderSingleCustomer,
}) => {
  const [
    {
      sell: {
        openCustomerPopper, customerAnchorEl, placement,
        filteredCustomers, name
      }
    }, dispatch
  ] = Object.values(useStateValue());

  useEffect(() => {
    name <= 2 && dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        filteredCustomers: [],
        customerFetchError: false,
      }
    });
  }, [name]);

  const handleCustomerPopperClickAway = () => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        openCustomerPopper: false,
        name: ''
      }
    });
  };
  return (
    <Popper
      open={openCustomerPopper}
      anchorEl={customerAnchorEl}
      placement={placement || 'bottom'}
      transition
      modifiers={{
        offset: {
          enabled: true,
          offset: '-5px, 2px',
        }
      }}
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={handleCustomerPopperClickAway}>
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={2}
              style={styles.rootPaper}
            >
              {filteredCustomers.length ? (
                <Grid container>
                  <Grid item xs={12} style={styles.zeroBottomPadding}>
                    <List style={styles.listedCustomers}>
                      {filteredCustomers.map(customer => (
                        renderSingleCustomer(customer)
                      ))}
                    </List>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="subtitle2" style={styles.errorPadding}>
                  {` ${name} is not in our records.`}
                </Typography>
              )}
              <Grid container style={styles.typoWrapper}>
                <AddCircle style={styles.addCircleIcon} />
                <Typography
                  variant="subtitle2"
                  onClick={() => handleAddNewCustomer(name)}
                  style={styles.typo}
                >
                  {`Add ${name} as a new customer`}
                </Typography>
              </Grid>
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

AddCustomerPopper.propTypes = {
  state: PropTypes.instanceOf(Object),
  handleAddNewCustomer: PropTypes.func.isRequired,
  renderSingleCustomer: PropTypes.func.isRequired,
};

AddCustomerPopper.defaultProps = {
  state: {}
};

export default AddCustomerPopper;
