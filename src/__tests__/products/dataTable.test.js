import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import DataTableWrapper, { DataTable } from '../../components/products/Templates/Table/DataTable';
import * as AppContext from '../../providers/stateProvider';
import { products, columns } from '../../../__fixtures__/products';

const contextValues = { state: { isActive: 'grid3' }, dispatch: jest.fn() };

jest.spyOn(AppContext, 'useStateValue').mockImplementation(() => contextValues);

const props = {
  title: 'Test Products Table',
  data: products,
  onRowClick: jest.fn(),
  loading: false,
  handleSearch: jest.fn(),
  handleViewProposed: jest.fn(),
  currentPath: '',
  handleChangeRowsPerPage: jest.fn(),
  status: 'approved',
  totalCount: jest.fn(),
  handleRequestSort: jest.fn(),
  page: 3,
  columns,
  isSearchActive: true,
  handleChangePage: jest.fn(),
  handleClickSearch: jest.fn(),
  handleHideSearch: jest.fn(),
  session: '',
  rowsPerPage: jest.fn(),
  classes: {},
};

const event = {
  stopPropagation: jest.fn(),
  currentTarget: {
    innerText: 1
  },
  target: {
    value: 'panadol'
  }
};

describe('Products DataTable', () => {
  let wrapper;
 
  describe('when rendering', () => {
    wrapper = shallow(<DataTable {...props} />);
    test('it should render without crushing', () => {
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  describe('Check boxes', () => {
    it('when clicking checkboxes', () => {
    wrapper.find('[role="checkbox"]').at(0).simulate('click');
    wrapper.find('[padding="checkbox"]').at(0).childAt(0).simulate('click', event);
    expect(wrapper.find('[padding="checkbox"]').at(0).childAt(0).prop('checked')).toBe(true);
    wrapper.find('[padding="checkbox"]').at(0).childAt(0).simulate('click', event);
    expect(wrapper.find('[padding="checkbox"]').at(0).childAt(0).prop('checked')).toBe(false);
  });

  it('when selecting all check boxes', () => {
    let event = {
      target: { checked: true }
    }
    wrapper.find('WithStyles(TableHeader)').props().onSelectAllClick(event);
    expect(wrapper.find('WithStyles(TableHeader)').prop('numSelected')).toBe(2)
    event = { target: { checked: false } }
    wrapper.find('WithStyles(TableHeader)').props().onSelectAllClick(event);
    expect(wrapper.find('WithStyles(TableHeader)').prop('numSelected')).toBe(0)
  });

  it('handles ClickDeselectAll', () => {
    wrapper.find('TableToolBar').props().handleClickDeselectAll();
    expect(wrapper.find('TableToolBar').prop('numSelected')).toBe(0)
  })
  })

  describe('when searching', () => {
    it('it handles TextChange', () => {
      let event = {target: { value: 'pan' }}
      wrapper.find('TableToolBar').props().handleSearch(event);
      expect(wrapper.find('WithStyles(TableHeader)').prop('rowCount')).toBe(2);
    })
  })

  it('handles RequestSort', () => {
    wrapper.find('WithStyles(TableHeader)').props().onRequestSort('', 'name');
    expect(wrapper.find('WithStyles(TableHeader)').prop('order')).toBe('desc')
    wrapper.find('WithStyles(TableHeader)').props().onRequestSort('', 'named');
    expect(wrapper.find('WithStyles(TableHeader)').prop('orderBy')).toBe('named')
  })
});
