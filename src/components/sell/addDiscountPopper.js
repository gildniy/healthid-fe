import React, { useState } from 'react';
import {
  Popper, Paper, Fade, Grid, Typography, Divider, TextField,
  InputAdornment, Button, ClickAwayListener
} from '@material-ui/core';
import { popper as styles } from '../../assets/css/sellScreenStyles';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';
import { useStateValue } from '../../providers/stateProvider';

const AddDiscountPopper = () => {
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState({ value: false, errorText: '' });
  const [
    { sell: { openDiscountPopper, discountEl } },
    dispatch
  ] = Object.values(useStateValue());

  const handleDiscountButton = () => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        discount: Number(discount),
        openDiscountPopper: false
      }
    });
  };

  const handleDiscountPopperClickAway = () => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { openDiscountPopper: false }
    });
  };

  const handleChange = (e) => {
    if (e.target.value >= 0 && e.target.value <= 100) {
      setDiscount(e.target.value);
      setError({ error: false, helperText: '' });
    } else {
      setError({ value: true, helperText: 'Must be between 0 and 100' });
    }
  };

  return (
    <Popper
      open={openDiscountPopper}
      anchorEl={discountEl}
      placement="left-start"
      transition
      modifiers={{
        offset: {
          enabled: true,
          offset: '-90px, 62px',
        },
        flip: {
          enabled: true,
        },
        preventOverflow: {
          enabled: true,
          boundariesElement: 'scrollParent',
        }
      }}
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={handleDiscountPopperClickAway}>
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={2}
              style={styles.paper}
            >
              <Grid container style={styles.gridWrapper}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Add Discount
                  </Typography>
                  <Divider />
                </Grid>
                <Grid container item xs={12} style={styles.innerWrapper}>
                  <Grid item xs={7}>
                    <TextField
                      error={error.value}
                      id="outlined-name"
                      name="discountValue"
                      label="Add Percentage"
                      style={styles.textField}
                      value={discount}
                      onChange={e => handleChange(e)}
                      type="number"
                      margin="normal"
                      variant="outlined"
                      helperText={error.helperText}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        inputProps: {
                          min: 0,
                          max: 100
                        }
                      }}
                    />
                  </Grid>
                  <Grid item container xs={5} justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      style={styles.addButton}
                      onClick={handleDiscountButton}
                    >
                      <Typography display="inline" variant="h6">
                        ADD
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                <Typography display="inline" variant="caption" style={styles.typo}>
                  This discount is applied to the Total Sale
                </Typography>
              </Grid>
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default AddDiscountPopper;
