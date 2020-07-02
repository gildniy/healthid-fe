import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import OrderCustomToolBar from '../../../components/ordersAndSuppliers/OrderCustomToolBar';

const props = {
  handleChangeView: jest.fn(),
  handleViewOrders: jest.fn(),
  classes: {},
  isOrderOpen: true,
  openOrders: [],
  history: {
    push: jest.fn()
  }
};

describe('orders and suppliers component', () => {
  const wrapper = mount((
    <MockedProvider addTypename>
      <OrderCustomToolBar {...props} />
    </MockedProvider>
  ));

  document.createRange = () => ({
    setStart: () => {},
    setEnd: () => {},
    commonAncestorContainer: {
      nodeName: 'BODY',
      ownerDocument: document,
    },
  });

  const OrdersComponent = wrapper.find('CustomToolBar');

  it('renders OrderCustomToolBar component correctly', () => {
    expect(OrdersComponent.length).toBe(1);
  });
  it('toggles between open and closed orders when handleToggle is closed', () => {
    OrdersComponent.instance().handleToggle();
    expect(OrdersComponent.instance().state.open).toBeTruthy();
  });

  it('toggles between open and closed orders when handleToggleView is clicked', () => {
    OrdersComponent.instance().handleToggleView();
    expect(OrdersComponent.instance().state.openView).toBeTruthy();
  });

  it('closes popper when handleClose is called', () => {
    OrdersComponent.instance().handleClose();
    expect(OrdersComponent.instance().state.open).toBeFalsy();
  });

  it('toggles between closed and open orders when handleChangeView is called', () => {
    document.querySelector = () => ({
      checked: () => {}
    });
    OrdersComponent.instance().handleChangeView();
    expect(props.handleViewOrders).toBeCalled();
    expect(OrdersComponent.instance().state.open).toBeFalsy();
  });

  it('call handleInitiate', () => {
    OrdersComponent.instance().handleInitiate();
    expect(props.history.push).toHaveBeenCalled();
  });

  it('call handleViewOrderForms', () => {
    OrdersComponent.instance().handleViewOrderForms();
    expect(props.history.push).toHaveBeenCalled();
  });
  it('call handlePrintButton', () => {
    OrdersComponent.instance().handlePrintButton();
    expect(props.history.push).toHaveBeenCalled();
  });
  it('call handleToggleStock', () => {
    OrdersComponent.instance().handleToggleStock();
    expect(props.history.push).toHaveBeenCalled();
  });

  it('call handleToggleViewMenu', () => {
    OrdersComponent.instance().handleToggleViewMenu();
    expect(props.history.push).toHaveBeenCalled();
  });

  it('call handleToggleForm', () => {
    OrdersComponent.instance().handleToggleForm();
    expect(props.history.push).toHaveBeenCalled();
  });

  it('call handleSavePrintOpen', () => {
    OrdersComponent.instance().handleSavePrintOpen({ currentTarget: '' });
    expect(props.history.push).toHaveBeenCalled();
  });
});
