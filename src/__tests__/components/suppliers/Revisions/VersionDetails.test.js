import React from 'react';
import { shallow } from 'enzyme';
import * as VersionDetailsComponent from '../../../../components/suppliers/Revisions/VersionDetails';
import '../../../../../__mocks__/window';

describe('Render Add Supplier component', () => {
  const props = {
    classes: {},
    supplier: {
      id: 'x',
      name: 'Supplier Name',
      submitTime: '02/05/2020 09:00'
    },
    handleApproveVersion: jest.fn(),
    handleRejectVersion: jest.fn(),
  };

  const { VersionDetails } = VersionDetailsComponent;

  const wrapper = shallow(<VersionDetails {...props} />);

  it('should test VersionDetails renders successfully', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Typography))').props().children)
      .toContain(`${props.supplier.name} Version ${props.supplier.submitTime}`);
  });

  it('should call handleApproveVersion', () => {
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(2).props().onClick();
    expect(props.handleApproveVersion).toHaveBeenCalled();
  });

  it('should call handleRejectVersion', () => {
    wrapper.find('WithStyles(ForwardRef(IconButton))').at(1).props().onClick();
    expect(props.handleRejectVersion).toHaveBeenCalled();
  });

  it('should call renderField', () => {
    const TextField = VersionDetailsComponent.renderTextField('style', 'fieldName');
    expect(TextField.props.name).toEqual('fieldName');
  });
});
