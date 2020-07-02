import React, { useState } from 'react';
import {
  Popper, Paper, Fade, Grid, Typography, Divider, TextField,
  InputAdornment, Button, ClickAwayListener
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { popper as styles } from '../../assets/css/sellScreenStyles';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';
import { useStateValue } from '../../providers/stateProvider';


const OutOfStockPopper = ({ batchesForCart, handleBatchInputChange }) => {
  const [error, setError] = useState({ value: false, errorText: '' });
  const [
    { sell: { openOutOfStockPopper, outOfStockEl, outOfStockPopperParams } },
    dispatch
  ] = Object.values(useStateValue());
  const batchValue = () => {
    const foundBatch = batchesForCart.find(
      ({ batchId }) => batchId === outOfStockPopperParams.outOfstockBatch[0].id
    );
    return foundBatch ? foundBatch.quantity : 0;
  };

  const handleDiscountPopperClickAway = () => {
    const { outOfstockBatch } = outOfStockPopperParams;
    dispatch({
      type: sellActionTypes.TOGGLE_SELL_FROM_OUT_OF_STOCK,
      payload: {
        closePopper: true,
        batchesForCart: batchesForCart.filter(({ batchId }) => outOfstockBatch[0].id !== batchId)
      }
    });
  };

  const handleAddItems = () => {
    dispatch({
      type: sellActionTypes.TOGGLE_SELL_FROM_OUT_OF_STOCK,
      payload: {
        closePopper: true,
        batchesForCart,
      }
    });
  };

  const handleChange = ({ target: { value } }) => {
    const { outOfstockQuantity, outOfstockBatch } = outOfStockPopperParams;
    if (value >= 0 && value <= outOfstockQuantity) {
      handleBatchInputChange(Number(value), outOfstockBatch[0]);
      setError({ error: false, helperText: '' });
    } else {
      setError({ value: true, helperText: `Must be between 0 and ${outOfstockQuantity}` });
    }
  };

  return (
    <Popper
      open={openOutOfStockPopper}
      anchorEl={outOfStockEl}
      placement="bottom"
      transition
      modifiers={{
        offset: {
          enabled: true,
          offset: '0,0'
        }
      }}
      style={{
        zIndex: 9999
      }}
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={handleDiscountPopperClickAway}>
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={16}
              style={styles.paper}
            >
              <Grid container style={styles.gridWrapper}>
                <Grid item xs={12}>
                  <Typography variant="h6">
                    Out-of-stock Batch
                  </Typography>
                  <Divider />
                </Grid>
                <Grid container item xs={12} style={styles.innerWrapper}>
                  <Grid item xs={7}>
                    <TextField
                      id="outlined-name"
                      name="outOfStockQuantity"
                      label="Required Quantity"
                      style={styles.textField}
                      value={batchValue() || 0}
                      onChange={e => handleChange(e)}
                      type="number"
                      margin="normal"
                      variant="outlined"
                      error={error.value}
                      helperText={error.helperText}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">%</InputAdornment>,
                        inputProps: {
                          min: 1,
                          max: outOfStockPopperParams.outOfstockQuantity
                        }
                      }}
                    />
                  </Grid>
                  <Grid item container xs={5} justify="flex-end">
                    <Button
                      variant="contained"
                      color="primary"
                      style={styles.addButton}
                      onClick={handleAddItems}
                    >
                      <Typography display="inline" variant="h6">
                        ADD
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
                <Typography display="inline" variant="caption" style={styles.typo}>
                  The quantity must be reconciled later
                </Typography>
              </Grid>
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

OutOfStockPopper.propTypes = {
  batchesForCart: PropTypes.arrayOf(Object).isRequired,
  handleBatchInputChange: PropTypes.func.isRequired,
};


export default OutOfStockPopper;
