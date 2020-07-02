import React from 'react';
import { shallow } from 'enzyme';
import CategoryModal from '../../../components/main_setup/outlets/preferences/categoryModal';

describe("Category Modal", () => {
  const wrapper = shallow(
    <CategoryModal
      openModal={false}
      handleCloseModal={jest.fn()}
      handleChange={jest.fn()}
      handleDelete={jest.fn()}
      handleConfirmChanges={jest.fn()}
      stateData={
        {
          name: "Test",
          salesMarkup: 10,
          isVat: true,
          loyalty: 10,
        }
      }
    />
  );

  it("Should render the component", () => {
    expect(wrapper.exists()).toBeTruthy()
  });

  it("should close Modal when 'handleCloseBoth' is called", () => {
    wrapper.find('ForwardRef(Modal)').simulate('close')
    expect(wrapper.find('ForwardRef(Modal)').exists()).toBeFalsy
  });
});
