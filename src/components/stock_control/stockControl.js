import React, { Fragment, Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GET_APPROVED_PRODUCTS, SEARCH_PRODUCTS } from '../../queries/productsQueries/productQueries';
import ProductNavBar from '../products/shared/productNavBar';
import withAuth from '../withAuth';
import DataTable from './Table/DataTable';
import DataTableLoader from '../dataTable/dataTableLoader';
import '../../assets/styles/stock/stock_products.scss';
import { getProducts } from '../products/filter';

import { StateContext } from '../../providers/stateProvider';

export class StockControl extends Component {
  state = {
    searchText: '',
    searchActive: false,
    searchResults: [],
    totalPages: 0,
    currentPage: 1,
    currentPageCount: 50,
    isSearching: false
  }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({ currentPageCount: +event.target.value });
  };

  handleChangePage = (_, newPage) => {
    this.setState({ currentPage: newPage + 1 });
  };

  createColumns = columns => columns.map(title => ({
    id: title.replace(/ +/g, ''),
    label: title.toUpperCase()
  }));

  handleSearch = async ({ target: { value: searchText } }, client) => {
    this.setState({ searchText });
    if (searchText && searchText.length > 2) {
      this.setState({ isSearching: true });
      const { data } = await client.query({
        query: SEARCH_PRODUCTS,
        variables: { searchValue: searchText }
      });
      this.setState({ isSearching: false });
      await this.setState({ searchResults: getProducts(data, 'search', true), searchActive: true });
    } else if (!searchText) {
      await this.setState({ searchActive: false });
    }
  };

  static contextType = StateContext;

  render() {
    const {
      searchResults,
      searchActive,
      currentPage,
      currentPageCount,
      searchText,
      isSearching
    } = this.state;
    const { history, session } = this.props;
    const columnHeaders = ['id', 'name', 'sku', ' dispensing size', 'qty in stock'];
    return (
      <Fragment>
        <ProductNavBar activeGrid="grid4" />
        <Query
          query={GET_APPROVED_PRODUCTS}
          fetchPolicy="cache-and-network"
          skip={searchResults && searchActive && searchText.length > 2}
          variables={{
            pageCount: currentPageCount,
            pageNumber: currentPage
          }}
        >
          {({
            loading, data, networkStatus, error, client
          }) => {
            if (loading && networkStatus !== 6) return <DataTableLoader />;
            if (error) return `Error! ${error.message}`;
            let {
              approvedProducts = {}, productsTotalNumber = 0
            } = data || {};
            if (searchResults && searchActive && searchText.length > 2) {
              approvedProducts = searchResults;
              productsTotalNumber = approvedProducts.length;
            }

            const products = approvedProducts.map(product => ({
              id: product.id,
              name: product.productName,
              quantity: product.quantityInStock,
              sku: product.skuNumber,
              dispensingSize: product.dispensingSize ? product.dispensingSize.name : 'Not available',
              description: product.description,
              image: product.image,
              tags: product.tags,
              batchId: product.batchInfo
            })).filter(product => product !== false);

            const isAuthorized = session.me.role.name.match(/(Master Admin|Operations Admin)/);

            return (
              <div name="stock_products">
                <DataTable
                  title="Products"
                  isAdmin={!!isAuthorized}
                  columns={this.createColumns(columnHeaders)}
                  data={products}
                  state={this.state}
                  totalCount={productsTotalNumber}
                  rowsPerPage={currentPageCount}
                  page={currentPage}
                  handleChangePage={this.handleChangePage}
                  handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                  handleSearch={e => this.handleSearch(e, client)}
                  isSearching={isSearching}
                  onRowClick={(rowId) => {
                    history.push(`products/${rowId}/details`);
                  }}
                />
              </div>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

StockControl.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
};

StockControl.defaultProps = {
  session: {},
  history: {}
};

export default withAuth(withRouter(StockControl));
