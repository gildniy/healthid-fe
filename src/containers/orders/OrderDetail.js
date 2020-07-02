import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import GET_SUPPLIER_ORDER_FORM from '../../queries/getSupplierOrderForm';
import OrderDetailRender from '../../components/ordersAndSuppliers/orderDetailRender';
import withAuth from '../../components/withAuth';
import ProductLoader from '../../components/products/shared/productLoader';

import { useStateValue } from '../../providers/stateProvider';

export const OrderDetail = (props) => {
  const [, dispatch] = Object.values(useStateValue());
  const { match: { params: { supplierOrderId } }, session } = props;
  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }, []);

  return (
    <Query
      query={GET_SUPPLIER_ORDER_FORM}
      variables={{ supplierOrderId }}
      fetchPolicy="cache-and-network"
    >
      {({ data, loading, error }) => {
        if (loading) return <ProductLoader />;
        if (error) return <div>Error</div>;
        return (
          <OrderDetailRender
            session={session}
            receivedOrder={data.supplierOrderForm}
            supplierOrderId={supplierOrderId}
          />
        );
      }}
    </Query>
  );
};

OrderDetail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.objectOf(PropTypes.object)
};

OrderDetail.defaultProps = {
  session: {}
};

export default withAuth(withRouter(OrderDetail));
