import React from 'react';
import { mount } from 'enzyme';
import SavePrintPopper from '../../../components/shared/savePrintPopper';
import { StateContext } from '../../../providers/stateProvider';

const props = {
  state: {
    savePrintOpen: true,
    savePrintAnchorEl: { id: '' },
  },
  classes: {
    popper: '', savePrintPaper: '', printButton: '', savePrintTypo: '', saveButton: '', saveButtonImg: ''
  },
  popperHeader: 'Header',
  componentRef: React.createRef(),
  handlePrintButton: jest.fn(),
  handleSaveButton: jest.fn(),
};

const context = [{ savePrint: { popperOpen: true, anchorEl: '' } }, jest.fn()]

describe('SavePrintPopper component', () => {
  let wrapper = mount(
    <StateContext.Provider value={context}>
      <SavePrintPopper {...props} />
    </StateContext.Provider>
  );
  it('handles print', () => {
    const button = wrapper.find('ForwardRef(IconButton)').at(0);
    button.simulate('click');
    expect(wrapper.props().state.savePrintOpen).toBe(true);
  });
  it('handles save', () => {
    const button = wrapper.find('ForwardRef(IconButton)').at(1);
    button.simulate('click');
    expect(wrapper.props().state.savePrintOpen).toBe(true);
  });
  it('handles onClickAway', () => {
    wrapper.find('ForwardRef(ClickAwayListener)').props().onClickAway()
    expect(wrapper.context[1]).toHaveBeenCalled;
  });
});
