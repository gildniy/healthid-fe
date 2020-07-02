import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { GET_SINGLE_BUSINESS } from '../../../queries/businessQuery';
import ProductLoader from '../../products/shared/productLoader';
import MainBusinessView from '../business/mainBusinessSetupView';


const ManageSingleOutlet = ({
  session: { me: { businessUser: { id } } },
  session
}) => (
  <Query
    query={GET_SINGLE_BUSINESS}
    fetchPolicy="cache-and-network"
    partialRefetch
    variables={{ id }}
  >
    {({
      data: { business }, loading, error,
    }) => {
      if (loading) return <ProductLoader />;
      if (error) return <div>Error</div>;

      return (
        <MainBusinessView session={session} business={business} />
      );
    }}
  </Query>
);

ManageSingleOutlet.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      businessUser: PropTypes.shape({
        id: PropTypes.string
      })
    }).isRequired
  }).isRequired
};
ManageSingleOutlet.defaultProps = {

};


export default (withRouter(ManageSingleOutlet));
