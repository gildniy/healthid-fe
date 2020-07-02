import React from 'react';
import { mount } from 'enzyme';
import HoldSaleDialog from '../../../components/sell/holdSaleDialog';
import { StateContext } from '../../../providers/stateProvider';

const props = {
  state: { isLoading: false },
};
const context = [
  { sell: { cart: [], openHoldSaleDialog: true } },
  jest.fn()
]

describe('HoldSaleDialog', () => {
  const wrapper = mount(
    <StateContext.Provider value={context}>
      <HoldSaleDialog {...props} />
    </StateContext.Provider>
  );
  
  it('renders HoldSaleDialog component', () => {
    expect(wrapper.find('ForwardRef(Dialog)').length).toBe(1);
  });
  it('handles DialogClose', () => {
    const event = { target: { value: 'Mama mia' } }
    wrapper.find('WithStyles(ForwardRef(TextField))').props().onChange(event)
    wrapper.update()
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').prop('value')).toBe('Mama mia')
    wrapper.find('ForwardRef(Button)').at(0).simulate('click')
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').prop('value')).toBe('')
  });
  it('handles AddHeldSaleButton', () => {
    wrapper.find('ForwardRef(Button)').at(1).simulate('click')
    expect(context[1]).toHaveBeenCalled
  });
});
