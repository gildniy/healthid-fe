import React from 'react';
import { mount, shallow } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import moment from 'moment';
import { StateContext } from '../../../providers/stateProvider';
import * as AppContext from '../../../providers/stateProvider';
import { GET_SALES_PERFORMANCES } from '../../../queries/dashboard/salesPerformancesQuery';
import { Dashboard } from '../../../components/dashboard/dashboard';
import MockComponent from '../../../../__mocks__/mockComponent';

const resolvedData = {
  data: {
    salePerformances: {
      edges: [{
        node: {
          id: "wZToz",
          transactionDate: "2020-04-10T10:40:44.061499+00:00",
          subtotal: 13060,
          quantitySold: 4,
          product: {
            id: "14",
            productName: "Amoksiclav 625Mg  625MG",
            image: "",
            quantityInStock: 93
          }
        }
      }]
    }
  }
}
const props = {
  classes: { },
  session: { me: { activeOutlet: { id: 1, outletpreference: { outletCurrency: '₦' } } } }
};

const context = ['kitty', jest.fn()];

jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => context);

describe('dashboard ', () => {
  const mockClient = createMockClient();
  const variables = {
    outlets: [1],
    dateFrom: moment().startOf('date'),
    dateTo: moment().endOf('date'),
  }
  const returnHandler = jest.fn().mockResolvedValue({ ...resolvedData });
  mockClient.setRequestHandler(GET_SALES_PERFORMANCES, returnHandler);

  const wrapper = mount(
    <ApolloProvider client={mockClient}>
      <Dashboard {...props} />
    </ApolloProvider>
  );
  it('renders without error', () => {
    expect(returnHandler).toBeCalledWith(variables);
  });
});

describe('dashboard Errors', () => {
  const mockClient = createMockClient();
  mockClient.setRequestHandler(
    GET_SALES_PERFORMANCES,
    () => Promise.resolve({ errors: [{ message: 'GraphQL Error' }] })
  );

  const wrapper = mount(
    <ApolloProvider client={mockClient}>
      <Dashboard {...props} />
    </ApolloProvider>
  );
  it('renders errors', () => {
    expect(wrapper.find('SalesPerformanceLoader').length).toEqual(1);
  });
});
