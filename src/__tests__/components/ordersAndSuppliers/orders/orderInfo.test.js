import React from 'react';
import { mount } from 'enzyme';
import OrderInfo from '../../../../components/ordersAndSuppliers/orders/OrderInfo';


const props = {
  deliveryDue: '2020-01-04',
  destinationOutlet: {
    name: 'Lifestores Pharmacy.',
    addressLine1: '21 Herbert Macaulay',
    city: {
      name: 'Lagos',
      country: { name: 'Nigeria' }
    }
  },
  suppliersmetaSet: [{ creditDays: 4 }],
  paymentDue: '2020-01-08',
  classes: {},
};
describe('outlets List', () => {
  it('render the component successfully', () => {
    const wrapper = mount(<OrderInfo {...props} />);
    expect(wrapper.length).toBe(1);
  });
  it('should display "Cash on delivery" when there is no credit days', () => {
    const newProps = { ...props, suppliersmetaSet: [] };
    const wrapper = mount(<OrderInfo {...newProps} />);
    const cod = wrapper.find("ForwardRef(Typography)[id='cod']");
    const creditDays = wrapper.find("ForwardRef(Typography)[id='creditDays']");
    expect(cod.length).toBe(1);
    expect(creditDays.length).toBe(0);
  });

  it('should display the number of credit days when we have more than 0 credit days', () => {
    const wrapper = mount(<OrderInfo {...props} />);
    const cod = wrapper.find("ForwardRef(Typography)[id='cod']");
    const creditDays = wrapper.find("[id='creditDays']");
    expect(cod.length).toBe(0);
    expect(creditDays.find('p').text()).toBe('( 4 days credit)');
  });
});
