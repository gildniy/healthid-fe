import React, { Component, Fragment } from 'react';
import PropTypes, { object } from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import {
  Paper, Grid, Button, Typography
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import {
  MainBusinessSetUpStyles, SetupHeader, BusinessSetUpStyles
} from '../../assets/styles/setup';
import { OrdersListStyles } from '../../assets/styles/orders/order';
import DataTable from './Table/DataTable';
import Footer from '../../components/shared/Footer';
import EditOrderDetails from './editOrderDetails';
import notify from '../../components/shared/Toaster';
import CANCEL_ORDER from '../../mutations/cancelOrder';

import { StateContext } from '../../providers/stateProvider';
import GENERATE_ORDER from '../../mutations/generateOrder';

export class OrdersList extends Component {
  state = {
    columns: ['name', 'sku', 'qty in stock', 'qty ordered', 'supplier'],
  };

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }

  createColumnHeaders = columns => columns.map(item => ({
    id: item.replace(/ +/g, ''),
    label: item.toUpperCase()
  }));

  handleDelete = () => {
    const { cancelOrder, history } = this.props;
    const orderId = window.location.href.split('/')[5];
    cancelOrder({
      variables: {
        supplierOrderIds: [{ orderId }]
      }
    }).then(() => {
      notify('Initiated order deleted');
      setTimeout(() => history.push('/orders/initiate'), 2000);
    }).catch((error) => {
      notify(error.message);
    });
  };

  handleSubmit = () => {
    const { generateOrder, history } = this.props;
    const orderId = window.location.href.split('/')[5];
    generateOrder({
      variables: {
        orderID: orderId
      }
    }).then(() => {
      notify('Order generated successfully');
      setTimeout(() => history.push('/orders/forms'), 2000);
    }).catch((error) => {
      notify(error.message);
    });
  };

  static contextType = StateContext;

  render() {
    const { session, order } = this.props;
    const { columns } = this.state;
    const orderId = window.location.href.split('/')[5];
    const { orderItems } = order;
    const generateButtonStyle = orderItems.length
      ? SetupHeader.saveButton
      : SetupHeader.disabledSaveButton;

    return (
      <Fragment>
        <Grid style={SetupHeader.adjust}>
          <Grid item xs={1} style={SetupHeader.orderBackBox}>
            <Button style={SetupHeader.backButton}>
              <Link to="/orders/initiate" style={SetupHeader.link}>
                <ArrowBack style={SetupHeader.arrowSize} />
              </Link>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={10} style={SetupHeader.wrapper}>
          <Grid style={MainBusinessSetUpStyles.profileHeader}>
            <Typography variant="h5" style={SetupHeader.backText}>
              Back
            </Typography>
            <Grid style={SetupHeader.orderButtonContainer}>
              <Button style={SetupHeader.addButton} onClick={this.handleDelete}>
                Delete
              </Button>
              <Button
                style={generateButtonStyle}
                onClick={this.handleSubmit}
                disabled={!orderItems.length}
              >
                Generate
              </Button>
            </Grid>
          </Grid>
          <Paper elevation={2}>
            <Grid item style={BusinessSetUpStyles.contentHeader}>
              <Typography variant="h6">
                Generate Order Form
              </Typography>
            </Grid>
            <Grid style={OrdersListStyles.orderHeader}>
              <Grid container justify="space-between">
                <Grid item>
                  <Typography variant="h5" style={OrdersListStyles.title}>{ order.name }</Typography>
                </Grid>
                <Grid item style={OrdersListStyles.editButton}>
                  <EditOrderDetails
                    session={session}
                    orderDetails={order}
                    orderId={orderId}
                    outlet={order.destinationOutlet}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Typography style={OrdersListStyles.orderId}>{ order.orderNumber }</Typography>
              </Grid>
              <Grid style={OrdersListStyles.subContainer}>
                <Grid container>
                  <Grid>
                    <Typography style={OrdersListStyles.subTitle}>Deliver To: </Typography>
                    {' '}
                  </Grid>
                  <Grid>
                    <Typography
                      style={OrdersListStyles.value}
                    >
                      { order.destinationOutlet.name }
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid>
                    <Typography style={OrdersListStyles.subTitle}>Delivery Due: </Typography>
                    {' '}
                  </Grid>
                  <Grid>
                    <Typography style={OrdersListStyles.value}>{ order.deliveryDate }</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <DataTable
              columnHeaders={this.createColumnHeaders(columns)}
              data={orderItems}
              orderId={orderId}
            />
          </Paper>
        </Grid>
        <Footer />
      </Fragment>
    );
  }
}

OrdersList.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      businessUser: PropTypes.instanceOf(object),
      outlets: PropTypes.array,
    })
  }),
  order: PropTypes.instanceOf(Object),
  cancelOrder: PropTypes.func.isRequired,
  generateOrder: PropTypes.func.isRequired,
  history: PropTypes.func.isRequired,
};

OrdersList.defaultProps = {
  session: {},
  order: {},
};

const DELETE_INITIATED_MUTATION = graphql(CANCEL_ORDER, { name: 'cancelOrder' });
const GENERATE_ORDER_MUTATION = graphql(GENERATE_ORDER, { name: 'generateOrder' });

export default compose(DELETE_INITIATED_MUTATION, GENERATE_ORDER_MUTATION)(withRouter(OrdersList));
