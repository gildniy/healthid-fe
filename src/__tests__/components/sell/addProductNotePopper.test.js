import React from 'react';
import { mount } from 'enzyme';
import AddProductNotePopper from '../../../components/sell/addProductNotePoppper';
import { StateContext } from '../../../providers/stateProvider';

const sell = {
  openNotePopper: true,
  cartItemNoteEl: {},
  clickedCartItem: {}
}

const context = [{ sell }, jest.fn()]

describe('AddProductNotePopper', () => {
  const wrapper = mount((
    <StateContext.Provider value={context}>
      <AddProductNotePopper />
    </StateContext.Provider>
    ));
  it('renders AddProductNotePopper', () => {
    expect(wrapper.find('ForwardRef(Popper)').length).toBe(1);
  });
  it('handles BackButton', () => {
    const event = { target: { value: 'new' } }
    wrapper.find('WithStyles(ForwardRef(TextField))').props().onChange(event)
    wrapper.update()
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').props().value).toBe('new')
    wrapper.find('ForwardRef(Button)').at(0).simulate('click')
    expect(wrapper.find('ForwardRef(Popper)').length).toBe(1);
    expect(wrapper.find('WithStyles(ForwardRef(TextField))').props().value).toBe('')
  });
  it('handles AddButton', () => {
    const event = { target: { value: 'new' } }
    wrapper.find('WithStyles(ForwardRef(TextField))').props().onChange(event)
    wrapper.find('ForwardRef(Button)').at(1).simulate('click')
    expect(context[1]).toHaveBeenCalled;
  });
});
