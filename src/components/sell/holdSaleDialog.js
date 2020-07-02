import React, { useState } from 'react';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogTitle, Slide, TextField, Grid, Typography
} from '@material-ui/core';
import { addCustomerDialog as styles } from '../../assets/css/sellScreenStyles';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';

import { useStateValue } from '../../providers/stateProvider';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const HoldSaleDialog = () => {
  const [note, setNote] = useState('');
  const [{
    sell: { cart, openHoldSaleDialog }
  }, dispatch] = Object.values(useStateValue());

  const handleDialogClose = () => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { openHoldSaleDialog: false }
    });
    setNote('');
  };

  const handleAddHeldSaleButton = () => {
    const heldSale = { note, cart };
    dispatch({
      type: sellActionTypes.HOLD_SALE,
      payload: heldSale
    });
    handleDialogClose();
  };

  return (
    <Dialog
      open={openHoldSaleDialog}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      onClose={handleDialogClose}
      aria-labelledby="add-customer-dialog"
      id="add-customer-dialog"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={styles.dialogTitle}
      >
      Add a note
      </DialogTitle>
      <DialogContent style={styles.dialogContentGrid}>
        <Grid
          container
          spacing={2}
          style={styles.holdSaleGridTop}
        >
          <Grid item xs={12}>
            <Typography variant="subtitle1">
            You are about to hold this sale.
            This note will be a quick identifier when you decide to continue with it.
            </Typography>
          </Grid>
          <Grid item xs={12} style={styles.dialogContentGrid}>
            <TextField
              id="holdnote"
              name="holdSaleNote"
              margin="normal"
              variant="outlined"
              autoFocus
              multiline
              rows="2"
              fullWidth
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid
          item
          xs={12}
          align="right"
          style={styles.holdSaleGridRight}
        >
          <Button
            key="cancel-button"
            variant="contained"
            style={styles.cancelButton}
            color="secondary"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button
            key="hold-button"
            variant="contained"
            color="primary"
            style={styles.addButton}
            onClick={handleAddHeldSaleButton}
          >
            Hold Sale
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default HoldSaleDialog;
