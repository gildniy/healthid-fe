import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { GET_SALE_HISTORY } from '../queries/salesHistoryQuery';
import SaleHistoryDetail from '../components/sell/salesHistory/salesHistoryDetail';
import withAuth from '../components/withAuth';
import ProductLoader from '../components/products/shared/productLoader';
import { useStateValue } from '../providers/stateProvider';

export const SaleHistoryDetailContainer = (props) => {
  const { match: { params: { id } } } = props;

  const [{
    saleHistory: {
      salesData
    }
  }] = Object.values(useStateValue());
  const TotalSaleIds = salesData && salesData.map(saleData => (
    saleData.id
  ));

  return (
    <Query query={GET_SALE_HISTORY} variables={{ saleId: id }}>
      {({ data, loading, error }) => {
        if (loading) return <ProductLoader />;
        if (error) {
          return <div error={error} name="error">Error</div>;
        }
        const saledetailSet = [...data.saleHistory.saledetailSet];
        return (
          <SaleHistoryDetail
            saleHistory={data.saleHistory}
            saledetailSet={saledetailSet}
            TotalSaleIds={TotalSaleIds}
            currentSaleId={Number(id)}
          />
        );
      }}
    </Query>
  );
};

SaleHistoryDetailContainer.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};

export default withAuth(withRouter(SaleHistoryDetailContainer));
