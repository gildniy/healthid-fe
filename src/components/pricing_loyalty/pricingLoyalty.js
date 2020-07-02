import React, { Fragment, Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  GET_APPROVED_PRODUCTS, SEARCH_PRODUCTS
} from '../../queries/productsQueries/productQueries';
import ProductNavBar from '../products/shared/productNavBar';
import withAuth from '../withAuth';
import DataTable from './Table/DataTable';
import DataTableLoader from '../dataTable/dataTableLoader';
import '../../assets/styles/pricingLoyalty/pricing_loyalty.scss';
import { getProducts } from '../products/filter';

import { StateContext } from '../../providers/stateProvider';

export class PricingLoyalty extends Component {
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

  getFilteredProductsPricing = (products) => {
    const productsList = products.map(({
      productName, productCategory, productbatchSet, skuNumber, description,
      vatStatus, salesPrice, id, loyaltyWeight, tags, markup
    }) => {
      const latestDate = productbatchSet.map(batch => batch.dateReceived).sort().slice(-1)[0];
      const latestBatch = productbatchSet.filter(batch => batch.dateReceived === latestDate);
      const batchUnitCost = productbatchSet.map(batch => batch.unitCost);
      return (
        {
          id,
          productName,
          category: productCategory.name,
          skuNumber,
          description,
          unitCost: latestBatch.length > 0 ? latestBatch[0].unitCost : 0,
          grossMargin: Math.round((1 - (batchUnitCost[0] / salesPrice)) * 100) || 0,
          markup,
          vatStatus: vatStatus.toString(),
          salesPrice,
          loyaltyWeight,
          tags,
        }
      );
    });
    return productsList;
  };

  static contextType = StateContext;

  render() {
    const {
      currentPage, currentPageCount, searchResults, searchActive, searchText, isSearching
    } = this.state;
    const { history, session } = this.props;
    const columnHeaders = [
      'product name', 'sku', ' sale price', 'markup', 'latest batch unit cost',
      'gross margin', 'category', 'loyalty wgt', 'vat status'
    ];
    return (
      <Fragment>
        <ProductNavBar activeGrid="grid3" />
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
            loading, data, error, refetch, client
          }) => {
            if (loading) return <DataTableLoader />;
            if (error) return `Error! ${error.message}`;
            let {
              approvedProducts = {}, productsTotalNumber = 0
            } = data || { };

            if (searchResults && searchActive && searchText.length > 2) {
              approvedProducts = searchResults;
              productsTotalNumber = searchResults.length;
            }

            const products = this.getFilteredProductsPricing(approvedProducts);

            const isAuthorized = session.me.role.name.match(/(Master Admin|Operations Admin)/);

            return (
              <DataTable
                title="Products"
                isAdmin={!!isAuthorized}
                columns={this.createColumns(columnHeaders)}
                data={products}
                state={this.state}
                productRefetch={refetch}
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
            );
          }}
        </Query>
      </Fragment>
    );
  }
}

PricingLoyalty.propTypes = {
  session: PropTypes.objectOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number])
};

PricingLoyalty.defaultProps = {
  session: {},
  history: {}
};

export default withAuth(withRouter(PricingLoyalty));
