import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { Grow } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { TableSearchStyles } from '../../../assets/styles/orders/order';
import SearchField from '../Template/SearchField';

export const TableSearch = ({
  classes, onHide, handleChange, state,
  popperClickAway, handleAssignSupplier
}) => {
  const {
    supplier, searching, active, errorText, anchorEl,
    placement, openPopper, filteredSuppliers
  } = state;

  return (
    <Grow appear in timeout={300}>
      <div className={classes.main}>
        <SearchField
          id="search-field"
          autoFocus
          fullWidth
          state={state}
          value={supplier}
          name="supplier"
          placeholder="Search supplier..."
          errorText={errorText}
          searching={searching}
          active={active}
          filteredSuppliers={filteredSuppliers}
          handleChange={handleChange}
          anchorEl={anchorEl}
          placement={placement}
          openPopper={openPopper}
          popperClickAway={popperClickAway}
          handleAssignSupplier={handleAssignSupplier}
        />
        <IconButton className={classes.clearIcon} onClick={onHide}>
          <ClearIcon />
        </IconButton>
      </div>
    </Grow>
  );
};

TableSearch.propTypes = {
  classes: PropTypes.objectOf(Object),
  state: PropTypes.objectOf(Object),
  onHide: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  popperClickAway: PropTypes.func.isRequired,
  handleAssignSupplier: PropTypes.func.isRequired,
};

TableSearch.defaultProps = {
  classes: {},
  state: {},
};

export default withStyles(TableSearchStyles)(TableSearch);
