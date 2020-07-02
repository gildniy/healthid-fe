import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Popper, Paper, Grow, ClickAwayListener, Tooltip, IconButton, Grid,
  Button, Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { ToolbarStyles } from '../../../assets/styles/stock/stock';

export const desc = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

export const stableSort = (array, cmp) => {
  const sortedProducts = array.map((element, index) => [element, index]);
  sortedProducts.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  return sortedProducts.map(element => element[0]);
};

export const getSorting = (order, orderBy) => (order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy));

export const getSortedData = (data, page, rowsPerPage, order, orderBy) => stableSort(
  data, getSorting(order, orderBy)
);

export const CustomIconButton = withStyles(ToolbarStyles)(
  ({
    toolTip, buttonRef, onClickHandler, children, classes, disabled
  }) => (
    <Tooltip title={toolTip} className={classes.iconWrapper}>
      <IconButton
        className={classes.IconButton}
        buttonRef={buttonRef}
        aria-owns="menu-list-grow"
        aria-haspopup="true"
        onClick={onClickHandler}
        disabled={disabled}
      >
        { children }
      </IconButton>
    </Tooltip>
  )
);

CustomIconButton.propTypes = {
  toolTip: PropTypes.string,
  children: PropTypes.element,
  buttonRef: PropTypes.func.isRequired,
  onClickHandler: PropTypes.func,
  disabled: PropTypes.bool
};

CustomIconButton.defaultProps = {
  toolTip: 'class',
  children: <span />,
  onClickHandler: () => { },
  disabled: false
};

export const RenderPopper = withStyles(ToolbarStyles)(
  ({
    anchorEl, onClickAway, open, children, classes, className, popperPlacement,
    modifiers
  }) => (
    <Popper
      className={clsx(classes.popper, className && className)}
      open={open}
      placement={popperPlacement}
      anchorEl={anchorEl}
      transition
      disablePortal
      modifiers={modifiers}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          id="menu-list-grow"
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper elevation={2} square className={classes.paper}>
            <ClickAwayListener onClickAway={onClickAway}>{children}</ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
);

RenderPopper.propTypes = {
  anchorEl: PropTypes.oneOfType([PropTypes.element, PropTypes.object]),
  onClickAway: PropTypes.func,
  children: PropTypes.element,
  popperPlacement: PropTypes.string,
  className: PropTypes.string,
  open: PropTypes.bool.isRequired
};

RenderPopper.defaultProps = {
  onClickAway: () => null,
  anchorEl: <span />,
  popperPlacement: 'bottom',
  children: <span />,
  className: 'class'
};

export const AddBatchButtons = ({
  styles, handleAddBatch, handleAddMoreBatches, validated
}) => (
  <Grid style={styles.profileHeader}>
    <Typography variant="h5">Back</Typography>
    <Grid item align="right" style={styles.buttonWrapper}>
      <Button
        key="cancel-button"
        variant="outlined"
        style={styles.addButton}
        color="secondary"
        disabled={validated()}
        onClick={handleAddMoreBatches}
      >
        add new
      </Button>
      <Button
        id="add-button"
        key="add-button"
        variant="contained"
        type="submit"
        disabled={validated()}
        color="secondary"
        style={styles.saveButton}
        onClick={handleAddBatch}
      >
        save
      </Button>
    </Grid>
  </Grid>
);

AddBatchButtons.propTypes = {
  styles: PropTypes.objectOf(Object),
  validated: PropTypes.func,
  handleAddBatch: PropTypes.func,
  handleAddMoreBatches: PropTypes.func
};

AddBatchButtons.defaultProps = {
  styles: {},
  validated: {},
  handleAddBatch: () => {},
  handleAddMoreBatches: () => {}
};
