import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer } from 'react-apollo';
import {
  TextField, InputAdornment, CircularProgress
} from '@material-ui/core';
import SearchFieldPopper from './searchFieldPopper';
import searchIcon from '../../assets/images/stock/search.png';

export const CustomSearchField = ({
  state, value, name, label, placeholder, searching, active, large,
  handleChange, styles, displaySelected, popperClickAway, errorText
}) => (
  <Fragment>
    <ApolloConsumer>
      {client => (
        <TextField
          name={name}
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={event => handleChange(event, client)}
          fullWidth
          helperText={(value && active === name && errorText) || '\u00a0'}
          FormHelperTextProps={{
            margin: 'dense'
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" style={styles.searchIcon}>
                {searching && active === name
                  ? (
                    <CircularProgress
                      disableShrink
                      size={15}
                      thickness={3}
                      style={{ color: '#868686' }}
                    />
                  ) : (
                    <img src={searchIcon} style={{ width: '15px' }} alt="search" />
                  )}
              </InputAdornment>
            ),
          }}
        />
      )}
    </ApolloConsumer>
    <SearchFieldPopper
      state={state}
      styles={styles}
      displaySelected={displaySelected}
      popperClickAway={popperClickAway}
      large={large}
    />
  </Fragment>
);

CustomSearchField.propTypes = {
  state: PropTypes.objectOf(Object),
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  active: PropTypes.string,
  large: PropTypes.bool,
  placeholder: PropTypes.string,
  errorText: PropTypes.string,
  searching: PropTypes.bool,
  handleChange: PropTypes.func,
  displaySelected: PropTypes.func,
  popperClickAway: PropTypes.func,
  styles: PropTypes.objectOf(Object),
};

CustomSearchField.defaultProps = {
  state: {},
  value: '',
  name: '',
  label: '',
  active: '',
  large: false,
  placeholder: '',
  errorText: '',
  searching: false,
  handleChange: () => { },
  displaySelected: () => { },
  popperClickAway: () => { },
  styles: {},
};

export default CustomSearchField;
