/* eslint-disable no-undef */
import React from 'react';
import { shallow } from 'enzyme';
import {
  TextField,
} from '@material-ui/core';
import _ from '../../../../__mocks__/mockUseContext';
import AdminProfile from '../../../components/main_setup/profiles/mainProfileAdminUser';

beforeEach(() => {
  const useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
})

describe('Tests that the profile page renders correctly for the Master Admin', () => {
  const dummyAdminSession = {
    me: {
      email: 'test@mail.com',
      firstName: 'test',
      id: '1234567',
      lastName: 'tester',
      mobileNumber: '+254717123456',
      role: {
        name: 'Master Admin',
        __typename: 'RoleType'
      },
      secondaryEmail: 'njihiadee@outlook.com',
      secondaryPhoneNumber: '+254717123456',
      username: 'darius',
    }
  };


  it('Should render the Admin profile data', () => {
    const wrapper = shallow(<AdminProfile session={dummyAdminSession} />);

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(TextField)).toHaveLength(8);
    expect(wrapper.find(TextField).at(0).props().value).toBe(dummyAdminSession.me.firstName);
    expect(wrapper.find(TextField).at(1).props().value).toBe(dummyAdminSession.me.username);
    expect(wrapper.find(TextField).at(2).props().value).toBe(dummyAdminSession.me.email);
    expect(wrapper.find(TextField).at(3).props().value).toBe(dummyAdminSession.me.mobileNumber);
    expect(wrapper.find(TextField).at(4).props().value).toBe(dummyAdminSession.me.lastName);
    expect(wrapper.find(TextField).at(5).props().value).toBe(dummyAdminSession.me.role.name);
    expect(wrapper.find(TextField).at(6).props().value).toBe(dummyAdminSession.me.secondaryEmail);
    expect(wrapper.find(TextField).at(7).props().value).toBe(dummyAdminSession.me.secondaryPhoneNumber);
  });
});
