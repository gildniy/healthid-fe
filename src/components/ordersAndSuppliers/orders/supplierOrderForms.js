/* eslint-disable react/no-array-index-key */
import React, { Component, Fragment } from 'react';
import { withApollo, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Grid, Paper, Button, Typography, IconButton, Select, MenuItem
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {
  Next, Previous, PreviousDisabled, NextDisabled
} from '../../../assets/SvgIcons/sellScreenSvgs';
import { MainBusinessSetUpStyles as styles, SetupHeader } from '../../../assets/styles/setup';
import pageStyle from '../../../assets/styles/orders/supplierOrderForms';
import notify from '../../shared/Toaster';
import Loader from '../../shared/Loader';
import Modal from './supplierOrderModal';
import OrderCard from './orderCard';
import SelectMenu from './supplierOrderMenu';
import withAuth from '../../withAuth';
import { StateContext } from '../../../providers/stateProvider';
import GET_SUPPLIER_ORDER_FORMS from '../queries/supplierOrderFormsQuery';
import PLACE_ORDER from '../../../mutations/placeOrder';
import CANCEL_ORDER from '../../../mutations/cancelOrder';

export class SupplierOrderForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      noPerPage: 12,
      loading: true,
      data: [],
      orderForms: [],
      checked: [],
      openModal: false,
      modalAction: '',
      modalText: ''
    };
  }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
    this.getData();
  }

  getData = () => {
    const { client } = this.props;
    client.query({
      query: GET_SUPPLIER_ORDER_FORMS,
      fetchPolicy: 'no-cache'
    }).then(({ data: { allSuppliersOrderForms } }) => {
      const supplierOrderForms = allSuppliersOrderForms.filter(
        ({ orderDetails }) => orderDetails.length && orderDetails[0].status === 'PENDING_ORDER'
      );
      this.setState({ data: supplierOrderForms, loading: false });
      this.pagination(1, 12);
    }).catch(() => notify('Could not retrieve supplier order forms'));
  }

  pagination = (page, noPerPage) => {
    const from = (page - 1) * noPerPage;
    const to = from + noPerPage;
    const { data } = this.state;
    this.setState({
      page,
      noPerPage,
      orderForms: data.slice(from, to)
    });
  }

  changeNoPerPage = ({ target: { value } }) => {
    this.pagination(1, value);
  }

  check = (order) => {
    const { checked } = this.state;
    return !checked.includes(order)
      ? this.setState({ checked: [...checked, order] })
      : this.setState({ checked: checked.filter(el => el !== order) });
  }

  closeModal = () => this.setState({
    openModal: false,
    modalAction: '',
    modalText: ''
  });

  handleConfirm = (action) => {
    switch (action) {
    case 'place_orders':
      return this.placeOrders();
    case 'cancel_orders':
      return this.cancelOrder();
    default:
      break;
    }
  }

  placeOrders = async () => {
    this.closeModal();
    const { placeOrder } = this.props;
    const { data: forms, checked } = this.state;
    const orderFormsToPlace = forms.filter(form => checked.includes(form.id)).map(({ id }) => id);
    this.setState({
      orderForms: [],
      data: [],
      checked: [],
      loading: true
    });
    await placeOrder({
      variables: {
        supplierOrderIds: orderFormsToPlace
      }
    }).then(({ data: { placeOrder: { mailMessage } } }) => notify(mailMessage))
      .catch(() => notify('An error occurred while placing the order(s)'));
    this.getData();
  }

  cancelOrder = async () => {
    this.closeModal();
    const { cancelOrder } = this.props;
    const { data: forms, checked } = this.state;
    const orderFormsToCancel = forms.filter(form => checked.includes(form.id)).map(({ id }) => id);
    this.setState({
      orderForms: [],
      data: [],
      checked: [],
      loading: true
    });
    await cancelOrder({
      variables: {
        supplierOrderIds: orderFormsToCancel
      }
    }).then(({ data: { cancelOrder: { message } } }) => notify(message))
      .catch(() => notify('An error occurred while placing the order(s)'));
    this.getData();
  }

  placeOrdersCheck = () => {
    try {
      const { checked } = this.state;
      this.setState({
        openModal: true,
        modalAction: 'place_orders',
        modalText: `Are you sure you want to place ${checked.length} order(s)?`
      });
    } catch (error) {
      notify(error.message);
    }
  }

  cancelOrdersCheck = () => {
    const { checked } = this.state;
    this.setState({
      openModal: true,
      modalAction: 'cancel_orders',
      modalText: `Are you sure you want to cancel ${checked.length} order(s)?`
    });
  }

  selectAction = (action) => {
    const { data: forms, checked } = this.state;
    switch (action) {
    case 'select_all':
      return this.setState({
        checked: forms.map(({ orderId, supplierOrderFormId }) => (
          supplierOrderFormId || orderId
        ))
      });
    case 'select_none':
      return this.setState({ checked: [] });
    case 'invert_select':
      return this.setState({
        checked: forms.reduce((selected, form) => {
          if (!checked.includes(form.supplierOrderFormId || form.orderId)) {
            selected.push(form.supplierOrderFormId || form.orderId);
          }
          return selected;
        }, [])
      });
    case 'place_orders':
      return this.placeOrdersCheck();
    case 'cancel_orders':
      return this.cancelOrdersCheck();
    default:
      break;
    }
  }

  static contextType = StateContext;

  render() {
    const {
      orderForms,
      page,
      noPerPage,
      data: allForms,
      checked,
      openModal,
      modalAction,
      modalText,
      loading
    } = this.state;
    const formsNumber = allForms.length;
    const lastPage = Math.ceil(formsNumber / noPerPage);
    const first = (page - 1) * noPerPage + 1;
    const last = page * noPerPage;
    return (
      <Fragment>
        <Grid container style={styles.container}>
          <Grid item xs={1} style={SetupHeader.backBox}>
            <Button style={SetupHeader.backButton}>
              <Link to="/orders/open" style={SetupHeader.link}>
                <ArrowBack style={{ fontSize: 30 }} />
              </Link>
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Grid style={styles.profileHeader}>
              <Typography variant="h5">
                Back
              </Typography>
            </Grid>
            <Paper elevation={2} style={{ ...pageStyle.paper }}>
              <Grid>
                { checked.length
                  ? (
                    <SelectMenu
                      selected={checked.length}
                      action={this.selectAction}
                    />
                  ) : (
                    <Grid style={{ ...pageStyle.contentHeader }}>
                      <Typography style={pageStyle.pageTitle} variant="h5">
                        {`${formsNumber} Supplier Order Form(s)`}
                      </Typography>
                    </Grid>
                  )}
                { loading ? (
                  <Grid style={{ textAlign: 'center', paddingTop: '50px' }}>
                    <Loader size={75} thickness={10} variant="determinate" />
                  </Grid>
                ) : '' }
                <Grid container style={{ ...pageStyle.forms }}>
                  {orderForms.map((orderForm, index) => (
                    <OrderCard
                      key={index}
                      orderForm={orderForm}
                      checked={checked}
                      check={this.check}
                    />
                  ))}
                </Grid>
                <Grid
                  style={pageStyle.paginate}
                  container
                  spacing={1}
                  direction="row"
                  justify="flex-end"
                  alignItems="center"
                >
                  <Typography variant="body2" style={{ fontSize: '1.1rem' }}>Records per page: </Typography>
                  <Typography style={pageStyle.spacingSmall} />
                  <Select
                    value={noPerPage}
                    onChange={this.changeNoPerPage}
                    margin="none"
                  >
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={24}>24</MenuItem>
                    <MenuItem value={48}>48</MenuItem>
                  </Select>
                  <Typography style={pageStyle.spacing} />
                  <Typography variant="body1">
                    { formsNumber ? first : 0 }
                    {'-'}
                    { last >= formsNumber ? formsNumber : last }
                    {' '}
                    of
                    {' '}
                    {formsNumber}
                  </Typography>
                  <Typography style={pageStyle.spacing} />
                  <IconButton
                    onClick={() => this.pagination(page - 1, noPerPage)}
                    disabled={page === 1}
                  >
                    {page !== 1
                      ? <Previous />
                      : <PreviousDisabled />}
                  </IconButton>
                  <Typography style={pageStyle.spacingSmall} />
                  <IconButton
                    onClick={() => this.pagination(page + 1, noPerPage)}
                    disabled={page === lastPage}
                  >
                    {page !== lastPage
                      ? <Next />
                      : <NextDisabled />}
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Modal
          openModal={openModal}
          text={modalText}
          handleCloseModal={this.closeModal}
          handleConfirm={() => this.handleConfirm(modalAction)}
        />
      </Fragment>
    );
  }
}

SupplierOrderForms.propTypes = {
  client: PropTypes.objectOf(PropTypes.any),
  placeOrder: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired
};

SupplierOrderForms.defaultProps = {
  client: {}
};

export default withAuth(compose(
  graphql(PLACE_ORDER, { name: 'placeOrder' }),
  graphql(CANCEL_ORDER, { name: 'cancelOrder' }),
)(withApollo(SupplierOrderForms)));
