import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import { MemoryRouter } from 'react-router-dom';
import { OrdersAndSuppliers } from '../../../containers/orders/orders';

import { StateContext } from '../../../providers/stateProvider';

const props = {
  openOrdersResults: {
    openOrders: [],
    loading: false
  },
  closedOrdersResults: {
    closedOrders: [],
    loading: false,
  },
  session: {
    me: {
      mobileNumber: '256704505050',
      email: 'example@gmail.com',
      username: 'myth',
      role: { name: 'Master Admin' },
      activeOutlet: { outletpreference: { outletTimezone: '' } }
    }
  },
  history: {
    push: jest.fn(),
  },
  match: {
    params: {
      status: 'open'
    }
  }
};

const context = ['kitty', jest.fn()]

describe.only('orders and suppliers component', () => {
  let wrapper = mount((
    <MockedProvider addTypename>
      <MemoryRouter>
        <StateContext.Provider value={context}>
          <OrdersAndSuppliers {...props} />
        </StateContext.Provider>
      </MemoryRouter>
    </MockedProvider>
  ));
  it('renders orders and suppliers component correctly', () => {
    const Orders = wrapper.find('OrdersSuppliersMenu');
    expect(Orders.length).toBe(0);
  });

  it('renders correctly as it loads', () => {
    props.openOrdersResults.loading = true;
    wrapper = mount((
      <MockedProvider addTypename>
        <MemoryRouter>
          <StateContext.Provider value={context}>
            <OrdersAndSuppliers {...props} />
          </StateContext.Provider>
        </MemoryRouter>
      </MockedProvider>
    ));
    const Orders = wrapper.find('DataTableLoader');
    expect(Orders.length).toBe(1);
  });
  it('switches to suppliers tab when menu switch is clicked', () => {
    wrapper.find('OrdersAndSuppliers').instance().setState({ isOrder: false });
    wrapper.find('OrdersAndSuppliers').instance().handleMenuSwitch();
    expect(wrapper.find('OrdersAndSuppliers').instance().state.isOrder).toBeTruthy();
  });
});
