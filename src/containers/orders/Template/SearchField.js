import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import {
  TextField, InputAdornment, CircularProgress
} from '@material-ui/core';
import SearchFieldPopper from './SearchFieldPopper';
import { PopperStyles } from '../../../assets/styles/orders/order';

export const SearchField = ({
  value, name, searching, active,
  handleChange, errorText, styles,
  addProductToList, popperClickAway,
  openPopper, anchorEl, filteredProducts, placement,
  filteredSuppliers, handleAssignSupplier, placeholder
}) => (
  <Fragment>
    <ApolloConsumer>
      {client => (
        <TextField
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={event => handleChange(event, client)}
          style={styles}
          autoFocus
          fullWidth
          helperText={(value && active === name && errorText) || '\u00a0'}
          FormHelperTextProps={{
            margin: 'dense'
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {searching && active === name
                  ? (
                    <CircularProgress
                      disableShrink
                      size={15}
                      thickness={3}
                      style={{ color: '#868686' }}
                    />
                  ) : null}
              </InputAdornment>
            ),
          }}
        />
      )}
    </ApolloConsumer>
    <SearchFieldPopper
      openPopper={openPopper}
      anchorEl={anchorEl}
      active={active}
      filteredProducts={filteredProducts}
      filteredSuppliers={filteredSuppliers}
      addProductToList={addProductToList}
      handleAssignSupplier={handleAssignSupplier}
      popperClickAway={popperClickAway}
      placement={placement}
      styles={PopperStyles}
    />
  </Fragment>
);

SearchField.propTypes = {
  styles: PropTypes.instanceOf(Object),
  searching: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  active: PropTypes.string,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  openPopper: PropTypes.bool,
  anchorEl: PropTypes.instanceOf(Object),
  filteredProducts: PropTypes.arrayOf(Object),
  filteredSuppliers: PropTypes.arrayOf(Object),
  placement: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  addProductToList: PropTypes.func.isRequired,
  handleAssignSupplier: PropTypes.func.isRequired,
  popperClickAway: PropTypes.func.isRequired,
};

SearchField.defaultProps = {
  styles: {},
  searching: false,
  value: '',
  name: '',
  active: '',
  placeholder: '',
  errorText: '',
  openPopper: false,
  anchorEl: {},
  filteredProducts: PropTypes.arrayOf(Object).isRequired,
  filteredSuppliers: PropTypes.arrayOf(Object).isRequired,
  placement: ''
};

export default SearchField;
