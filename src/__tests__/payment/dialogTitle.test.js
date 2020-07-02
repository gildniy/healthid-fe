import React from 'react';
import { mount } from 'enzyme';
import DialogHeader from '../../components/payment/dialogTitle';
import { StateContext } from '../../providers/stateProvider';

const props = {
  processing: false,
  handleBackToSalesSummary: jest.fn(),
  handleDisplayNotesPopper: jest.fn()
};

const context = [, jest.fn()]

describe('DialogHeader', () => {
  const wrapper = mount(
    <StateContext.Provider value={context}>
      <DialogHeader {...props} />
    </StateContext.Provider>
  );
  it('renders correctly', () => {
    expect(wrapper.find('ForwardRef(Paper)').length).toBe(1);
  });
  it('handles NoteIcon "onClick"', () => {
    const event = { target: { value: 'new' } }
    wrapper.find('NotesIcon').props().onClick(event)
    expect(props.handleDisplayNotesPopper).toHaveBeenCalled;
  });

  describe('processing', () => {
    props.processing = true
    const newWrapper = mount(
      <StateContext.Provider value={context}>
        <DialogHeader {...props} />
      </StateContext.Provider>
    );
    
    it('renders differently when processing', () => {
      expect(newWrapper.find('ForwardRef(Paper)').prop('elevation')).toBe(0);
    });
    it('handles BackToSellScreen', () => {
      newWrapper.find('ForwardRef(Button)').simulate('click')
      expect(context[1]).toHaveBeenCalled;
    });
  })
});
