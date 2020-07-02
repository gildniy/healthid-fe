import React from 'react';
import { shallow, mount } from 'enzyme';
import * as AppContext from '../../../providers/stateProvider';
import { StateContext } from '../../../providers/stateProvider';
import { DataTable } from '../../../components/pricing_loyalty/Table/DataTable';

const contextValues = { state: { isActive: 'grid3' }, dispatch: jest.fn() };
jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => contextValues);

const props = {
  classes: {},
  columns: ['id', 'name', 'sku'],
  data: [
    { id: '1', name: 'panadol', sku: '45' },
    { id: '2', name: 'hedex', sku: '45' },
    { id: '3', name: 'aspirin', sku: '5' }
  ],
  title: 'Drugs',
  onRowClick: jest.fn(),
  isAdmin: true,
  totalCount: 1,
  rowsPerPage: 10,
  page: 1,
  isSearchActive: true,
  handleSearch: jest.fn(),
  handleChangePage: jest.fn(),
  handleChangeRowsPerPage: jest.fn(),
  handleSearch: jest.fn(),
  handleClickSearch: jest.fn(),
  handleHideSearch: jest.fn()
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

describe('DataTable ', () => {
  const wrapper = shallow(<DataTable {...props} />);

  it('renders without crashing', () => {
    expect(wrapper.find('[role="checkbox"]').length).toBe(3);
  });

  it('responds to on click events', () => {
    wrapper.find('[role="checkbox"]').at(0).simulate('click');
    wrapper.find('[padding="checkbox"]').at(0).childAt(0).simulate('click', event);
    expect(wrapper.find('[padding="checkbox"]').at(0).childAt(0).prop('checked')).toBe(true);
    wrapper.find('[padding="checkbox"]').at(0).childAt(0).simulate('click', event);
    expect(wrapper.find('[padding="checkbox"]').at(0).childAt(0).prop('checked')).toBe(false);
  });
  it('handles RequestSort', () => {
    wrapper.find('WithStyles(TableHeader)').props().onRequestSort('', 'name');
    expect(wrapper.find('WithStyles(TableHeader)').prop('order')).toBe('desc');
    wrapper.find('WithStyles(TableHeader)').props().onRequestSort('', 'named');
    expect(wrapper.find('WithStyles(TableHeader)').prop('orderBy')).toBe('named');
  });
  it('handles SelectAllClick', () => {
    let event = {
      target: { checked: true }
    };
    wrapper.find('WithStyles(TableHeader)').props().onSelectAllClick(event);
    expect(wrapper.find('WithStyles(TableHeader)').prop('numSelected')).toBe(3);
    event = { target: { checked: false } };
    wrapper.find('WithStyles(TableHeader)').props().onSelectAllClick(event);
    expect(wrapper.find('WithStyles(TableHeader)').prop('numSelected')).toBe(0);
  });
  it('handles click', () => {
    const event = {
      stopPropagation: jest.fn(),
      target: { checked: true }
    };
    wrapper.find('WithStyles(TableHeader)').props().onSelectAllClick(event);
    wrapper.find('[padding="checkbox"]').at(1).childAt(0).simulate('click', event);
    wrapper.find('WithStyles(TableHeader)').props().onSelectAllClick(event);
    wrapper.find('[padding="checkbox"]').at(2).childAt(0).simulate('click', event);
    expect(wrapper.find('WithStyles(TableHeader)').prop('numSelected')).toBe(2)
  })
  it('handles ClickInverseSelection', () => {
    wrapper.find('TableToolBar').props().handleClickInverseSelection();
    expect(wrapper.find('TableToolBar').prop('numSelected')).toBe(1);
  });
  it('handles ClickDeselectAll', () => {
    wrapper.find('TableToolBar').props().handleClickDeselectAll();
    expect(wrapper.find('TableToolBar').prop('numSelected')).toBe(0);
  });
});

describe('DataTable mount ', () => {
  const context = [{}, jest.fn()];
  const wrapper = mount(
    <StateContext.Provider value={context}>
      <DataTable {...props} />
    </StateContext.Provider>
  );
  it('responds to on click events2', () => {
    wrapper.find('ForwardRef(TableSortLabel)').at(1).simulate('click', event);
    expect(wrapper.find('TableHeader').at(0).prop('onRequestSort')).toHaveBeenCalled;
  });
});
