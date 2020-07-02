/* eslint-disable react/prop-types */
import React from 'react';
import { graphql, compose } from 'react-apollo';
import BatchDetailDialog from '../shared/batch/batchDetailDialog';
import ProductBatchForm from '../shared/batch/productBatchForm';
import { FILTER_APPROVED_SUPPLIERS } from '../../queries/getSuppliers';
import notify from '../shared/Toaster';
import UPDATE_PRODUCT_BATCH from '../../mutations/updateProductBatch';

import { StateContext } from '../../providers/stateProvider';

class ModalForm extends React.Component {
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
  };

  handleDateChange = (Name, event) => {
    const name = Name;
    const value = new Date(event).toISOString().split('T')[0];
    const toUpdate = {};
    toUpdate[name] = value;
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'UPDATE_SINGLE_BATCH',
      payload: {
        ...toUpdate,
      }
    });
  };

  handleSaveChanges = () => {
    const [
      { batchInformation: { singleBatch } }, dispatch
    ] = Object.values(this.context);
    const { supplier } = this.state;
    const { updateProductBatch } = this.props;
    const {
      productName, orderId, supplierId, batchId, batchNumber,
      dateReceived, expiryDate, costPerItem, quantityReceived,
    } = singleBatch;
    updateProductBatch({
      variables: {
        orderId,
        supplierId,
        ids: [batchId],
        batchRef: batchNumber,
        dateReceived,
        expiryDate,
        status: 'IN_STOCK',
        unitCost: costPerItem,
        quantity: quantityReceived,
      }
    }).then(() => {
      notify(`Batch for ${productName} updated successfully`);
    }).catch((error) => {
      notify(error.message.slice(14));
    });

    dispatch({
      type: 'UPDATE_PRODUCT_BATCH',
      payload: {
        openDialog: false,
        openModal: false,
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
    if (active === 'supplier') {
      this.setState({
        [active]: name,
        supplierId: id,
        openPopper: false,
      });
      const [, dispatch] = Object.values(this.context);
      dispatch({
        type: 'UPDATE_SINGLE_BATCH',
        payload: {
          supplier: name,
          supplierId: id
        }
      });
    }
  }


  static contextType = StateContext;

  render() {
    const { state } = this.context;
    const { batchInformation } = state;
    const { singleBatch, openDialog } = batchInformation;
    const { handleClose } = this.props;

    return (
      <BatchDetailDialog open={openDialog} handleCloseDialog={handleClose}>
        <ProductBatchForm
          singleBatch={singleBatch}
          state={this.state}
          handleCloseDialog={handleClose}
          {...this.props}
          handleInputChange={this.handleInputChange}
          handleSaveChanges={this.handleSaveChanges}
          handleSearchChange={this.handleSearchChange}
          displaySelected={this.displaySelected}
          popperClickAway={this.popperClickAway}
          handleDateChange={this.handleDateChange}
        />
      </BatchDetailDialog>
    );
  }
}

const UPDATE_PRODUCT_BATCH_MUTATION = graphql(UPDATE_PRODUCT_BATCH, { name: 'updateProductBatch' });

export default compose(
  UPDATE_PRODUCT_BATCH_MUTATION
)(ModalForm);
