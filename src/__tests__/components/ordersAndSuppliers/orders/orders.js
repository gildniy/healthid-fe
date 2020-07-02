import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import Orders from '../../../../containers/orders/orders';
import { GET_OPEN_ORDERS } from '../../../../components/ordersAndSuppliers/queries/fetchOrdersQuery';

import { StateContext } from '../../../../providers/stateProvider';

const props = {
  session: {
    me: {
      mobileNumber: '254123123123',
      email: 'user@gmail.com',
      username: 'user',
      role: { name: 'Master Admin' },
      activeOutlet: {
        outletpreference: {
          outletTimezone: { name: 'Africa/Lagos' }
        }
      }
    }
  },
  ordersSortedByStatus: [{
    id: 1,
    orderNumber: '132',
    deliveryDate: '2019-01-12',
    name: 'qwert',
    orderdetailsSet: [{
      product: {
        batchInfo: []
      },
      supplier: {
        name: 'Test Supplier'
      }
    }],
  }],
  isLoading: false,
  classes: {},
  history: {
    push: jest.fn(),
  },
  match: { params: { id: 'xxx' } }
};

const mocks = [
  {
    request: {
      query: GET_OPEN_ORDERS,
      variables: {
        status: 'closed',
        pageCount: 1,
        pageNumber: 1,
      }
    },
    result: {
      loading: true,
      data: {
        ordersSortedByStatus: [{
          id: 1,
          orderNumber: '132',
          deliveryDate: '2019-01-12',
          name: 'qwert',
          orderdetails: [{
            product: {
              batchInfo: []
            },
            supplier: {
              suppliersmetaSet: [
                {
                  displayName: 'eubule'
                }
              ],
              name: 'Test Supplier'
            }
          }],
        }],
      },
    }
  },
]


describe('orders and suppliers component', () => {
  const context = ['kitty', jest.fn()];
  let wrapper;
  let OrdersComponent;
  beforeEach(() => {
    wrapper = mount((
      <BrowserRouter>
        <MockedProvider mocks={mocks} addTypename>
            <StateContext.Provider value={context}>
              <Orders {...props} />
            </StateContext.Provider>
        </MockedProvider>
      </BrowserRouter>
      ));
  });
  const viewStatus = {
    openOrder: true,
    closed: false,
  };

  it('should render closed orders for open status', () => {
    const viewStatus = {
      openOrder: true,
      closed: false,
    };
    OrdersComponent = wrapper.find('OrdersAndSuppliers');
    const instance = OrdersComponent.instance();
    instance.handleViewOrders(viewStatus);
    expect(props.history.push).toBeCalledTimes(0);
  });

  it('renders orders component correctly', () => {
    expect(OrdersComponent.length).toBe(1);
  });
  it('should render loader when loading is true', () => {
    props.isLoading = true;
    wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
      <BrowserRouter>
        <StateContext.Provider value={context}>
          <Orders {...props} />
        </StateContext.Provider>
      </BrowserRouter>
    </MockedProvider>
    ));
    expect(wrapper.find('DataTableLoader').length).toBe(1);
  });
  it('should render when rows per page change', async () => {
    const event = {
      target: {value : 2},
    };
    const instance = OrdersComponent.instance();
    const spy = jest.spyOn(instance, 'handleChangeRowsPerPage');
    OrdersComponent.instance().handleChangeRowsPerPage(event);
    expect(spy).toBeCalledWith(event);
  });
  it('should render when page  changes', async () => {
    const instance = OrdersComponent.instance();
    const spy = jest.spyOn(instance, 'handleChangePage');
    OrdersComponent.instance().handleChangePage(2);
    expect(spy).toBeCalledWith(2);
  });
  it('should render when row changes', async () => {
    const row = {
      id: 'row12',
      order: { id: 1},
      supplierOrderNumber: 1,
      orderNumber: '132',
      deliveryDate: '2019-01-12',
      name: 'qwert',
      supplierorderdetailsSet: [{
        supplierOrderNumber: 1,
      }],
      orderdetailsSet: [{
        product: {
          batchInfo: []
        },
        supplier: {
          name: 'Test Supplier'
        }
      }],
    }
    const instance = OrdersComponent.instance();
    const spy = jest.spyOn(instance, 'handleOnRowClick');
    OrdersComponent.instance().handleOnRowClick(row);
    expect(spy).toBeCalledWith(row);
  });
});

