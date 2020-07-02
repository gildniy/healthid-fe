import React from 'react';
import PropTypes from 'prop-types';
import CustomSearchField from '../shared/customSearchField';
import { FILTER_APPROVED_SUPPLIERS } from '../../queries/getSuppliers';
import {
  stockFormStyles
} from '../../assets/styles/modal/modalStyles';

class ManageSearchField extends React.Component {
    state = {
      supplier: '',
      supplierId: '',
      searching: false,
      filteredSuppliers: [],
      openPopper: false,
      active: '',
      loading: false,
      errorText: '',
      costPerItem: ''
    };

    componentDidMount() {
      const { supplierState } = this.props;
      this.setState({
        supplier: supplierState.name
      });
    }

    handleInputChange = ({ target }) => {
      const { name, value } = target;
      const toUpdate = {};
      toUpdate[name] = value;
      const [, dispatch] = Object.values(this.context);
      dispatch({
        type: 'UPDATE_SINGLE_BATCH',
        payload: {
          ...toUpdate,
        }
      });
    }


    handleSaveChanges = () => {
      const [, dispatch] = Object.values(this.context);
      const { supplier, supplierId } = this.state;
      dispatch({
        type: 'UPDATE_PRODUCT_BATCH',
        payload: {
          openDialog: false,
          supplier,
          supplierId
        }
      });
    }

    handleSearchChange = (event, client) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
      if (name === 'supplier' && value.length > 2) {
        this.setState({
          searching: true,
          active: 'supplier',
          errorText: '',
          anchorEl: event.target
        });
        this.filterSuppliers(client, value);
      }
    };

    popperClickAway = () => {
      this.setState({
        openPopper: false,
      });
    }


    filterSuppliers = (client, value) => {
      client.query({
        query: FILTER_APPROVED_SUPPLIERS,
        variables: { isApproved: true, supplier: value }
      }).then(({ data: { filterSuppliers: { edges } } }) => {
        const suppliers = edges.map(edge => edge.node);
        this.setState({
          filteredSuppliers: suppliers,
          errorText: '',
          openPopper: true,
          searching: false
        });
      }).catch(() => {
        const err = 'Supplier matching search query does not exist';
        this.setState({
          filteredSuppliers: [],
          errorText: err,
          openPopper: false,
          searching: false
        });
      });
    };

    displaySelected = (active, name, id) => {
      const { handleChange } = this.props;
      if (active === 'supplier') {
        this.setState({
          [active]: name,
          supplierId: id,
          openPopper: false,
        });
        handleChange(id, name);
      }
    }

    render() {
      const {
        errorText, searching, active, supplier
      } = this.state;
      return (
        <CustomSearchField
          required
          state={this.state}
          value={supplier}
          label="Supplier"
          name="supplier"
          placeholder="Search supplier..."
          errorText={errorText}
          searching={searching}
          active={active}
          handleChange={this.handleSearchChange}
          displaySelected={this.displaySelected}
          popperClickAway={this.popperClickAway}
          styles={stockFormStyles}
        />
      );
    }
}

ManageSearchField.propTypes = {
  handleChange: PropTypes.func.isRequired,
  supplierState: PropTypes.instanceOf(Object).isRequired
};

export default ManageSearchField;
