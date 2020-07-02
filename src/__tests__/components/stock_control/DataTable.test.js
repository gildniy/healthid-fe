import React from 'react';
import { shallow, mount } from 'enzyme';
import * as AppContext from '../../../providers/stateProvider';
import MockComponent from '../../../../__mocks__/mockComponent';
import { StateContext } from '../../../providers/stateProvider';
import { DataTable } from '../../../components/stock_control/Table/DataTable';

jest.mock('../../../components/stock_control/proposeEditDialog', () => MockComponent);

const contextValues = { state: { isActive: 'grid1' }, dispatch: jest.fn() };
jest
  .spyOn(AppContext, 'useStateValue')
  .mockImplementation(() => contextValues);

const props = {
  classes: {},
  columns: ['id', 'name', 'sku'],
  data: [
    { id: 1, name: 'panadol', sku: '45' },
    { id: 3, name: 'chloro', sku: '5' },
    { id: 2, name: 'chlorophom', sku: '3' },
  ],
  title: 'Drugs',
  onRowClick: jest.fn(),
  isAdmin: true,
  totalCount: 1,
  rowsPerPage: 10,
  page: 1,
  handleChangePage: jest.fn(),
  handleChangeRowsPerPage: jest.fn(),
  productRefetch: jest.fn(),
  handleSearch: jest.fn(),
  handleClickSearch: jest.fn(),
  handleHideSearch: jest.fn(),
  isSearchActive: true,
  isSearching: false
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
  const wrapper = shallow(<DataTable {...props} />)

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
});

describe('DataTable mount ', () => {
const context = [{}, jest.fn()]
const wrapper = mount(
    <StateContext.Provider value={context}>
      <DataTable {...props} />
    </StateContext.Provider>
  )

  it('performs inverse selection and deselection', () => {
    const secondEvent = {
      target: {
        checked: true,
      }
    };

    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(0);
    wrapper.find('ForwardRef(Checkbox)').at(1).simulate('click', event);
    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(1);
    wrapper.find('[title="Inverse selection"]').at(1).childAt(0).simulate('click');
    wrapper.find('ForwardRef(Checkbox)').at(1).simulate('click', event);
    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(3);
    wrapper.find('[title="Deselect All"]').at(1).childAt(0).simulate('click');
    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(0);
  });

  it('responds to on click events2', () => {
    wrapper.find('ForwardRef(TableSortLabel)').at(1).simulate('click', event);
    expect(wrapper.find('TableHeader').at(0).prop('onRequestSort')).toHaveBeenCalled;
  });

  it('handles SelectAllClick with checked', () => {
    const event = { target: { checked: true } }
    wrapper.find('WithStyles(TableHeader)').props().onSelectAllClick(event);
    wrapper.update()
    expect(wrapper.find('WithStyles(TableHeader)').props().numSelected).toEqual(3)
  });

  it('handles SelectAllClick with unChecked', () => {
    const event = { target: { checked: false } }
    wrapper.find('WithStyles(TableHeader)').props().onSelectAllClick(event);
    wrapper.update()
    expect(wrapper.find('WithStyles(TableHeader)').props().numSelected).toEqual(0)
  });

  it('handles click event', () => {
    const event = {
      target: { checked: true },
      stopPropagation: jest.fn()
    }
    wrapper.find('WithStyles(TableHeader)').props().onSelectAllClick(event);
    wrapper.update()
    wrapper.find('CustomCheckbox').at(2).props().onClick(event);
    wrapper.update()
    expect(wrapper.find('WithStyles(TableHeader)').props().numSelected).toEqual(2)
  });

  it('handles onEditQuantity', () => {
    wrapper.find('TableToolBar').props().handleEdit();
    wrapper.update()
    expect(context[1]).toHaveBeenCalled
  });
});
