import React from 'react';
import { shallow } from 'enzyme';
import { DataTable } from '../../../../components/suppliers/Revisions/VersionsTable';
import '../../../../../__mocks__/window';

describe('Render Add Supplier component', () => {
  const props = {
    classes: {},
    toggleDialogView: jest.fn(),
    data: [
      {
        isActive: false,
        submitTime: '20/03/2020 7:35',
        status: 'Pending',
        proposedBy: 'Andrew',
        approvedBy: 'Pending',
      }, {
        isActive: true,
        submitTime: '20/03/2020 7:35',
        status: 'Approved',
        proposedBy: 'Andrew',
        approvedBy: 'Andrew',
      }
    ],
    numberOfVersions: 10,
    page: 1,
    rowsPerPage: 10,
    handleChangePage: jest.fn(),
    handleChangeRowsPerPage: jest.fn()
  };

  it('should not display the table', () => {
    const wrapper = shallow(<DataTable {...{ ...props, loading: true }} />);
    expect(wrapper.find('WithStyles(Table)').length).toBe(0);
  });

  it('should display the table', () => {
    const wrapper = shallow(<DataTable {...{ ...props, loading: false }} />);
    expect(wrapper.find('WithStyles(ForwardRef(Table))').length).toBe(1);
  });

  it('should open dialog', () => {
    const wrapper = shallow(<DataTable {...{ ...props, loading: false }} />);
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(0).props().onClick();
    expect(wrapper.find('WithStyles(ForwardRef(Table))').length).toBe(1);
  });
});
