import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import GET_ORDER_DETAILS from '../../queries/getOrderDetails';
import ContentLoader from './Template/Loader';
import OrdersList from './OrdersList';
import withAuth from '../../components/withAuth';

export const InitiatedOrder = ({ session }) => {
  const orderId = window.location.href.split('/')[5];

  return (
    <Query query={GET_ORDER_DETAILS} variables={{ id: orderId }}>
      {({ loading, data, error }) => {
        if (loading) return <ContentLoader />;
        if (error) return `Error! ${error.message}`;
        const { order } = data;
        return (
          <OrdersList
            session={session}
            order={order}
          />
        );
      }}
    </Query>
  );
};

InitiatedOrder.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      outlets: PropTypes.array,
    })
  }).isRequired
};

export default withAuth(InitiatedOrder);
