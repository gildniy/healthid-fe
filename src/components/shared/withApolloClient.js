import React from 'react';
import { ApolloConsumer } from 'react-apollo';

const withApolloClient = Component => props => (
  <ApolloConsumer>
    {(client) => {
      const mergedProps = { client, ...props };

      return (
        <Component {...mergedProps} />
      );
    }}
  </ApolloConsumer>
);

export default withApolloClient;
