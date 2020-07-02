import React from 'react';
import { shallow } from 'enzyme';
import { CategoryInput } from '../../../../components/main_setup/outlets/preferences/categoryInput';

describe("Category Input", () => {

  it("Should render the component", () => {
    const wrapper = shallow(
      <CategoryInput
        handleChange={jest.fn()}
        stateData={
          {
            name: "Test",
            salesMarkup: 10,
            isVat: true,
            loyalty: 10,
          }
        }
       handleConfirmChanges={jest.fn()} handleShowInput={jest.fn()}/>
    );
    const wrapper2 = shallow(
      <CategoryInput
        handleChange={jest.fn()}
        stateData={
          {
            name: "Test2",
            salesMarkup: 40,
            isVat: false,
            loyalty: 30,
          }
        }
       handleConfirmChanges={jest.fn()} handleShowInput={jest.fn()}/>
    );

    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper2.exists()).toBeTruthy()
  });
});
