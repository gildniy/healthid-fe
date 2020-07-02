import React from 'react';
import { mount } from 'enzyme';
import { ApolloProvider } from 'react-apollo';
import { createMockClient } from 'mock-apollo-client';
import GET_ORDER_DETAILS from '../../../queries/getOrderDetails';
import GET_AUTO_FILLED_PRODUCTS_AND_SUPPLIERS from '../../../queries/getAutoFilledProducts';
import GET_MANUAL_ADDED_PRODUCTS from '../../../queries/getManualAddedProducts';
import { InitiatedOrder } from '../../../containers/orders/InitiatedOrder';

const props = {
  session: {
    me: {
      outlets: [
        {
          id: '1',
          kind: {
            name: 'warehouse'
          },
          name: 'any',
          users: [
            {
              email: 'someone@email.com',
              id: 'user1',
              jobTitle: 'cs',
              role: {
                id: 'role1',
                name: 'cashier'
              },
              username: 'someone'
            }
          ]
        }
      ]
    }
  },
};

const autoFilledProductsResponse = {
  data: {
    productsOrder: [{
      id: 1,
      product: {
        id: '1',
        productName: 'panadol'
      },
      skuNumber: 100,
      productQuantity: 20,
      productUnitPrice: 60,
      currentSupplier: {
        id: 'someone',
        name: 'someone'
      },
      preferredSupplier: {
        id: 'someoneelse',
        name: 'someoneelse'
      },
      backupSupplier: {
        id: 'someoneelseagain',
        name: 'someoneelseagian'
      }
    }],
    loading: false,
    error: false
  }
};

const manualProductsResponse = {
  data: {
    orderProducts: [{
      id: 1,
      product: {
        id: '1',
        productName: 'panadol'
      },
      skuNumber: 100,
      productQuantity: 20,
      productUnitPrice: 60,
      currentSupplier: {
        id: 'someone',
        name: 'someone'
      },
      preferredSupplier: {
        id: 'someoneelse',
        name: 'someoneelse'
      },
      backupSupplier: {
        id: 'someoneelseagain',
        name: 'someoneelseagian'
      }
    }],
    loading: false,
    error: false
  }
};

describe('Test InitiatedOrder Component - Autofill Order - Positive Case', () => {
  it('should render the component', () => {
    const mockClient = createMockClient();

    mockClient.setRequestHandler(
      GET_ORDER_DETAILS,
      () => Promise.resolve({
        data: {
          order: {
            name: 'Autofill Order for March 2020 TEST',
            id: '84',
            orderNumber: 'bagd6te3b',
            productAutofill: true,
            supplierAutofill: true,
            destinationOutlet: {
              id: '4',
              name: 'New ville three'
            },
            deliveryDate: '2020-05-10'
          }
        }
      })
    );

    mockClient.setRequestHandler(
      GET_AUTO_FILLED_PRODUCTS_AND_SUPPLIERS,
      () => Promise.resolve(autoFilledProductsResponse)
    );
    const wrapper = mount(
      <ApolloProvider client={mockClient}>
        <InitiatedOrder {...props} />
      </ApolloProvider>
    );

    expect((wrapper).exists()).toBeTruthy();
  });
});

describe('Test InitiatedOrder Component - Manual Order - Positive Case', () => {
  it('should render the component', () => {
    const mockClient = createMockClient();

    mockClient.setRequestHandler(
      GET_ORDER_DETAILS,
      () => Promise.resolve({
        data: {
          order: {
            name: 'Manual Order for March 2020',
            id: '84',
            orderNumber: 'bagd6te3b',
            productAutofill: false,
            supplierAutofill: false,
            destinationOutlet: {
              id: '4',
              name: 'New ville three'
            },
            deliveryDate: '2020-05-10'
          }
        }
      })
    );

    mockClient.setRequestHandler(
      GET_MANUAL_ADDED_PRODUCTS,
      () => Promise.resolve(manualProductsResponse)
    );
    const wrapper = mount(
      <ApolloProvider client={mockClient}>
        <InitiatedOrder {...props} />
      </ApolloProvider>
    );

    expect((wrapper).exists()).toBeTruthy();
  });
});

describe('Test InitiatedOrder Component - Autofill Order - Negative Case', () => {
  it('should render the component', () => {
    const mockClient = createMockClient();

    mockClient.setRequestHandler(
      GET_ORDER_DETAILS,
      () => Promise.resolve({
        data: {
          order: {
            name: 'Autofill Order for March 2020 TEST',
            id: '84',
            orderNumber: 'bagd6te3b',
            productAutofill: true,
            supplierAutofill: true,
            destinationOutlet: {
              id: '4',
              name: 'New ville three'
            },
            deliveryDate: '2020-05-10'
          }
        }
      })
    );

    mockClient.setRequestHandler(
      GET_AUTO_FILLED_PRODUCTS_AND_SUPPLIERS,
      () => Promise.reject(new Error('Server error'))
    );
    const wrapper = mount(
      <ApolloProvider client={mockClient}>
        <InitiatedOrder {...props} />
      </ApolloProvider>
    );

    expect((wrapper).exists()).toBeTruthy();
  });
});

describe('Test InitiatedOrder Component - Manual Order - Positive Case', () => {
  it('should render the component', () => {
    const mockClient = createMockClient();

    mockClient.setRequestHandler(
      GET_ORDER_DETAILS,
      () => Promise.resolve({
        data: {
          order: {
            name: 'Manual Order for March 2020',
            id: '84',
            orderNumber: 'bagd6te3b',
            productAutofill: false,
            supplierAutofill: false,
            destinationOutlet: {
              id: '4',
              name: 'New ville three'
            },
            deliveryDate: '2020-05-10'
          }
        }
      })
    );

    mockClient.setRequestHandler(
      GET_MANUAL_ADDED_PRODUCTS,
      () => Promise.reject(new Error('Server error'))
    );
    const wrapper = mount(
      <ApolloProvider client={mockClient}>
        <InitiatedOrder {...props} />
      </ApolloProvider>
    );

    expect((wrapper).exists()).toBeTruthy();
  });
});

describe('Test InitiatedOrder Component - Order Detail - Negative Case', () => {
  it('should render the component', () => {
    const mockClient = createMockClient();

    mockClient.setRequestHandler(
      GET_ORDER_DETAILS,
      () => Promise.reject(new Error('Server error'))
    );

    const wrapper = mount(
      <ApolloProvider client={mockClient}>
        <InitiatedOrder {...props} />
      </ApolloProvider>
    );

    expect((wrapper).exists()).toBeTruthy();
  });
});
