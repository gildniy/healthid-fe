import React from 'react';
import { shallow, mount } from 'enzyme';
import { TableHeader } from '../../../../containers/orders/Table/TableHeader';

const props = {
  onSelectAllClick: jest.fn(),
  order: 'desc',
  orderBy: 'name',
  numSelected: 2,
  rowCount: 2,
  onRequestSort: jest.fn(),
  columnHeaders: ['name', 'sku', 'qty ordered', 'supplier'],
  classes: {}
};

const event = {
  stopPropagation: jest.fn()
};

describe('Test Table Header Component', () => {
  const wrapper = mount(<TableHeader {...props} />);
  it('should render the component', () => {
    expect((wrapper).exists()).toBeTruthy();
  });

  it('should call TableSortLabel ', () => {
    wrapper.find('ForwardRef(TableSortLabel)').at(0).simulate('click')
  });
});
