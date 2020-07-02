import React from 'react';
import { shallow } from 'enzyme';
import SupplierOrderModal from '../../../../components/ordersAndSuppliers/orders/supplierOrderModal';

const props = {
  openModal: 1,
  text: 'X',
  handleConfirm: jest.fn(),
  handleCloseModal: jest.fn()
};

describe.only('View supplier order forms', () => {
  it('should render the component successfully', () => {
    const wrapper = shallow(<SupplierOrderModal {...props} />);
    expect(wrapper.length).toBe(1);
  });
});
