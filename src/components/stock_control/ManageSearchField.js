import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchField from './searchField';
import { FILTER_APPROVED_SUPPLIERS } from '../../queries/getSuppliers';
import { useStateValue } from '../../providers/stateProvider';

const ManageSearchField = ({
  styles, fieldValue, fieldLabel, placeholder, name, active,
}) => {
  const [state, setState] = useState({
    searching: false,
    active,
    errorText: '',
    openPopper: false,
    supplier: fieldValue,
    filteredSuppliers: [],
    filteredProducts: []
  });

  const [, dispatch] = Object.values(useStateValue());

  const filterSuppliers = (client, value) => {
    client.query({
      query: FILTER_APPROVED_SUPPLIERS,
      variables: { isApproved: true, supplier: value }
    }).then(({ data: { filterSuppliers: { edges } } }) => {
      const suppliers = edges.map(edge => edge.node);
      setState({
        filteredSuppliers: suppliers,
        errorText: '',
        openPopper: true,
        searching: false
      });
    }).catch(() => {
      const err = 'Supplier matching search query does not exist';
      setState({
        filteredSuppliers: [],
        errorText: err,
        openPopper: false,
        searching: false
      });
    });
  };

  const handleSearchChange = (event, client) => {
    const { name, value } = event.target;

    if (name === 'supplier' && value.length > 2) {
      setState({
        searching: true,
        active: 'supplier',
        errorText: '',
        anchorEl: event.target
      });
      filterSuppliers(client, value);
    }
    setState({ [name]: value });
  };


  const popperClickAway = () => {
    setState({
      openPopper: false,
    });
  };

  const displaySelected = (active, name, id) => {
    if (active === 'supplier') {
      setState({
        [active]: name,
        supplierId: id,
        openPopper: false,
      });
      const event = {
        target: {
          supplier: {
            id,
            name,
          }
        }
      };
      //   handleChange(event);
      dispatch({
        type: 'UPDATE_SINGLE_BATCH',
        payload: {
          supplier: name,
          supplierId: id
        }
      });
    }
  };

  return (
    <SearchField
      state={state}
      value={state.supplier}
      label={fieldLabel}
      name={name}
      placeholder={placeholder}
      errorText={state.errorText}
      searching={state.searching}
      active={active}
      handleChange={handleSearchChange}
      displaySelected={displaySelected}
      popperClickAway={popperClickAway}
      styles={styles}
    />
  );
};

ManageSearchField.propTypes = {
  styles: PropTypes.instanceOf(Object).isRequired,
  fieldValue: PropTypes.string.isRequired,
  fieldLabel: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
};

export default ManageSearchField;
