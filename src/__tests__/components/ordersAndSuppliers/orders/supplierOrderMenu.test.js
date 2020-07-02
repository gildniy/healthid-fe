import React from 'react';
import { shallow } from 'enzyme';
import SupplierOrderMenu from '../../../../components/ordersAndSuppliers/orders/supplierOrderMenu';

const props = {
  selected: 1,
  action: jest.fn()
};

describe.only('View supplier order forms', () => {
  it('should render the component successfully', () => {
    const wrapper = shallow(<SupplierOrderMenu {...props} />);
    expect(wrapper.length).toBe(1);
  });

  it('should select all forms', () => {
    const wrapper = shallow(<SupplierOrderMenu {...props} />);
    wrapper.find('WithStyles(ForwardRef(Tooltip))').at(1).props().onClick('select_all');
    expect(props.action).toHaveBeenCalledWith('select_all');
  });

  it('should unselect all forms', () => {
    const wrapper = shallow(<SupplierOrderMenu {...props} />);
    wrapper.find('WithStyles(ForwardRef(Tooltip))').at(2).props().onClick('select_none');
    expect(props.action).toHaveBeenCalledWith('select_none');
  });

  it('should invert the forms selection', () => {
    const wrapper = shallow(<SupplierOrderMenu {...props} />);
    wrapper.find('WithStyles(ForwardRef(Tooltip))').at(3).props().onClick('invert_select');
    expect(props.action).toHaveBeenCalledWith('invert_select');
  });

  it('should invert the forms selection', () => {
    const wrapper = shallow(<SupplierOrderMenu {...props} />);
    wrapper.find('WithStyles(ForwardRef(Tooltip))').at(0).props().onClick('place_orders');
    expect(props.action).toHaveBeenCalledWith('place_orders');
  });

  it('should invert the forms selection', () => {
    const wrapper = shallow(<SupplierOrderMenu {...props} />);
    wrapper.find('WithStyles(ForwardRef(Tooltip))').at(4).props().onClick('cancel_orders');
    expect(props.action).toHaveBeenCalledWith('cancel_orders');
  });
});
