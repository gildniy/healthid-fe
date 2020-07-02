import React from 'react';
import { shallow } from 'enzyme';
import { OrderCard } from '../../../../components/ordersAndSuppliers/orders/orderCard';

const props = {
  supplier: 'ACI LTD',
  order: 'D55DW-G776G',
  orderForm: {
    orderItems: [{
      id: '9atdtw68gft',
      status: 'Incomplete Form...',
      supplier: { name: '' },
      order: {orderNumber: 'kuhjdv'},
      quantity: 10,
      price: '3000',
      unitCost: '30000',
      product: {
        productName: 'Acetram'
      }
    }]
  }
};

describe.only('View supplier order forms', () => {
  it('should render the component successfully with no products', () => {
    const wrapper = shallow(<OrderCard {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('should render the component successfully with products', () => {
    props.products = 3;
    const wrapper = shallow(<OrderCard {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('should navigate to the linked page', () => {
    const wrapper = shallow(<OrderCard {...props} />);
    wrapper.find('WithStyles(ForwardRef(Paper))').at(1).props().onClick();
    expect(window.location.href).toEqual('http://localhost/');
  });
});
