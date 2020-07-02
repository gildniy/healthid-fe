import React, { useEffect } from 'react';
import { ApolloConsumer } from 'react-apollo';
import { createFilter } from 'react-search-input';
import { InputBase, InputAdornment, CircularProgress } from '@material-ui/core';
import { addedItems } from '../../assets/css/sellScreenStyles';
import { UserIcon } from '../../assets/SvgIcons/sellScreenSvgs';
import { CUSTOMERS } from '../../queries/customersQuery';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';
import { useStateValue } from '../../providers/stateProvider';

export const CustomerSearchField = () => {
  const [{ sell: { name, searching } },
    dispatch
  ] = Object.values(useStateValue());

  useEffect(() => () => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        openCustomerPopper: false,
        filteredCustomers: [],
        name: ''
      }
    });
  }, []);

  const handleCustomerSearch = (value, client) => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { searching: true }
    });
    try {
      const { customers } = client.readQuery({
        query: CUSTOMERS
      });
      const KEYS_TO_FILTER = ['firstName', 'lastName', 'primaryMobileNumber'];
      const filteredCustomers = customers.filter(createFilter(value, KEYS_TO_FILTER));
      dispatch({
        type: sellActionTypes.SET_SELL_STATE,
        payload: {
          filteredCustomers,
          customerFetchError: false,
          searching: false
        }
      });
    } catch (err) {
      dispatch({
        type: sellActionTypes.SET_SELL_STATE,
        payload: {
          filteredCustomers: [],
          customerFetchError: true,
          searching: false
        }
      });
    }
  };

  const isPopper = value => (value.length <= 2
    ? false
    : !searching
  );

  const handleInputChange = (event, client) => {
    const { currentTarget, target: { value } } = event;
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        customerAnchorEl: currentTarget,
        openCustomerPopper: isPopper(value),
        placement: 'bottom-start',
        name: value,
      }
    });
    value.length > 2 && handleCustomerSearch(value, client);
  };

  return (
    <ApolloConsumer>
      {client => (
        <InputBase
          id="customer-input"
          placeholder="Add Customer..."
          style={addedItems.inputRoot}
          name="customerInput"
          value={name}
          onChange={e => handleInputChange(e, client)}
          startAdornment={(
            <InputAdornment position="start">
              <UserIcon style={addedItems.adornment} />
            </InputAdornment>
          )}
          endAdornment={(
            <InputAdornment position="end">
              {searching && <CircularProgress size="1.5rem" />}
            </InputAdornment>
          )}
        />
      )}
    </ApolloConsumer>
  );
};


export default CustomerSearchField;
