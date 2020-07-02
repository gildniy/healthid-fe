import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Grid, Paper, Button, Typography, TextField,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { compose, graphql } from 'react-apollo';
import withStyles from '@material-ui/core/styles/withStyles';
import { MainBusinessSetUpStyles as styles, SetupHeader } from '../../../assets/styles/setup';
import supplierOrderStyles from '../../../assets/styles/orders/supplierOrderForm';
import OrderTable from './OrderTable';
import OrderInfo from './OrderInfo';
import { orderDescriptionStyles } from '../../../assets/styles/orders/orderDescriptionStyles';
import ADD_ORDER_NOTES from '../../../mutations/addOrderNotesMutation';
import PLACE_ORDER from '../../../mutations/placeOrder';
import CANCEL_ORDER from '../../../mutations/cancelOrder';
import notify from '../../shared/Toaster';

export class SupplierOrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = { placing: false, cancelling: false, lock: true };
  }

  componentDidMount() {
    const { orderDetails, history, additionalNotes } = this.props;
    const { order: { sentStatus } } = orderDetails[0];
    if (sentStatus) return history.push('/orders/open');
    this.setState({ additionalNotes });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  placeOrder = async () => {
    const {
      placeOrder, history, supplierOrderId
    } = this.props;
    try {
      this.setState({ placing: true });
      await placeOrder({
        variables: {
          supplierOrderIds: [supplierOrderId]
        }
      }).then(
        ({ data: { placeOrder: { mailMessage } } }) => {
          notify(mailMessage);
          history.push('/orders/forms');
        },
      );
    } catch (error) {
      notify('Error while placing order');
    } finally {
      this.setState({ placing: false });
    }
  };

  cancelOrder = async () => {
    const {
      cancelOrder, history, supplierOrderId
    } = this.props;
    try {
      this.setState({ cancelling: true });
      await cancelOrder({
        variables: {
          supplierOrderIds: [supplierOrderId]
        }
      });
      history.push('/orders/forms');
    } catch (error) {
      notify('Error while cancelling order');
    } finally {
      this.setState({ cancelling: false });
    }
  };

  handleNotesClick = () => {
    this.setState({ lock: false });
  };

  saveOrderNotes = async () => {
    const {
      addOrderNotes, supplierOrderId
    } = this.props;
    const { additionalNotes } = this.state;
    try {
      await addOrderNotes({ variables: { additionalNotes, supplierOrderId } });
      this.setState({ lock: true });
      notify('Notes saved successfully');
    } catch (error) {
      notify('Error saving note');
    }
  };

  render() {
    const {
      placing, cancelling, lock, additionalNotes,
    } = this.state;
    const { classes, orderDetails } = this.props;
    const {
      deliveryDue, paymentDue,
      order: { name: orderName, orderNumber, destinationOutlet },
      supplier: { name: supplierName, suppliersmetaSet }
    } = orderDetails[0];

    return (
      <Fragment>
        <Grid container style={styles.container}>
          <Grid item xs={1} style={SetupHeader.backBox}>
            <Button style={SetupHeader.backButton}>
              <Link to="/orders/forms" style={SetupHeader.link}>
                <ArrowBack fontSize="large" />
              </Link>
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Grid style={styles.profileHeader}>
              <Typography variant="h5">
                Back
              </Typography>
              <Typography>
                <Button
                  style={{ ...supplierOrderStyles.btnCommon, ...supplierOrderStyles.btnCancel }}
                  onClick={this.cancelOrder}
                >
                  {cancelling ? 'SUBMITTING...' : 'CANCEL ORDER'}
                </Button>
                <Button
                  onClick={this.placeOrder}
                  variant="contained"
                  color="secondary"
                  style={{
                    ...supplierOrderStyles.btnCommon, ...supplierOrderStyles.btnPlace
                  }}
                >
                  {placing ? 'SUBMITTING...' : 'PLACE ORDER' }
                </Button>
              </Typography>
            </Grid>
            <Paper elevation={2} style={{ ...styles.paper, ...supplierOrderStyles.paperStyles }}>
              <Grid>
                <Grid style={{ ...styles.contentHeader }}>
                  <Typography variant="h5">
                    Supplier Order Form
                  </Typography>
                </Grid>
              </Grid>
              <Grid style={supplierOrderStyles.orderInfoCover}>
                <Typography className={classes.orderName}>
                  {`${supplierName}-${orderName}`}
                </Typography>
                <Typography className={classes.orderID}>
                  {orderNumber.toUpperCase()}
                </Typography>
                <OrderInfo {...{
                  classes, paymentDue, destinationOutlet, deliveryDue, suppliersmetaSet
                }}
                />
              </Grid>
              <OrderTable
                currency="₦"
                orderDetails={orderDetails}
              />
              <Grid style={supplierOrderStyles.notesContainer} container>
                <Grid style={supplierOrderStyles.notesLabel} container>
                  <span>Notes</span>
                  <Button style={{
                    ...SetupHeader.backButton, padding: '0px', minWidth: '40px', minHeight: '40px'
                  }}
                  >
                    <CheckIcon size="large" name="saveNote" onClick={this.saveOrderNotes} />
                  </Button>
                </Grid>
                <TextField
                  InputProps={{
                    disableUnderline: true
                  }}
                  value={additionalNotes}
                  disabled={lock}
                  onClick={this.handleNotesClick}
                  onChange={this.handleChange}
                  name="additionalNotes"
                  fullWidth
                  multiline
                  rows={10}
                  style={supplierOrderStyles.notesField}
                />
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

SupplierOrderForm.propTypes = {
  history: PropTypes.instanceOf(Object),
  placeOrder: PropTypes.func.isRequired,
  cancelOrder: PropTypes.func.isRequired,
  classes: PropTypes.instanceOf(Object),
  addOrderNotes: PropTypes.func.isRequired,
  orderDetails: PropTypes.instanceOf(Object),
  supplierOrderId: PropTypes.string.isRequired,
  additionalNotes: PropTypes.string
};
SupplierOrderForm.defaultProps = {
  history: { },
  classes: { },
  orderDetails: {},
  additionalNotes: ''
};

const PLACE_ORDER_MUTATION = graphql(PLACE_ORDER, { name: 'placeOrder' });
const CANCEL_ORDER_MUTATION = graphql(CANCEL_ORDER, { name: 'cancelOrder' });
const ADD_ORDER_NOTES_MUTATION = graphql(ADD_ORDER_NOTES, { name: 'addOrderNotes' });
export default withStyles(orderDescriptionStyles)(
  compose(
    PLACE_ORDER_MUTATION,
    CANCEL_ORDER_MUTATION,
    ADD_ORDER_NOTES_MUTATION
  )(SupplierOrderForm)
);
