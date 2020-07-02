import React from 'react';
import { shallow } from 'enzyme';
import { TableToolBar } from '../../../../containers/orders/Table/TableToolbar';

const props = {
  numSelected: 2,
  selectedRow: {},
  handleTextChange: jest.fn(),
  isSearchActive: false,
  handleHideSearch: jest.fn(),
  handleClickSearch: jest.fn(),
  handleEdit: jest.fn(),
  handleOpenModal: jest.fn(),
  handleCloseModal: jest.fn(),
  displayModal: jest.fn(),
  handleQuantitySupplierEdit: jest.fn(),
  deselect: jest.fn(),
  productsAmount: 2,
  classes: {}
};

describe('Test Table Header Component', () => {
  const wrapper = shallow(<TableToolBar {...props} />);
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });
});
