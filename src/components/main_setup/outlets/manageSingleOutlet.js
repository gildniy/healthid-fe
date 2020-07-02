import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { GET_SINGLE_OUTLET } from '../../../queries/outletsQuery';
import SingleOutletPage from './singleOutletPage';
import ProductLoader from '../../products/shared/productLoader';


const ManageSingleOutlet = ({
  match: { params: { id } },
}) => (
  <Query
    query={GET_SINGLE_OUTLET}
    fetchPolicy="cache-and-network"
    partialRefetch
    variables={{ id }}
  >
    {({
      data, loading, error, refetch
    }) => {
      if (loading) return <ProductLoader />;
      if (error) return <div>Error</div>;
      const { outlet } = data;
      return (
        <SingleOutletPage outlet={outlet} outletRefetch={refetch} />
      );
    }}
  </Query>
);

ManageSingleOutlet.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
ManageSingleOutlet.defaultProps = {

};


export default (withRouter(ManageSingleOutlet));
