import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { createSaleUpdateFunc } from './updateFunctions';

const getPending = () => JSON.parse(localStorage.getItem('MUTATIONS')) || [];

const setPending = (mutations) => {
  localStorage.setItem('MUTATIONS', JSON.stringify(mutations));
};

// Delegate incoming responses to the correct update function
const updateHandler = (resp) => {
  // Need one of these for every custom update function!
  if (resp.data.createSale) return createSaleUpdateFunc;
  return () => { };
};

// Return dummy update function scoped to a request with a specific id
const proxyUpdateForId = id => (proxy, resp) => {
  updateHandler(resp)(proxy, resp);
  if (resp.data.__optimistic) return;
  setPending(getPending().filter(mutation => mutation.id !== id));
};

// The main component wrapper
const OfflineMutation = props => (
  <Mutation {...props}>
    {mutationFunction => (
      props.children((params) => {
        const id = Math.random();
        const { mutation } = props;
        params.optimisticResponse.__optimistic = true;
        setPending(getPending().concat({ id, params, mutation }));
        params.update = proxyUpdateForId(id);
        return mutationFunction(params);
      })
    )}
  </Mutation>
);

OfflineMutation.propTypes = {
  children: PropTypes.instanceOf(Object),
  mutation: PropTypes.instanceOf(Object)
};

OfflineMutation.defaultProps = {
  children: {},
  mutation: {}
};

// Restore pending requests after a refresh
export const restoreRequests = (client) => {
  getPending()
    .forEach((pendingMutation) => {
      const { id, params, mutation } = pendingMutation;
      params.optimisticResponse.__optimistic = true;
      params.update = proxyUpdateForId(id);
      params.mutation = mutation;
      client.mutate(params);
    });
};

export default OfflineMutation;
