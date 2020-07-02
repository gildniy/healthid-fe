import React from 'react';
import { mount } from 'enzyme';
import OutletsList from '../../../../components/ordersAndSuppliers/orders/outletsList';

describe('outlets List', ()=>{
    it('should load the outlets List when given all props with destination outlet', ()=>{
        const props = {
            destinationOutlet: 'Outlet1',
            handleChange: jest.fn(),
            outlets: [{name: 'Outlet2', id: 1}, {name: 'Outlet3', id: 3}]
        };
        const wrapper = mount(<OutletsList { ...props}/>);
        expect(wrapper.length).toBe(1);
    }) 
    it('should load the outlets List when given all props without destination outlet', ()=>{
        const props = {
            destinationOutlet: undefined,
            handleChange: jest.fn(),
            outlets: [{name: 'Outlet2', id: 1}, {name: 'Outlet3', id: 3}]
        };
        const wrapper = mount(<OutletsList { ...props}/>);
        expect(wrapper.length).toBe(1);
    }) 
})