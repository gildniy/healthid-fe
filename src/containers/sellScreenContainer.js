import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { ApolloConsumer, Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField, InputAdornment } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { createFilter } from 'react-search-input';
import DataTableLoader from '../components/dataTable/dataTableLoader';
import withAuth from '../components/withAuth';
import SellScreen from '../components/sell/sellScreen';
import stringToColor from '../components/utils/stringToColor';
import initialState from '../components/sell/sellScreenState';
import ReturnSingleCustomer from '../components/sell/returnSingleCustomer';
import WithInitialData from './withInitialData';
import PaymentContainer from '../components/payment/container/paymentContainer';
import viewProductStyles from '../assets/css/viewProductsStyles';
import GET_FILTERED_PRODUCTS from '../queries/productsQueries/filteredProductsQuery';
import GET_INITIAL_PRODUCTS from '../queries/productsQueries/initialProductsQuery';
import sellActionTypes from '../providers/reducers/sell/sellTypes';

import { StateContext } from '../providers/stateProvider';
import { ReturnScreen } from '../components/sell/return/returnScreen';
import returnsActionTypes from '../providers/reducers/returns/returnsTypes';

export class SellScreenContainer extends Component {
  state = {
    ...initialState,
  };

  componentDidMount() {
    const { session: { me: { activeOutlet } } } = this.props;
    const preference = activeOutlet && activeOutlet.outletpreference;
    const outletCurrency = preference && preference.outletCurrency;
    const currency = outletCurrency.symbol || '₦';
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { currency }
    });
    dispatch({
      type: 'changeGrid',
      grid: 'grid2'
    });
    this.setLocations(dispatch);
    this.setInitialData();
  }

  static getDerivedStateFromProps(props, state) {
    const { offline } = props;
    return {
      isOffline: offline
    };
  }

  setInitialData = () => {
    const [, dispatch] = Object.values(this.context);
    const { countries } = this.props;
    dispatch({
      type: 'SET_COUNTRIES',
      payload: countries
    });
  };

  handleChange = (event, client) => {
    const { isOffline } = this.state;
    const { name, value } = event.target;
    this.setState({ [name]: value });

    if (name === 'searchValue' && value.length > 2) {
      this.setState({ searching: true });
      if (isOffline) this.filterOfflineProducts(client, value);
      else this.filterOnlineProducts(client, value);
    }
  };

  filterOfflineProducts = (client, value) => {
    const { approvedProducts } = client.readQuery({
      query: GET_INITIAL_PRODUCTS,
    });
    const KEYS_TO_FILTER = ['id', 'productName', 'tags', 'globalUpc'];
    const filteredProducts = approvedProducts.filter(createFilter(value, KEYS_TO_FILTER));
    this.setState({
      filteredProducts,
      searching: false
    });
  }

  filterOnlineProducts = (client, value) => {
    client.query({
      query: GET_FILTERED_PRODUCTS,
      variables: { productName: value }
    }).then(({ data: { filterProducts: { edges } } }) => {
      const filteredProducts = [];
      edges.map(({ node }) => filteredProducts.push(node));
      this.setState({
        filteredProducts,
        searching: false
      });
    }).catch(() => {
      this.setState({
        filteredProducts: [],
        searching: false
      });
    });
  }

  handleNoteInPutChange = (event) => {
    const [, dispatch] = Object.values(this.context);
    const { value, name } = event.target;
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { [name]: value }
    });
  }

  handleCustomerInputChange = placement => (event) => {
    const { currentTarget, target: { value } } = event;
    this.setState({
      customerAnchorEl: currentTarget,
      openCustomerPopper: !!value,
      placement,
      firstName: value,
    });
    this.handleCustomerSearch(value);
  }

  handleCustomerSearch = (value) => {
    const { customers } = this.state;
    const KEYS_TO_FILTER = ['firstName', 'lastName', 'primaryMobileNumber'];
    const filteredCustomers = value && customers.filter(createFilter(value, KEYS_TO_FILTER));
    this.setState({ filteredCustomers });
  };

  getInitials = ({ firstName, lastName }) => {
    const newLastName = lastName || 'xavier';
    const initials = firstName.charAt(0).toUpperCase()
      + newLastName.charAt(0).toUpperCase();
    return initials;
  };

  handleDiscardSaleButton = () => {
    this.setState({
      cartItems: [],
      mainCartNote: ''
    });
  };

  handleHoldSaleButton = () => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { openHoldSaleDialog: true }
    });
  };

  handleSalesOnHoldButton = () => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { openSalesOnHoldDialog: true }
    });
  };

  handleDiscountClick = (event) => {
    const [, dispatch] = Object.values(this.context);
    const { currentTarget } = event;
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        discountEl: currentTarget,
        openDiscountPopper: true,
      }
    });
  };

  handleAddNewCustomer = (name) => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'SET_CUSTOMER_VALUE',
      payload: {
        firstName: name,
        openDialog: true
      }
    });
  };

  handlePrimaryPhoneChange = (value) => {
    this.setState({
      primaryMobileNumber: value,
      formError: false,
      mobileError: false,
    });
  }

  handleSecondaryPhoneChange = (value) => {
    this.setState({
      secondaryMobileNumber: value,
    });
  }

  handleContactPhoneChange = (value) => {
    this.setState({
      emergencyContactNumber: value,
    });
  }

  setCityId = (value) => {
    const { cities } = this.state;
    cities && cities.map((city) => {
      if (city.name === value) {
        this.setState({ cityId: Number(city.id) });
      }
      return value;
    });
  }

  renderSingleCustomer = (customer, isSelected = '') => (
    <Fragment key={customer.id}>
      <ReturnSingleCustomer
        customer={customer}
        isSelected={isSelected}
        handleDisplaySelectedCustomer={this.handleDisplaySelectedCustomer}
        stringToColor={stringToColor}
        getInitials={this.getInitials}
        removeSelectedCustomer={this.removeSelectedCustomer}
      />
    </Fragment>
  );

  removeSelectedCustomer = () => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'SET_CUSTOMER_VALUE',
      payload: {
        selectedCustomer: null,
        firstName: ''
      }
    });
    dispatch({
      type: returnsActionTypes.SET_RETURN_STATE,
      payload: { customer: null }
    });
  };

  handleDisplaySelectedCustomer = (customer, isSelected) => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'SET_CUSTOMER_VALUE',
      payload: { selectedCustomer: customer }
    });
    dispatch({
      type: returnsActionTypes.SET_RETURN_STATE,
      payload: { customer }
    });

    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        filteredCustomers: [],
        openCustomerPopper: false,
      }
    });
    isSelected && this.handleDisplayCustomerDetails(customer, isSelected, dispatch);
  };

  handleDisplayCustomerDetails = ({
    id, firstName, lastName, email, primaryMobileNumber,
    secondaryMobileNumber, loyaltyMember, region, city, country,
    emergencyContactName, emergencyContactEmail, emergencyContactNumber,
  }, isSelected, dispatch) => {
    dispatch({
      type: 'SET_CUSTOMER_VALUE',
      payload: {
        openCustomerDetailsDialog: true,
        isSelected,
        id,
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        primaryMobileNumber: primaryMobileNumber || '',
        secondaryMobileNumber: secondaryMobileNumber || '',
        loyaltyMember,
        region: region || '',
        country: country ? country && country.name : '-',
        city: city ? city && city.name : '-',
        emergencyContactName: emergencyContactName || '',
        emergencyContactEmail: emergencyContactEmail || '',
        emergencyContactNumber: emergencyContactNumber || ''
      }
    });
    this.setLocations(dispatch);
    this.setCityId(city.name);
  };

  setLocations = (dispatch) => {
    const { countries } = this.props;
    const { country } = this.state;
    let cities;
    let countryId;
    const newCountry = country || 'Nigeria';
    countries && countries.map((item) => {
      if (item.name === newCountry) {
        cities = item.citySet;
        countryId = item.id;
      }
      return cities;
    });
    dispatch({
      type: 'SET_CUSTOMER_VALUE',
      payload: {
        country: newCountry,
        countryId,
        cities,
      }
    });
    this.setState({
      country: newCountry,
      countryId,
      countries,
      cities,
    });
  };

  updateItems = itemsArray => itemsArray.map(({
    id, productName, quantity, salesPrice, dispensingSize, discount = 0
  }) => {
    const total = this.calculateTotal(quantity, salesPrice);
    const discountedTotal = this.calculateDiscountedTotal(total, discount);
    return {
      id, productName, quantity, salesPrice, discount, dispensingSize, discountedTotal
    };
  });

  calculateTotal = (quantity, salesPrice) => quantity * salesPrice;

  calculateDiscountedTotal = (salesPrice, discount) => {
    const calculatedDiscount = this.calculateDiscount(salesPrice, discount);
    return (salesPrice - calculatedDiscount);
  }

  calculateDiscount = (salesPrice, discount) => {
    const percentage = 100;
    return (salesPrice * (discount / percentage));
  }

  totalSum = items => items.map(
    ({ discountedTotal }) => discountedTotal
  ).reduce((sum, i) => sum + i, 0);

  renderCartTotal = (cart) => {
    const updatedCart = this.updateItems(cart);
    const total = this.totalSum(updatedCart);
    return total;
  };

  renderCartDiscount = (cart, discount) => {
    const cartTotal = this.renderCartTotal(cart);
    const cartDiscount = this.calculateDiscount(cartTotal, discount);
    return cartDiscount;
  };

  renderGrandTotal = (cart, discount) => {
    const cartTotal = this.renderCartTotal(cart);
    const cartDiscount = this.calculateDiscount(cartTotal, discount);
    const grandTotal = cartTotal - cartDiscount;
    return grandTotal;
  };

  renderSearchBar = (searchValue) => {
    const { searching } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <TextField
            name="searchValue"
            placeholder="Search or scan products...."
            value={searchValue}
            autoFocus
            onChange={event => this.handleChange(event, client)}
            variant="filled"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start" style={viewProductStyles.searchIcon}>
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                searching && <CircularProgress disableShrink />
              )
            }}
          />
        )}
      </ApolloConsumer>
    );
  };

  handleClickToPay = () => {
    const [{ sell: { cart, discount } }, dispatch] = Object.values(this.context);
    const totalToPay = this.renderGrandTotal(cart, discount);
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        openPaymentDialog: true,
        totalToPay
      }
    });
  }

  handleClosePaymentDialog = () => {
    const [, dispatch] = Object.values(this.context);
    this.setState({ ...initialState });
    dispatch({
      type: 'SET_CUSTOMER_VALUE',
      payload: { isSelected: '', selectedCustomer: null }
    });
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        openPaymentDialog: false,
        cart: [],
        mainCartNote: '',
        discount: 0,
        name: ''
      }
    });
  }

  static contextType = StateContext;

  render() {
    const { session, isReturns } = this.props;
    const { me } = session;
    const [{ sell: { cart, totalToPay, currency } }] = Object.values(this.context);
    return (
      <Query
        query={GET_INITIAL_PRODUCTS}
      >
        {({ loading, data, error }) => {
          if (loading) return <DataTableLoader />;
          if (error) return null;

          const { approvedProducts } = data;

          return (isReturns
            ? (
              <Fragment>
                <ReturnScreen
                  state={this.state}
                  approvedProducts={approvedProducts}
                  handleCustomerInputChange={this.handleCustomerInputChange}
                  handleDiscardSaleButton={this.handleDiscardSaleButton}
                  handleHoldSaleButton={this.handleHoldSaleButton}
                  handleSalesOnHoldButton={this.handleSalesOnHoldButton}
                  handleDiscountClick={this.handleDiscountClick}
                  handleAddNewCustomer={this.handleAddNewCustomer}
                  renderSingleCustomer={this.renderSingleCustomer}
                  setCountries={this.setCountries}
                  renderSearchBar={this.renderSearchBar}
                  handlePrimaryPhoneChange={this.handlePrimaryPhoneChange}
                  handleSecondaryPhoneChange={this.handleSecondaryPhoneChange}
                  handleContactPhoneChange={this.handleContactPhoneChange}
                  handleClickToPay={this.handleClickToPay}
                  renderBatchQuantity={this.renderBatchQuantity}
                />
                {/* Payment popper */}
                <PaymentContainer
                  products={cart}
                  currency={currency}
                  totalToPay={totalToPay}
                  me={me}
                  outletId={me.outlets[0].id}
                  handleClosePaymentDialog={this.handleClosePaymentDialog}
                  renderCartTotal={this.renderCartTotal}
                  renderCartDiscount={this.renderCartDiscount}
                  updateItems={this.updateItems}
                />
              </Fragment>
            )
            : (
              <Fragment>
                <SellScreen
                  state={this.state}
                  approvedProducts={approvedProducts}
                  handleChange={this.handleChange}
                  handleNoteInPutChange={this.handleNoteInPutChange}
                  handleCustomerInputChange={this.handleCustomerInputChange}
                  handleDiscardSaleButton={this.handleDiscardSaleButton}
                  handleHoldSaleButton={this.handleHoldSaleButton}
                  handleSalesOnHoldButton={this.handleSalesOnHoldButton}
                  handleDiscountClick={this.handleDiscountClick}
                  handleAddNewCustomer={this.handleAddNewCustomer}
                  renderSingleCustomer={this.renderSingleCustomer}
                  renderCartTotal={this.renderCartTotal}
                  renderCartDiscount={this.renderCartDiscount}
                  renderGrandTotal={this.renderGrandTotal}
                  setCountries={this.setCountries}
                  renderSearchBar={this.renderSearchBar}
                  handlePrimaryPhoneChange={this.handlePrimaryPhoneChange}
                  handleSecondaryPhoneChange={this.handleSecondaryPhoneChange}
                  handleContactPhoneChange={this.handleContactPhoneChange}
                  handleClickToPay={this.handleClickToPay}
                  renderBatchQuantity={this.renderBatchQuantity}
                />
                {/* Payment popper */}
                <PaymentContainer
                  products={cart}
                  currency={currency}
                  totalToPay={totalToPay}
                  me={me}
                  outletId={me.outlets[0].id}
                  handleClosePaymentDialog={this.handleClosePaymentDialog}
                  renderCartTotal={this.renderCartTotal}
                  renderCartDiscount={this.renderCartDiscount}
                  updateItems={this.updateItems}
                />
              </Fragment>
            )
          );
        }}
      </Query>
    );
  }
}

SellScreenContainer.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  isReturns: PropTypes.bool
};

SellScreenContainer.defaultProps = {
  session: {},
  countries: [],
  isReturns: false
};

export default withAuth(WithInitialData(SellScreenContainer));
