import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import { GET_FILTERED_CUSTOMERS } from '../../../queries/customersQuery';
import { CustomerSearchField } from '../../../components/sell/customerSearchField';
import { StateContext } from '../../../providers/stateProvider';

const contextValues = {
  state: { 
    sell: {
      name: '',
      searching: false
    },
  },
  dispatch: jest.fn()
};

describe('ViewProducts', () => {
  const mockClient = createMockClient();
  const returnHandler = jest.fn()
    .mockResolvedValue({ data: { filterCustomers: { edges: {} } } });
  mockClient.setRequestHandler(GET_FILTERED_CUSTOMERS, returnHandler);

  const wrapper = mount(
    <ApolloProvider client={mockClient}>
      <StateContext.Provider value={contextValues}>
        <CustomerSearchField />
      </StateContext.Provider>
    </ApolloProvider>
  );
  it('renders successfully', () => {
    expect(wrapper.find('ForwardRef(InputBase)').length).toBe(1);
  });
  it('handles onChange', () => {
    const event = { currentTarget : {}, target: { value: 'mimi'}}
    wrapper.find('ForwardRef(InputBase)').props().onChange(event)
    wrapper.update();
    expect(contextValues.dispatch).toHaveBeenCalled
  });
});