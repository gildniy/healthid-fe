import React from 'react';
import { shallow } from 'enzyme';
import Notes from '../../components/payment/notesPopOver';

const props = {
  isNotesPopperOpen: true,
  anchorEl: { id: '' },
  placement: 'bottom',
  handleClosePopOver: jest.fn(),
  products: [{
    productName: 'Paracetamol',
    salesPrice: '500',
    quantity: 2,
    discount: 0,
    note: '',
    id: 23,
    discountedTotal: 1000,
    dispensingSize: {
      name: 'tablets'
    }
  }],
  mainCartNote: 'main note'
};
describe('test Notes component', () => {
  const wrapper = shallow((
    <Notes {...props} />
  ));
  
  it('it renders correctly', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Popover))').length).toBe(1);
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').length).toBe(1);
  });
});
