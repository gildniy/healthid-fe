import React from 'react';
import { shallow } from 'enzyme';
import VersionDialog from '../../../../components/suppliers/Revisions/VersionDialog';
import '../../../../../__mocks__/window';

describe('Render Add Supplier component', () => {
  const props = {
    toggleDialogView: jest.fn(),
    handleApproveVersion: jest.fn(),
    handleRejectVersion: jest.fn()
  };

  it('should not display dialog', () => {
    const propsClosed = {
      isDialogOpen: false,
      supplier: null,
      ...props
    };
    const wrapper = shallow(<VersionDialog {...propsClosed} />);
    expect(wrapper.find('WithStyles(ForwardRef(Dialog))').props().open).toBeFalsy();
  });

  it('should display dialog', () => {
    const propsOpen = {
      isDialogOpen: true,
      supplier: { name: 'x' },
      ...props
    };
    const wrapper = shallow(<VersionDialog {...propsOpen} />);
    expect(wrapper.find('WithStyles(ForwardRef(Dialog))').props().open).toBeTruthy();
  });
});
