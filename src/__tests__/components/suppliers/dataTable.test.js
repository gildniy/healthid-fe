import React from 'react';
import { shallow, mount } from 'enzyme';
import { DataTable } from '../../../components/suppliers/Templates/Table/DataTable';

describe('Supplier Page DataTable ', () => {
  const suppliers = [
    {
      name: 'eric',
      isApproved: true
    },
    {
      name: 'eric',
      isApproved: false
    }
  ];
  const props = {
    classes: {},
    columns: ['id', 'name', 'tier', 'rating', 'notes'],
    data: [
      {
        id: '1', name: 'panadol', tier: 'one', rating: '5', notes: ['note1', 'note2']
      },
      {
        id: '3', name: 'chloro', tier: 'two', rating: '3', notes: ['note1', 'note2']
      }],
    title: 'Suppliers',
    onRowClick: jest.fn(),
    isAdmin: true,
    status: 'approved',
    handleViewProposed: jest.fn(),
    totalCount: 10,
    handleChangeRowsPerPage: jest.fn(),
    handleChangePage: jest.fn(),
    rowsPerPage: 10,
    page: 1,
    orderBy: 'name',
    order: 'desc',
    isFiltering: false,
    handleTextChange: jest.fn(),
    handleRequestSort: jest.fn(),
    loading: false,
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

  it('renders without crashing', () => {
    const wrapper = shallow(<DataTable {...props} />);
    expect(wrapper.find('[role="checkbox"]').length).toBe(2);
  });

  it('responds to on click events', () => {
    const wrapper = shallow(<DataTable {...props} />);
    wrapper.find('[role="checkbox"]').at(0).simulate('click');
    wrapper.find('[padding="checkbox"]').at(0).childAt(0).simulate('click', event);
    expect(wrapper.find('[padding="checkbox"]').at(0).childAt(0).prop('checked')).toBe(true);
    wrapper.find('[padding="checkbox"]').at(0).childAt(0).simulate('click', event);
    expect(wrapper.find('[padding="checkbox"]').at(0).childAt(0).prop('checked')).toBe(false);
  });

  it('performs inverse selection and deselection', () => {
    const wrapper = mount(<DataTable {...props} />);
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
    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(2);
    wrapper.find('[title="Deselect all"]').at(1).childAt(0).simulate('click');
    expect(wrapper.find('[name="toolbar"]').prop('numSelected')).toBe(0);
    wrapper.find('ForwardRef(Checkbox)').at(0).simulate('click', event);
    wrapper.find('ForwardRef(Checkbox)').at(0).simulate('click', secondEvent);
    wrapper.find('span').at(0).simulate('mouseEnter', event);
    wrapper.find('span').at(0).simulate('mouseLeave', event);
  });

  it('sets the right state', () => {
    const wrapper = shallow(<DataTable {...props} />);
    wrapper.find('span').at(0).simulate('mouseEnter', event)
    wrapper.find('span').at(0).simulate('mouseLeave', event)
    wrapper.find('WithStyles(TableHeader)').prop('onSelectAllClick')({
      target: {
        checked: true
      }
    })
    expect(wrapper.find('WithStyles(CustomCheckbox)').at(0).prop('checked')).toBeTruthy
  })

  describe('sets the right state', () => {
    const wrapper = shallow(<DataTable {...props} />);
    
    it('Checks all Checkboxes', () => {
      wrapper.find('span').at(0).simulate('mouseEnter', event)
      wrapper.find('span').at(0).simulate('mouseLeave', event)
      wrapper.find('WithStyles(TableHeader)').prop('onSelectAllClick')({
        target: {
          checked: true
        }
      })
      expect(wrapper.find('WithStyles(CustomCheckbox)').at(0).prop('checked')).toBeTruthy
    })

    it('unChecks all Checkboxes', () => {
      wrapper.find('WithStyles(TableHeader)').prop('onSelectAllClick')({
        target: {
          checked: false
        }
      })
      expect(wrapper.find('WithStyles(CustomCheckbox)').at(0).prop('checked')).toBeFalsy
    })
  })
});
