import React, { useState } from 'react';
import {
  Popper, Paper, Fade, Grid, Typography, Divider, TextField,
  Button, ClickAwayListener
} from '@material-ui/core';
import notify from '../shared/Toaster';
import { popper as styles } from '../../assets/css/sellScreenStyles';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';
import { useStateValue } from '../../providers/stateProvider';

const AddProductNotePopper = () => {
  const [note, setNote] = useState('');
  const [
    { sell: { openNotePopper, cartItemNoteEl, clickedCartItem } },
    dispatch
  ] = Object.values(useStateValue());

  const handleClickAway = () => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { openNotePopper: false }
    });
  };

  const handleBackButton = () => {
    setNote('');
    handleClickAway();
  };

  const handleAddButton = () => {
    const { id, productName } = clickedCartItem;
    dispatch({
      type: sellActionTypes.ADD_ITEM_NOTE,
      payload: { id, note }
    });
    notify(`Note added to cart item: ${productName}`);
    handleBackButton();
  };

  return (
    <Popper
      open={openNotePopper}
      anchorEl={cartItemNoteEl}
      placement="bottom-end"
      transition
    >
      {({ TransitionProps }) => (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={2}
              style={styles.paper}
            >
              <Grid container style={styles.rootGrid}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Cart item note
                  </Typography>
                  <Divider />
                </Grid>
                <Grid container item xs={12}>
                  <TextField
                    id="outlined-name"
                    name="cartItemNoteValue"
                    label="Add a note"
                    fullWidth
                    autoFocus
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid container item xs={12}>
                  <Grid item xs={12} align="right">
                    <Button
                      onClick={handleBackButton}
                      style={styles.backButton}
                      color="secondary"
                      variant="contained"
                      id="back-button"
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!note}
                      style={styles.cartAddButton}
                      onClick={handleAddButton}
                    >
                      ADD
                    </Button>
                  </Grid>
                  <Typography display="inline" variant="caption" style={styles.noteTypo}>
                    This note will be attached to this sold item
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        </ClickAwayListener>
      )}
    </Popper>
  );
};

export default AddProductNotePopper;
