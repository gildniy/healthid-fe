import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import Modal from '@material-ui/core/Modal';
import { Paper, Grid, Typography } from '@material-ui/core';
import {
  ManualOrderModalStyles as ModalStyles, CustomToolBarStyles
} from '../../../assets/styles/orders/order';
import { CustomIconButton } from '../../../components/stock_control/utils/utils';
import approveIcon from '../../../assets/images/stock/approve.png';
import cancelIcon from '../../../assets/images/sellScreen/Cancel.png';
import addProductIcon from '../../../assets/images/products/add.png';
import SearchField from '../Template/SearchField';
import notify from '../../../components/shared/Toaster';
import GET_ORDER_DETAILS from '../../../queries/getOrderDetails';
import GET_FILTERED_PRODUCTS from '../../../queries/productsQueries/filteredProductsQuery';
import ADD_ORDER_ITEMS from '../../../mutations/addOrderItems';

export class AddProducts extends Component {
  state = {
    open: false,
    productName: '',
    searching: false,
    filteredProducts: [],
    openPopper: false,
    anchorEl: {},
    placement: '',
    active: '',
    loading: false,
    errorText: '',
    products: [],
    productIDs: []
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, products: [] });
  };

  filterProducts = (client, value) => {
    client.query({
      query: GET_FILTERED_PRODUCTS,
      variables: { productName: value }
    }).then(({ data: { filterProducts: { edges } } }) => {
      const prods = edges.map(edge => edge.node);
      this.setState({
        filteredProducts: prods, errorText: '', openPopper: true, searching: false
      });
    }).catch(() => {
      const err = 'Product matching search query does not exist';
      this.setState({
        filteredProducts: [], errorText: err, openPopper: false, searching: false
      });
    });
  };

  handleChange = (event, client) => {
    const { name, value } = event.target;
    this.setState({ productName: value });
    if (name === 'productName' && value.length > 2) {
      this.setState({
        searching: true,
        active: 'productName',
        errorText: '',
        anchorEl: event.target,
        placement: 'bottom'
      });
      this.filterProducts(client, value);
    }
  };

  addProductToList = (product) => {
    const { active, productIDs, products } = this.state;
    if (active === 'productName') {
      this.setState({
        openPopper: false,
        productIDs: [...productIDs, parseInt(product.id, 10)],
        products: [...products, product],
        productName: ''
      });
    }
  };

  popperClickAway = () => {
    this.setState({ openPopper: false });
  };

  handleSave = () => {
    const { addOrderItems } = this.props;
    const { productIDs } = this.state;
    const orderID = window.location.href.split('/')[5];
    addOrderItems({
      variables: {
        orderID,
        productIDs
      }
    }).then((res) => {
      const { data: { addOrderItems: orderItems } } = res;
      const { message, addedProductDetails } = orderItems;
      notify(message);
      this.updateCache(addedProductDetails);
      this.handleClose();
    }).catch((error) => {
      notify(error.message.slice(14));
    });
  };

  updateCache = (addedProductDetails) => {
    const order = this.readCacheData();
    const { orderItems } = order;
    const newItems = orderItems.concat(addedProductDetails);
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

  render() {
    const {
      open, products, productName, errorText,
      searching, active, anchorEl, filteredProducts,
      placement, openPopper
    } = this.state;

    return (
      <Fragment>
        <CustomIconButton
          toolTip="Add Product(s)"
          onClickHandler={this.handleOpen}
        >
          <img src={addProductIcon} style={CustomToolBarStyles.productIcon} alt="edit" />
        </CustomIconButton>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          disableAutoFocus
          disableRestoreFocus
          open={open}
        >
          <Paper elevation={2} style={ModalStyles.wrapper}>
            <Grid>
              <Grid container justify="space-between" style={ModalStyles.editHeader}>
                <Grid item style={ModalStyles.titleContainer}>
                  <Typography style={ModalStyles.title}>Add Product(s) to Order</Typography>
                </Grid>
                <Grid item style={ModalStyles.iconContainer}>
                  <CustomIconButton
                    toolTip="Save"
                    disabled={!products.length}
                    onClickHandler={this.handleSave}
                  >
                    <img src={approveIcon} style={ModalStyles.approveIcon} alt="save" />
                  </CustomIconButton>
                  <CustomIconButton
                    toolTip="Cancel"
                    onClickHandler={this.handleClose}
                  >
                    <img src={cancelIcon} style={ModalStyles.cancelIcon} alt="cancel" />
                  </CustomIconButton>
                </Grid>
              </Grid>
              <Grid style={ModalStyles.textFieldContainer}>
                <Grid>
                  <Typography style={ModalStyles.subTitle}>Search Product</Typography>
                </Grid>
                <Grid>
                  <SearchField
                    id="search-field"
                    autoFocus
                    fullWidth
                    value={productName}
                    name="productName"
                    placeholder="Search product..."
                    errorText={errorText}
                    searching={searching}
                    active={active}
                    handleChange={this.handleChange}
                    addProductToList={this.addProductToList}
                    popperClickAway={this.popperClickAway}
                    openPopper={openPopper}
                    anchorEl={anchorEl}
                    filteredProducts={filteredProducts}
                    placement={placement}
                    styles={ModalStyles.textField}
                  />
                </Grid>
              </Grid>
              {
                products.length ? (
                  <Grid>
                    <Typography style={ModalStyles.productsTitle}>
                      {products.length}
                      {' '}
                      Added Product(s)
                    </Typography>
                    <Grid style={ModalStyles.productsContainer}>
                      {
                        products.map((product, index) => (
                          <Grid style={ModalStyles.productContainer} key={product.id}>
                            <Typography style={ModalStyles.product}>
                              {index + 1}
                              {'. '}
                              { product.productName }
                            </Typography>
                          </Grid>
                        ))
                      }
                    </Grid>
                  </Grid>
                ) : (
                  <Grid>
                    <Typography style={ModalStyles.noProductsTitle}>
                      No Product(s) Added
                    </Typography>
                  </Grid>
                )
              }
            </Grid>
          </Paper>
        </Modal>
      </Fragment>
    );
  }
}

AddProducts.propTypes = {
  addOrderItems: PropTypes.func.isRequired,
  client: PropTypes.objectOf(Object),
  orderId: PropTypes.string,
};

AddProducts.defaultProps = {
  client: {},
  orderId: ''
};

const ADD_ORDER_ITEMS_MUTATION = graphql(ADD_ORDER_ITEMS, { name: 'addOrderItems' });

export default compose(ADD_ORDER_ITEMS_MUTATION)(AddProducts);
