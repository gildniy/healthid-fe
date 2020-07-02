import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withApollo, graphql, compose } from 'react-apollo';
import addProductSupplierIcon from '../../../assets/images/products/supplier.png';
import deleteProductIcon from '../../../assets/images/stock/delete.png';
import { CustomIconButton } from '../../../components/stock_control/utils/utils';
import TableSearch from './TableSearch';
import EditQuantityAndSupplier from '../Modal/EditQuantityAndSupplier';
import AddProducts from '../Modal/AddProducts';
import CustomTableSearchField from '../../../components/shared/customTableSearchField';
import notify from '../../../components/shared/Toaster';
import { CustomToolBarStyles } from '../../../assets/styles/orders/order';
import DELETE_ORDER_ITEMS from '../../../mutations/deleteOrderItems';
import { FILTER_APPROVED_SUPPLIERS } from '../../../queries/getSuppliers';
import GET_ORDER_DETAILS from '../../../queries/getOrderDetails';
import UPDATE_PRODUCT_BATCH from '../../../mutations/updateProductBatch';

export class CustomToolBar extends Component {
  state = {
    supplier: '',
    searching: false,
    filteredSuppliers: [],
    openPopper: false,
    AnchorEl: {},
    placement: 'bottom',
    active: '',
    loading: false,
    errorText: '',
    tableSearch: '',
  };

  handleDelete = () => {
    const {
      numSelected, selected, deselect, deleteProduct
    } = this.props;
    if (numSelected >= 1) {
      deleteProduct({
        variables: {
          ids: selected
        }
      }).then(() => {
        this.updateCache(selected);
        notify(`${numSelected} Product(s) removed from the order`);
        deselect([]);
      }).catch((error) => {
        notify(error.message.slice(14));
      });
    }
  }

  updateCache = (selected) => {
    const order = this.readCacheData();
    const { orderItems } = order;
    const newItems = orderItems.filter(({ id }) => !selected.includes(id));
    this.writeCacheData({ ...order, orderItems: newItems });
  }

  readCacheData = () => {
    const { client, orderId } = this.props;
    const data = client.readQuery({
      query: GET_ORDER_DETAILS,
      variables: { id: orderId }
    });
    return data.order;
  }

  writeCacheData = (newData) => {
    const { client, orderId } = this.props;
    return client.writeQuery({
      query: GET_ORDER_DETAILS,
      variables: { id: orderId },
      data: { order: newData }
    });
  }

  handleAssignSupplier = (supplier) => {
    const {
      numSelected, selected, handleClickSearch,
      assignSupplier, deselect
    } = this.props;
    const { id, displayName } = supplier;
    const orderId = window.location.href.split('/')[5];
    if (numSelected >= 1) handleClickSearch();

    if (id && displayName) {
      this.setState({
        searching: false,
        supplier: '',
        active: '',
        anchorEl: {}
      });
      handleClickSearch();
      assignSupplier({
        variables: {
          orderId,
          ids: selected,
          supplierId: id
        }
      }).then(() => {
        notify(`Supplier ${displayName} Assigned To ${numSelected} Product(s)`);
        deselect([]);
      }).catch((error) => {
        notify(error.message.slice(14));
      });
    }
  }

  handleChange = (event, client) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    if (name === 'tableSearch') {
      const { searchDataValues } = this.props;
      searchDataValues(value);
    }

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

  filterSuppliers = (client, value) => {
    client.query({
      query: FILTER_APPROVED_SUPPLIERS,
      variables: { isApproved: true, supplier: value }
    }).then(({ data: { filterSuppliers: { edges } } }) => {
      const suppliers = edges.map(edge => edge.node);
      const validSuppliers = suppliers.filter(supplier => supplier.suppliersmetaSet.length > 0);

      if (validSuppliers.length > 0) {
        this.setState({
          filteredSuppliers: validSuppliers,
          errorText: '',
          openPopper: true,
          searching: false
        });
      } else {
        const err = 'This supplier does not have a display name. Choose another';
        this.setState({
          filteredSuppliers: [],
          errorText: err,
          openPopper: false,
          searching: false
        });
      }
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

  popperClickAway = () => {
    this.setState({
      openPopper: false,
    });
  }

  render() {
    const { tableSearch } = this.state;
    const {
      isSearchActive, handleHideSearch, handleClickSearch,
      numSelected, client, orderId
    } = this.props;
    return (
      <>
        {isSearchActive ? (
          <TableSearch
            onHide={handleHideSearch}
            state={this.state}
            handleChange={this.handleChange}
            popperClickAway={this.popperClickAway}
            handleServiceButtons={this.handleServiceButtons}
            handleAssignSupplier={this.handleAssignSupplier}
          />
        ) : (
          <CustomTableSearchField
            searchText={tableSearch}
            styles={CustomToolBarStyles}
            handleChange={this.handleChange}
          />
        )}
        <AddProducts
          client={client}
          orderId={orderId}
        />
        <CustomIconButton
          toolTip="Assign supplier"
          disabled={!numSelected}
          onClickHandler={handleClickSearch}
        >
          <img
            src={addProductSupplierIcon}
            style={CustomToolBarStyles.supplierIcon}
            alt="add-supplier"
          />
        </CustomIconButton>
        <CustomIconButton
          toolTip="Remove product(s)"
          disabled={!numSelected}
          onClickHandler={this.handleDelete}
        >
          <img
            src={deleteProductIcon}
            style={CustomToolBarStyles.deleteIcon}
            alt="delete-order"
          />
        </CustomIconButton>
      </>
    );
  }
}

CustomToolBar.propTypes = {
  handleHideSearch: PropTypes.func.isRequired,
  searchDataValues: PropTypes.func.isRequired,
  isSearchActive: PropTypes.bool,
  numSelected: PropTypes.number.isRequired,
  deselect: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  selected: PropTypes.arrayOf(Number).isRequired,
  handleClickSearch: PropTypes.func.isRequired,
  assignSupplier: PropTypes.func.isRequired,
  client: PropTypes.objectOf(Object),
  orderId: PropTypes.string,
};

CustomToolBar.defaultProps = {
  isSearchActive: false,
  client: {},
  orderId: ''
};

const DELETE_PRODUCT_MUTATION = graphql(DELETE_ORDER_ITEMS, { name: 'deleteProduct' });
const ASSIGN_ORDER_SUPPLIER_MUTATION = graphql(UPDATE_PRODUCT_BATCH, { name: 'assignSupplier' });

export default compose(
  DELETE_PRODUCT_MUTATION, ASSIGN_ORDER_SUPPLIER_MUTATION
)(withApollo(CustomToolBar));
