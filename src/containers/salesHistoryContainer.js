import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import GET_SALES_HISTORY from '../queries/salesHistoryQuery';
import SalesHistory from './salesHistory';
import withAuth from '../components/withAuth';
import DataTableLoader from '../components/dataTable/dataTableLoader';

import { useStateValue } from '../providers/stateProvider';

export const SaleHistoryContainer = ({ session }) => {
  const [{
    saleHistory: {
      currentPage, currentPageCount, startDate, endDate, search
    }
  }] = Object.values(useStateValue());
  const { id } = session.me.outlets[0];
  const currency = session.me.activeOutlet
    && session.me.activeOutlet.outletpreference.outletCurrency.symbol;

  return (
    <Query
      query={GET_SALES_HISTORY}
      fetchPolicy="cache-and-network"
      variables={{
        id,
        search,
        dateFrom: startDate,
        dateTo: endDate,
        pageCount: currentPageCount,
        pageNumber: currentPage
      }}
    >
      {({ data, loading, error }) => {
        if (loading) return <DataTableLoader />;
        if (error) return <div id="error">{`Error: ${error.message}`}</div>;
        return (
          <SalesHistory
            currency={currency}
            outletSalesData={data}
          />
        );
      }}
    </Query>
  );
};

SaleHistoryContainer.propTypes = {
  session: PropTypes.objectOf(PropTypes.any)
};

SaleHistoryContainer.defaultProps = {
  session: {}
};

export default withAuth(withRouter(SaleHistoryContainer));
