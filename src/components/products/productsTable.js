import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { columns } from './Templates/Table/Colums';
import { SEARCH_PRODUCTS, GET_PRODUCTS } from '../../queries/productsQueries/productQueries';
import { ProductsStyles } from '../../assets/styles/products/products';
import DataTableLoader from '../dataTable/dataTableLoader';
import withProductSearch from './shared/ProductSearch';
import DataTable from './Templates/Table/DataTable';
import { getProducts } from './filter';
import notify from '../shared/Toaster';

export class Products extends Component {
  state = {
    searchText: '',
    searchActive: false,
    searchResults: [],
    totalPages: 0,
    status: 'approved',
    currentPage: 1,
    currentPageCount: 50,
    isSearching: false
  }

  static getDerivedStateFromProps(props, state) {
    const { match: { params: { status } } } = props;
    if (status !== state.status) {
      return { status: status || 'approved' };
    }
    return null;
  }

  handleViewProposed = (status) => {
    const { history } = this.props;
    history.push(`/products/${status}`);
  }

  handleSearch = async ({ target: { value: searchText } }, client) => {
    this.setState({ searchText });
    if (searchText && searchText.length > 2) {
      const { currentPage, currentPageCount } = this.state;
      this.setState({ isSearching: true });
      client.query({
        query: SEARCH_PRODUCTS,
        variables: {
          searchValue: searchText,
          pageCount: currentPageCount,
          pageNumber: currentPage
        }
      }).then(({ data }) => {
        this.setState({ isSearching: false });
        const { status } = this.state;
        this.setState({ searchResults: getProducts(data, 'search', (status === 'approved')), searchActive: true });
      }).catch((error) => {
        notify(`Something went wrong ${error}`);
        this.setState({ searchActive: false, isSearching: false });
      });
    } else if (!searchText) {
      this.setState({ searchActive: false });
    }
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ currentPageCount: +event.target.value });
  };

  handleChangePage = (_, newPage) => {
    this.setState({ currentPage: newPage + 1 });
  };

  handleOnRowClick = (id) => {
    const { session } = this.props;
    const { name: role } = session.me.role;
    const { history, match: { params: { status: statusCheck } } } = this.props;
    if (statusCheck === 'proposed-edits') {
      return history.push(`/products/proposed-edits/${id}`);
    }
    if (statusCheck !== 'approved' && role === 'Master Admin') {
      return history.push(`/products/${id}/approve`);
    }
    return history.push(`/products/${id}/details`);
  }

  render() {
    const {
      searchResults,
      searchActive,
      status,
      currentPage,
      currentPageCount,
      searchText,
      isSearching
    } = this.state;
    const { session, location: { pathname } } = this.props;

    return (
      <Query
        query={GET_PRODUCTS(status)}
        fetchPolicy="cache-and-network"
        skip={searchResults && searchActive && searchText.length > 2}
        variables={
          {
            pageCount: currentPageCount,
            pageNumber: currentPage
          }
        }
      >
        {({ loading, data, client }) => {
          if (loading) return <DataTableLoader />;
          let products = getProducts(data, status);
          let productCount = data
            ? `${data.productsTotalNumber}`
            : 0;

          if (searchResults && searchActive && searchText.length > 2) {
            products = searchResults;
            productCount = products.length;
          }
          return (
            <div>
              <DataTable
                title={`${productCount} products`}
                data={products}
                state={this.state}
                onRowClick={this.handleOnRowClick}
                loading={loading}
                handleSearch={e => this.handleSearch(e, client)}
                isSearching={isSearching}
                handleViewProposed={this.handleViewProposed}
                currentPath={pathname}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                status={status}
                totalCount={productCount}
                handleRequestSort={this.handleRequestSort}
                page={currentPage}
                columns={columns}
                handleChangePage={this.handleChangePage}
                session={session}
                rowsPerPage={currentPageCount}
              />
            </div>
          );
        }
        }
      </Query>
    );
  }
}

Products.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  location: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

Products.defaultProps = {
  session: { me: {} },
  location: {},
  history: {},
};

export default withProductSearch(withStyles(ProductsStyles)(withRouter(Products)));
