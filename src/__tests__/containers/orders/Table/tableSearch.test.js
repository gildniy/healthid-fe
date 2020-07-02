import React from 'react';
import { shallow } from 'enzyme';
import { TableSearch } from '../../../../containers/orders/Table/TableSearch';

const props = {
  classes: {},
  onHide: jest.fn(),
  handleChange: jest.fn(),
  state: {
    supplier: 'halifax',
    searching: true,
    active: 'supplier',
    errorText: '',
    anchorEl: {},
    placement: 'bottom',
    openPopper: jest.fn(),
    filteredSuppliers: [{}]
  },
  popperClickAway: jest.fn(),
  assignSupplier: jest.fn()
};

describe('Test Table Search Component', () => {
  const wrapper = shallow(<TableSearch {...props} />);
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });
});
