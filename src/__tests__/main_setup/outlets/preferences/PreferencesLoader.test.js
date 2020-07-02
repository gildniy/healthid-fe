/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import PreferencesLoader from '../../../../components/main_setup/outlets/preferences/preferencesLoader';

describe('PreferencesLoader ', () => {
  it('renders correctly ', () => {
    const wrapper = shallow(<PreferencesLoader />);
    expect(wrapper.exists()).toBeTruthy();
  });
});
