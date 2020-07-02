import React from 'react';
import { mount, shallow } from 'enzyme';
import OrderTable from '../../../../components/ordersAndSuppliers/orders/OrderTable';

const props = {
  orderItems: [{
    id: '9atdtw68gft',
    quantity: 10,
    price: '3000',
    unitCost: '30000',
    product: {
      productName: 'Acetram'
    }
  }],
  currency: '₦'
} 
describe('outlets List', ()=>{
    it('render the component successfully', async ()=>{
        const wrapper = mount(<OrderTable { ...props}/>);
        const table = wrapper.find('ForwardRef(Table)');
        expect(table.length).toBe(1);
    });
})