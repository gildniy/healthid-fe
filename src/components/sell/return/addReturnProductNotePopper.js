import React, { useEffect, useState } from 'react';
import {
  Popper, Paper, Fade, Grid, Typography, Divider, TextField,
  Button, ClickAwayListener
} from '@material-ui/core';
import notify from '../../shared/Toaster';
import { popper as styles } from '../../../assets/css/sellScreenStyles';
import { useStateValue } from '../../../providers/stateProvider';
import returnsActionTypes from '../../../providers/reducers/returns/returnsTypes';

const AddReturnProductNotePopper = () => {
  const [
    { returns: { openNotePopper, cartItemNoteEl, clickedCartItem } },
    dispatch
  ] = Object.values(useStateValue());
  const { note, productName } = clickedCartItem;
  const [sessionNote, setSessionNote] = useState('');
  useEffect(() => {
    setSessionNote(note);
  }, [clickedCartItem]);
  const handleClickAway = () => {
    dispatch({
      type: returnsActionTypes.SET_RETURN_STATE,
      payload: { openNotePopper: false }
    });
  };
  const setNote = (freshNote) => {
    setSessionNote(freshNote);
  };
  const handleBackButton = () => {
    handleClickAway();
  };

  const handleAddButton = () => {
    dispatch({
      type: returnsActionTypes.SET_PRODUCT_NOTE,
      payload: { clickedCartItem, freshNote: sessionNote }
    });
    notify(`Note added to return cart item: ${productName}`);
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
                    Return item note
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
                    value={sessionNote}
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
                      disabled={!sessionNote}
                      style={styles.cartAddButton}
                      onClick={handleAddButton}
                    >
                      ADD
                    </Button>
                  </Grid>
                  <Typography display="inline" variant="caption" style={styles.noteTypo}>
                    This note will be attached to this return item
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

export default AddReturnProductNotePopper;
