import React from 'react';
import { mount } from 'enzyme';
import wait from 'waait';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import PropTypes from 'prop-types';
import MockComponent from '../../../../__mocks__/mockComponent';
import GET_SUPPLIER_ORDER_FORM from '../../../queries/getSupplierOrderForm';
import { OrderFormRender } from '../../../containers/orders/renderOrderForm';
import { StateContext } from '../../../providers/stateProvider';

const context = ['kitty', jest.fn()];

OrderFormRender.contextTypes = [
  PropTypes.string,
  PropTypes.func
];
jest.mock('../../../components/ordersAndSuppliers/orders/SupplierOrderForm', () => MockComponent);

const props = {
  match: {
    params: {
      orderId: 12,
      supplierId: '12abc-xt'
    }
  },
  history: { push: jest.fn() },
  session: {
    me: {
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: 'Africa/Nairobi'
          }
        }
      }
    }
  }
};
let wrapper;
const mocks = {
  data: {
    supplierOrderForm: {
      orderId: 36,
      supplierId: "d71cdlj8u",
      orderItems: [{
        id: "5o786aev2",
        quantity: 12,
        unitCost: 0,
        status: "PENDING_ORDER",
        order: {
          id: "36",
          name: "21 April 2020 02:45PM",
          orderNumber: "2h2om9q7h",
          sentStatus: false,
          destinationOutlet: {
            id: "7",
            name: "Kibuli Branch",
            addressLine1: null,
            city: {
              id: "1",
              name: "Kampala",
              country: {
                id: "4",
                name: "Algeria"
              }
            }
          },
          deliveryDate: "2020-04-21"
        },
        product: {
          id: "11", productName: "Emvite Syrup 100ML"
        },
        supplier: {
          id: "d71cdlj8u",
          name: "Party solutions",
          suppliersmetaSet: [{ id: "9", creditDays: 0, paymentTerms: "CASH_ON_DELIVERY"}]
        }
      }],
    }
  }
};
describe('renders OrderFormRender component ', () => {
  beforeEach(async () => {
    const mockClient = createMockClient();

    mockClient.setRequestHandler(
      GET_SUPPLIER_ORDER_FORM,
      () => Promise.resolve(mocks)
    );

    wrapper = mount(
      <ApolloProvider client={mockClient}>
        <StateContext.Provider value={context}>
          <OrderFormRender {...props} />
        </StateContext.Provider>
      </ApolloProvider>
    );
  });
  it('should render without error', async () => {
    wrapper.update()
    const mockedDiv = wrapper.update().find('div');
    expect(mockedDiv.length).toBe(1);
  });

  it('should handle error', async () => {
    const newMockClient = createMockClient();

    newMockClient.setRequestHandler(
      GET_SUPPLIER_ORDER_FORM,
      () => Promise.resolve({ error: new Error('Graphql Error') })
    );
    const newWrapper = mount(
      <ApolloProvider client={newMockClient}>
        <StateContext.Provider value={context}>
          <OrderFormRender {...props} />
        </StateContext.Provider>
      </ApolloProvider>
    );
    await wait(0);
    const errorDiv = newWrapper.update().find('.error');
    expect(errorDiv.length).toBe(1);
  });
});

describe('renders OrderFormRender component ', () => {
  it('should handle empty data', async () => {
    const newMockClient = createMockClient();

    newMockClient.setRequestHandler(
      GET_SUPPLIER_ORDER_FORM,
      () => Promise.resolve({ data: { supplierOrderForm: null } })
    );
    const newWrapper1 = mount(
      <ApolloProvider client={newMockClient}>
        <StateContext.Provider value={context}>
          <OrderFormRender {...props} />
        </StateContext.Provider>
      </ApolloProvider>
    );
    await wait(0);
    newWrapper1.update();
    expect(newWrapper1.update().length).toBe(0);
  });
});
