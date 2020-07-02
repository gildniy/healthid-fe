import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { GET_PRODUCT_BY_ID } from '../../queries/productsQueries/productQueries';
import ApproveProduct from '../../components/products/approveProduct';
import ProductLoader from '../../components/products/shared/productLoader';
import withAuth from '../../components/withAuth';

export const ApproveProductDetail = (props) => {
  const {
    match: {
      params: { id }
    },
    session
  } = props;
  if (session && session.me.role.name !== 'Master Admin') {
    return <Redirect to="/orders" />;
  }
  return (
    <Query query={GET_PRODUCT_BY_ID} variables={{ id }}>
      {({ data, loading, error }) => (
        (loading && <ProductLoader />)
          || (error && <div>Error</div>) || (
          <ApproveProduct product={data.product} session={session} />
        )
      )}
    </Query>
  );
};

ApproveProductDetail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.objectOf(PropTypes.object)
};

ApproveProductDetail.defaultProps = {
  session: {}
};

export default withAuth(withRouter(ApproveProductDetail));
