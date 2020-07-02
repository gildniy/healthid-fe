import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import OrdersAndSuppliersNavBar from '../../components/shared/LowerNavbar/OrdersAndSuppliersNavBar';
import { TableStyles } from '../../assets/styles/stock/stock';
import { DataTable } from '../../components/ordersAndSuppliers/orders/OrdersData';
import { GET_OPEN_ORDERS } from '../../components/ordersAndSuppliers/queries/fetchOrdersQuery';
import DataTableLoader from '../../components/dataTable/dataTableLoader';

import { StateContext } from '../../providers/stateProvider';

export class OrdersAndSuppliers extends Component {
  lookUp = new Map([
    ['started-order', { selected: false, url: 'STARTED', reads: 'Initiated Orders' }],
    ['pending-approval', { selected: false, url: 'PENDING_APPROVAL', reads: 'Pending Approval' }],
    ['cancelled', { selected: false, url: 'CANCELLED', reads: 'Cancelled Orders' }],
    ['approved', { selected: false, url: 'APPROVED', reads: 'Approved Orders' }],
    ['pending-delivery', { selected: false, url: 'PENDING_DELIVERY', reads: 'Pending Delivery Orders' }],
    ['received', { selected: false, url: 'RECEIVED', reads: 'Received Orders' }],
    ['closed', { selected: false, url: 'CLOSED', reads: 'Closed Orders' }]
  ]);

  state = {
    isOrder: true,
    isLoading: true,
    openOrders: [],
    closedOrders: [],
    searchText: '',
    searchActive: false,
    searchResults: [],
    rowsCount: 50,
    pageNumber: 1,
    totalPages: 0,
    status: 'open',
    orderStatuses: this.lookUp
  };


  componentDidMount() {
    const { history: { location: { pathname } } } = this.props;
    const pathSplit = pathname.split('/');
    const { orderStatuses } = this.state;
    if (pathSplit.length === 3) {
      const status = orderStatuses.get(pathSplit[2]);
      if (status) {
        orderStatuses.set(pathSplit[2], { ...status, selected: true });
        this.setState({ orderStatuses });
      }
    }
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }

  handleMenuSwitch = (_, value) => {
    this.setState({ isOrder: !value });
  }

  handleViewOrders = (key, value) => {
    const { orderStatuses } = this.state;
    orderStatuses.forEach((oldValue, oldKey) => {
      orderStatuses.set(oldKey, { ...oldValue, selected: false });
    });
    orderStatuses.set(key, { ...value, selected: !value.selected });
    this.setState({ orderStatuses });
    const { history } = this.props;
    const path = (`/${!value.selected ? key : 'all'}`);
    history.push(`/orders${path}`);
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsCount: event.target.value });
  };

  handleChangePage = (_, newPage) => {
    this.setState({ pageNumber: newPage + 1 });
  };

  handleOnRowClick = (row) => {
    const { history } = this.props;
    const { id } = row;
    history.push(`/supplier-order/${id}`);
  }

  static contextType = StateContext;

  render() {
    const { history, match: { params: { status: readableStatus } }, session } = this.props;
    const classes = TableStyles;
    const {
      isOrder, openOrders, closedOrders,
      rowsCount,
      pageNumber,
      orderStatuses
    } = this.state;
    let status = orderStatuses.get(readableStatus);
    if (!status) {
      status = { url: 'ALL' };
    }
    return (
      <Query
        query={GET_OPEN_ORDERS}
        fetchPolicy="cache-and-network"
        variables={{
          status: status.url,
          pageCount: rowsCount,
          pageNumber,
        }}
      >
        {({ loading, data, error }) => {
          if (loading) return <DataTableLoader />;
          if (error) return `Error: ${error.message}`;

          const { supplierOrdersSortedByStatus: orders } = data;
          const title = `${orders && orders.length} ${readableStatus.replace('-', ' ')} ${readableStatus.includes('order') ? '(s)' : 'order(s)'}`;
          const bodyContent = isOrder ? (
            <DataTable
              title={title}
              classes={classes}
              data={orders}
              onRowClick={this.handleOnRowClick}
              handleSearch={this.handleSearch}
              handleViewOrders={this.handleViewOrders}
              handleChangeRowsPerPage={this.handleChangeRowsPerPage}
              status={status}
              totalCount={data ? data.totalOrdersPagesCount * rowsCount : ''}
              handleRequestSort={this.handleRequestSort}
              rowsCount={rowsCount}
              pageNumber={pageNumber}
              handleChangePage={this.handleChangePage}
              handleTextChange={this.handleTextChange}
              session={session}
              openOrders={openOrders}
              closedOrders={closedOrders}
              isLoading={loading}
              orderStatuses={orderStatuses}
              history={history}
            />
          ) : (<div>Orders</div>);
          return (
            <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
              <OrdersAndSuppliersNavBar activeGrid="grid1" />
              {
                (bodyContent)
              }
            </div>
          );
        }}
      </Query>
    );
  }
}

OrdersAndSuppliers.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

OrdersAndSuppliers.defaultProps = {
  history: {},
  session: { me: {} },
};

export default withRouter(OrdersAndSuppliers);
