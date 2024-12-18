import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Footer from './Templates/Footer';
import OrdersAndSuppliersNavBar from '../shared/LowerNavbar/OrdersAndSuppliersNavBar';
import withAuth from '../withAuth';
import DataTable from './Templates/Table/DataTable';
import DataTableLoader from '../dataTable/dataTableLoader';
import '../../assets/styles/stock/stock_products.scss';
import { GET_ALL_SUPPLIERS, FILTER_SUPPLIERS } from '../../queries/getSuppliers';
import { getSuppliers } from '../utils/filter';
import { StateContext } from '../../providers/stateProvider';

export class SuppliersPage extends Component {
  state = {
    status: undefined,
    currentPage: 0,
    currentPageCount: 50,
    isFiltering: false,
    currentSearchValue: true,
    searchText: '',
    filterType: 'status',
    isSearching: false,
    order: 'asc',
    orderBy: 'name',
    viewSingleSupplier: false,
    singleSupplier: '',
  };

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { match: { params: { status } } } = props;
    if (status !== state.status) {
      return {
        status,
        isFiltering: !!(status === 'approved' || status === 'proposed'),
        currentSearchValue: status !== 'proposed'
      };
    }
    return null;
  }

  createColumns = columns => columns.map(title => ({
    id: title.replace(/ +/g, ''),
    label: title.toUpperCase()
  }));

  handleViewProposed = (viewStatus) => {
    const { history } = this.props;
    const status = (viewStatus.approved && '/approved') || (viewStatus.proposed && '/proposed') || '';
    const statusRoute = (viewStatus.approved && viewStatus.proposed) ? '/all' : status;
    history.push(`/suppliers${statusRoute}`);
    this.setState({
      status, isFiltering: !(viewStatus.approved && viewStatus.proposed), currentSearchValue: status !== '/proposed', filterType: 'status'
    });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ currentPageCount: +event.target.value });
  };

  handleChangePage = (_, newPage) => {
    this.setState({ currentPage: newPage });
  };

  handleTextChange = (event) => {
    const { status, searchText } = this.state;
    const inputText = event.target.value;
    if (inputText !== searchText && inputText.length > 2) {
      this.setState({
        searchText: inputText,
        isFiltering: true,
        isSearching: true,
        filterType: 'search',
        currentSearchValue: searchText
      });
    } else {
      this.setState({
        searchText: inputText,
        currentSearchValue: status !== 'proposed',
        isFiltering: status !== 'all',
        isSearching: false,
        filterType: 'status'
      });
    }
  };

  handleRequestSort = (_, property) => {
    const { order, orderBy } = this.state;
    const isDesc = orderBy === property && order === 'desc';
    this.setState({ order: isDesc ? 'asc' : 'desc', orderBy: property });
  };

  static contextType = StateContext;

  render() {
    const { history, session, scrollStepInPx } = this.props;
    const {
      status,
      currentPage,
      currentPageCount,
      isFiltering,
      currentSearchValue,
      filterType,
      isSearching,
      order,
      searchText,
      orderBy,
    } = this.state;
    const columnHeaders = ['id', 'display name', 'tier', ' rating', 'notes'];
    const columnHeadersProposed = ['id', 'display name', 'tier', ' commentary'];
    return (
      <div>
        <OrdersAndSuppliersNavBar activeGrid="grid2" />
        {!isFiltering
          ? (
            <Query
              query={{
                ...GET_ALL_SUPPLIERS(currentPageCount, currentPage)
              }}
              fetchPolicy="cache-and-network"
            >
              { /* istanbul ignore next */
                ({ loading, data }) => {
                  if (loading) return <DataTableLoader />;
                  window.scroll(0, window.pageYOffset - scrollStepInPx);
                  const authUserId = session.me.id;
                  const suppliers = getSuppliers(data, isFiltering)
                    .filter(supplier => supplier.user.id === authUserId);
                  const isAuthorised = session.me.role.name.match(/^(Master Admin|Operations Admin)$/);
                  return (
                    <div name="stock_products">
                      <DataTable
                        title={`${status ? `${status[0].toUpperCase() + status.slice(1)} Supplier(s)` : 'Supplier(s)'}`}
                        isAdmin={Boolean(isAuthorised)}
                        columns={status === 'proposed' ? this.createColumns(columnHeadersProposed) : this.createColumns(columnHeaders)}
                        data={suppliers}
                        totalCount={(data ? data.totalSuppliersPagesCount : 1) * currentPageCount}
                        onRowClick={(rowId) => {
                          history.replace(`/suppliers/${rowId}/details`);
                        }}
                        handleViewProposed={this.handleViewProposed}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        status={status}
                        isFiltering={isFiltering}
                        rowsPerPage={currentPageCount}
                        page={currentPage}
                        order={order}
                        orderBy={orderBy}
                        handleRequestSort={this.handleRequestSort}
                        handleChangePage={this.handleChangePage}
                        handleTextChange={this.handleTextChange}
                        searchText={searchText}
                      />
                    </div>
                  );
                }
              }
            </Query>
          ) : (
            <Query
              query={{
                ...FILTER_SUPPLIERS(
                  filterType, currentSearchValue, currentPageCount, currentPage
                )
              }}
              fetchPolicy="cache-and-network"
            >
              {/* istanbul ignore next */
                ({ loading, data }) => {
                  const suppliers = getSuppliers(data, isFiltering);
                  let title = '';
                  if (loading) {
                    title = 'Loading...';
                  } else if (!isSearching) {
                    title = `${status ? `${status[0].toUpperCase() + status.slice(1)} Supplier(s)` : 'Supplier(s)'}`;
                  } else {
                    title = 'Supplier(s) Found';
                  }
                  const isAuthorised = session.me.role.name.match(/^(Master Admin|Operations Admin)$/);
                  const totalCount = (data && data.totalNumberOfSuppliers) || suppliers.length;

                  return (
                    <div name="stock_products">
                      <DataTable
                        title={title}
                        isAdmin={Boolean(isAuthorised)}
                        columns={status === 'proposed' ? this.createColumns(columnHeadersProposed) : this.createColumns(columnHeaders)}
                        data={suppliers}
                        totalCount={totalCount}
                        onRowClick={(rowId) => {
                          history.replace(`/suppliers/${rowId}/details`);
                        }}
                        loading={loading}
                        isFiltering={isFiltering}
                        handleViewProposed={this.handleViewProposed}
                        handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                        status={status}
                        handleRequestSort={this.handleRequestSort}
                        rowsPerPage={currentPageCount}
                        page={currentPage}
                        order={order}
                        orderBy={orderBy}
                        handleChangePage={this.handleChangePage}
                        handleTextChange={this.handleTextChange}
                        searchText={searchText}
                      />
                    </div>
                  );
                }}
            </Query>
          )
        }
        <Footer />
      </div>
    );
  }
}
SuppliersPage.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  scrollStepInPx: PropTypes.number.isRequired,
};
SuppliersPage.defaultProps = {
  session: { me: {} },
  history: {}
};
export default withAuth(withRouter(SuppliersPage));
