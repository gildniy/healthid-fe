import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { SupplierOrderForms } from '../../../../components/ordersAndSuppliers/orders/supplierOrderForms';
import orderForms from './supplierOrderForms.data.json';

const context = ['kitty', jest.fn()];

const props = {
  client: {
    query: jest.fn(
      () => new Promise((resolve) => {
        const data = {
          allSuppliersOrderForms: orderForms
        };
        const res = { data };
        return resolve(res);
      })
    )
  },
  placeOrders: jest.fn(
    () => new Promise((resolve) => {
      const data = {
        markSupplierOrderAsSent: {
          message: 'success'
        }
      };
      const res = { data };
      return resolve(res);
    })
  ),
  cancelOrders: jest.fn(
    () => new Promise((resolve) => {
      const data = {
        cancelOrder: {
          message: 'success'
        }
      };
      const res = { data };
      return resolve(res);
    })
  )
};

const fetchDataError = {
  client: {
    query: jest.fn(
      () => new Promise((resolve) => {
        const res = {};
        return resolve(res);
      })
    )
  }
};

const cancelOrdersError = {
  cancelOrders: jest.fn(
    () => new Promise((resolve) => {
      const res = {};
      return resolve(res);
    })
  )
};

const placeOrdersError = {
  placeOrders: jest.fn(
    () => new Promise((resolve) => {
      const res = {};
      return resolve(res);
    })
  )
};

SupplierOrderForms.contextTypes = [
  PropTypes.string,
  PropTypes.func
];

const component = (newProps) => {
  const allProps = { ...props, ...newProps };
  const wrapper = shallow(<SupplierOrderForms {...allProps} />, { context });
  return wrapper;
};

describe.only('View supplier order forms', () => {
  it('should render the component successfully', () => {
    const wrapper = component();
    expect(wrapper.length).toBe(1);
  });

  it('should navigate to the next page and back', () => {
    const wrapper = component();
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(0).props().onClick();
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(1).props().onClick();
    expect(wrapper.state().page).toEqual(1);
  });

  it('should change then number of records per page', () => {
    const wrapper = component();
    wrapper.find('WithStyles(ForwardRef(Select))').props().onChange({
      target: {
        value: 24
      }
    });
    expect(wrapper.state().noPerPage).toEqual(24);
  });

  it('should check and uncheck order form checkboxes', () => {
    const wrapper = component();
    wrapper.setState({ orderForms });
    wrapper.find('WithStyles(OrderCard)').at(0).props().check();
    wrapper.find('WithStyles(OrderCard)').at(1).props().check();
    wrapper.find('WithStyles(OrderCard)').at(0).props().check();
    wrapper.find('WithStyles(OrderCard)').at(1).props().check();
    expect(wrapper.state().checked).toEqual([]);
  });

  it('should move to last page and disable next button', () => {
    const wrapper = component();
    const { data, noPerPage } = wrapper.state();
    const formsNumber = data.length;
    const page = Math.ceil(formsNumber / noPerPage);
    wrapper.setState({ page });
    expect(wrapper.find('NextDisabled')).toHaveLength(1);
  });

  it('should select all forms', () => {
    const wrapper = component();
    wrapper.setState({ data: orderForms, checked: ['X'] });
    wrapper.find('SelectMenu').props().action('select_all');
    expect(wrapper.state().checked.length).toBeGreaterThan(1);
  });

  it('should unselect all forms', () => {
    const wrapper = component();
    wrapper.setState({ checked: ['X'] });
    wrapper.find('SelectMenu').props().action('select_none');
    expect(wrapper.state().checked.length).toEqual(0);
  });

  it('should invert the form selection', () => {
    const wrapper = component();
    wrapper.setState({ data: orderForms, checked: ['X', 123] });
    wrapper.find('SelectMenu').props().action('invert_select');
    expect(wrapper.state().checked).not.toContain('X');
  });

  it('should should not perform an unknown function', () => {
    const wrapper = component();
    wrapper.setState({ checked: ['X'] });
    wrapper.find('SelectMenu').props().action('unknown');
    expect(wrapper.state().checked).toEqual(['X']);
  });

  it('should open place order confirmation box', () => {
    const wrapper = component();
    wrapper.instance().selectAction('place_orders');
    expect(wrapper.find('SupplierOrderModal').length).toEqual(1);
  });

  it('should close place order confirmation box', () => {
    const wrapper = component();
    wrapper.setState({
      openModal: true,
      modalAction: 'place_orders',
      modalText: 'Are you sure you want to place 12 order(s)?'
    });
    wrapper.instance().closeModal();
    expect(wrapper.find('SupplierOrderModal').props().openModal).toEqual(false);
  });

  it('should open cancel order confirmation box', () => {
    const wrapper = component();
    wrapper.setState({ checked: ['X', 0] });
    wrapper.instance().selectAction('cancel_orders');
    expect(wrapper.find('SupplierOrderModal').length).toEqual(1);
  });

  it('should handle data fetching failure', () => {
    const wrapper = component(fetchDataError);
    expect(wrapper.state().data).toEqual([]);
  });

  it('should place orders', () => {
    const wrapper = component();
    wrapper.instance().selectAction('place_orders');
    wrapper.find('SupplierOrderModal').props().handleConfirm();
    expect(wrapper.find('SupplierOrderModal').props().openModal).toEqual(false);
  });

  it('should cancel orders', () => {
    const wrapper = component();
    wrapper.instance().selectAction('cancel_orders');
    wrapper.find('SupplierOrderModal').props().handleConfirm();
    expect(wrapper.find('SupplierOrderModal').props().openModal).toEqual(false);
  });

  it('should fail to place orders', () => {
    const wrapper = component(placeOrdersError);
    wrapper.instance().selectAction('place_orders');
    wrapper.find('SupplierOrderModal').props().handleConfirm();
    expect(wrapper.find('SupplierOrderModal').props().openModal).toEqual(false);
  });

  it('should fail to cancel orders', () => {
    const wrapper = component(cancelOrdersError);
    wrapper.instance().selectAction('cancel_orders');
    wrapper.find('SupplierOrderModal').props().handleConfirm();
    expect(wrapper.find('SupplierOrderModal').props().openModal).toEqual(false);
  });

  it('should not perform an action', () => {
    const wrapper = component();
    wrapper.instance().selectAction('cancel_orders');
    wrapper.setState({ modalAction: '' });
    wrapper.find('SupplierOrderModal').props().handleConfirm();
    expect(wrapper.find('SupplierOrderModal').props().openModal).toEqual(true);
  });
});
