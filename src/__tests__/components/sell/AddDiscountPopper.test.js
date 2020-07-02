import React from 'react';
import { mount } from 'enzyme';
import { StateContext } from '../../../providers/stateProvider';
import AddDiscountPopper from '../../../components/sell/addDiscountPopper';

const contextValues = {
  state: {
    sell: {
      openDiscountPopper: true,
      discountEl: {}
    }
  },
  dispatch: jest.fn()
};

describe('test AddDiscountPopper component', () => {
  const wrapper = mount((
    <StateContext.Provider value={contextValues}>
      <AddDiscountPopper />
    </StateContext.Provider>
  ));
  it('it renders AddDiscountPopper component', () => {
    const popper = wrapper.find('ForwardRef(Popper)').length;
    expect(popper).toBe(1);
  });
  it('it changes discount with an invalid value', () => {
    const event = { target: { value: -10 } };
    wrapper.find('ForwardRef(TextField)').props().onChange(event);
    wrapper.update();
    expect(wrapper.find('ForwardRef(TextField)').props().value).toBe(0)
  });
  it('it changes discount value', () => {
    const event = { target: { value: 10 } }
    wrapper.find('ForwardRef(TextField)').props().onChange(event);
    wrapper.update();
    expect(wrapper.find('ForwardRef(TextField)').props().value).toBe(10)
  });
  it('it calls handleDiscountButton function', () => {
    expect(wrapper.find('ForwardRef(Popper)').exists).toBeTruthy
    wrapper.find('ForwardRef(Button)').props().onClick();
    expect(wrapper.find('ForwardRef(Popper)').exists).toBeFalsy
  });
  it('it calls handleDiscountPopperClickAway function', () => {
    expect(wrapper.find('ForwardRef(Popper)').exists).toBeTruthy
    wrapper.find('ForwardRef(ClickAwayListener)').props().onClickAway();
    expect(wrapper.find('ForwardRef(Popper)').exists).toBeFalsy
  });
});
