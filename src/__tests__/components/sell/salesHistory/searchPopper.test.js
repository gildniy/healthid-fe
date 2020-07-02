import React from 'react';
import { mount } from 'enzyme';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { SearchPopper } from '../../../../components/sell/salesHistory/searchPopper';

const renderWithContext = renderedNode => (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    {renderedNode}
  </MuiPickersUtilsProvider>
)
const props = {
  state: {
    searchAnchorEl: { id: '' },
    searchPopperOpen: true,
    searchValues: {
      searchField: '',
      from: new Date(),
      to: new Date(),
      outlet: 'Transcend Pharmacy, Kampala'
    }
  },
  classes: { searchPaper: '', timeGrid: '', FormControl: '' },
  rows: ['Transcend Pharmacy, Kampala'],
  handleClose: jest.fn(),
  handleSearchChange: jest.fn(),
  handleDoneButton: jest.fn(),
};
describe('searchPopper component', () => {
  let wrapper;
  it('handles fab one onclick', () => {
    wrapper = mount(
      renderWithContext(<SearchPopper {...props} />)
    );
    const button = wrapper.find('#search-datepicker').at(15);
    button.simulate('change', { target: { value: 'hello' } });
    const comp = wrapper.props();
  });
  it('handles button one onclick', () => {
    wrapper = mount(<SearchPopper {...props} />);
    const button = wrapper.find('ForwardRef(Button)').at(0);
    button.simulate('click');
    const comp = wrapper.props();
    expect(comp.state.searchPopperOpen).toBeTruthy();
  });
  it('handles button two onclick', () => {
    wrapper = mount(<SearchPopper {...props} />);
    const button = wrapper.find('ForwardRef(Button)').at(1);
    button.simulate('click');
    const comp = wrapper.props();
    expect(comp.state.searchPopperOpen).toBeTruthy();
  });
});
