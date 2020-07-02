import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import { SalesHistoryToolBar } from '../../../../components/sell/salesHistory/salesHistoryToolBar';
import { Toolbar } from '../../../../components/sell/salesHistory/toolbar';

const props = {
  classes: { popper: { zIndex: '500' } },
  title: '',
  rows: [{ location: 'ecopham | kampala' }],
  componentRef: {},
  handleResetSales: jest.fn(),
};

const context = [, jest.fn()];

describe('SalesHistoryToolBar component', () => {
  SalesHistoryToolBar.contextTypes = [
    PropTypes.object,
    PropTypes.func
  ];
  const wrapper = shallow(
    <SalesHistoryToolBar {...props} />, { context }
  );
  wrapper.instance().setState(props.state);

  it('renders the SalesHistoryToolBar with isSearching true', () => {
    wrapper.instance().setState({ isSearching: true });
    const spy = jest.spyOn(wrapper.instance(), 'handleSliderButtons');
  });
  it('calls handleToggle', () => {
    const event = { currentTarget: { id: '' } };
    wrapper.instance().handleToggle(event);
    expect(wrapper.state('open')).toBe(true);
  });
  it('calls handleClose', () => {
    const which = 'isSearching';
    wrapper.instance().handleClose(which);
    expect(wrapper.state('isSearching')).toBe(false);
  });
  it('calls handleRangeChange', () => {
    const which = 'searchValues';
    const payLoad = { searchField: 'cool' }
    wrapper.instance().handleRangeChange(which, payLoad);
    expect(wrapper.state().searchValues.searchField).toBe('cool');
  });
  it('calls handleCalenderChange', () => {
    const which = 'timeValue';
    const payLoad = { start: '11:11', end: '23:59' };
    wrapper.instance().handleCalenderChange(which, payLoad);
    expect(wrapper.state('timeValue')).toBe(payLoad);
  });
  it('calls timeChangeHandler', () => {
    const time = { start: '12:00', end: '23:59' };
    wrapper.instance().timeChangeHandler(time);
    expect(wrapper.state('timeValue')).toBe(time);
  });
  it('calls handleSliderButtons for 00:00', () => {
    const point = '00:00';
    wrapper.instance().handleSliderButtons(point);
    expect(wrapper.state().timeValue.start).toBe(point);
  });
  it('calls handleSliderButtons for 23:59', () => {
    const point = '23:59';
    wrapper.instance().handleSliderButtons(point);
    expect(wrapper.state().timeValue.end).toBe(point);
  });
  it('calls handleClickShowCalender', () => {
    const currentTarget = { id: '' };
    const event = { currentTarget };
    wrapper.instance().handleClickShowCalender(event);
    expect(wrapper.state('calenderAnchorEl')).toBe(currentTarget);
  });
  it('calls handleSearchInput', () => {
    const value =  'momo'
    const event = { target: { value } };
    wrapper.instance().handleSearchInput(event);
    expect(wrapper.state().searchValues.searchField).toBe('momo');
  });
  it('calls handleSearchChange', () => {
    const data = 'coco';
    wrapper.instance().handleSearchChange('searchField', data);
    expect(wrapper.state().searchValues.searchField).toBe(data);
  });
  it('calls handleDoneButton', () => {
    const searchValues = {
      from: { setHours: jest.fn() },
      to: { setHours: jest.fn() },
      searchField: 'coco'
    };
    wrapper.instance().handleDoneButton(searchValues);
    expect(wrapper.state('searchPopperOpen')).toBe(false);
  });
  it('calls searchPopperToggle', () => {
    const event = {currentTarget: 'one'}
    wrapper.instance().searchPopperToggle(event);
    expect(wrapper.state('searchPopperOpen')).toBe(true);
  });
  it('calls handleDateTimeDoneButton', () => {
    const selection = {
      startDate: { setHours: jest.fn() },
      endDate: { setHours: jest.fn() },
    }
    const timeValue = { start: '08:00', end: '09:00' }
    wrapper.instance().handleDateTimeDoneButton(selection, timeValue);
    expect(wrapper.state('open')).toBe(false);
  });
  it('calls handleSavePrintOpen', () => {
    const currentTarget = '';
    wrapper.instance().handleSavePrintOpen(currentTarget);
    expect(wrapper.context()[1]).toHaveBeenCalled;
  });
});
describe('Toolbar component', () => {
  it('renders the Toolbard with isSearching true', () => {
    const wrapper = shallow(
      <Toolbar {...props} />, { context }
    );
    expect(wrapper).toHaveLength(1);
  });

  it('renders the Toolbard with isSearching false', () => {
    const props2 = {
      ...props,
      state: {
        ...props.state,
        isSearching: true
      }
    }
    const wrapper = shallow(
      <Toolbar {...props2} />, { context }
    );
    expect(wrapper).toHaveLength(1);
  });


});


