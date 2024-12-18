import React from 'react';
import { shallow } from 'enzyme';
import _ from '../../../../__mocks__/mockUseContext';
import PropTypes from 'prop-types';
import { ManageProfile } from '../../../components/main_setup/profiles/manageProfileSetup';

beforeEach(() => {
  const useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
})

describe('Manage User profile tests', () => {

  const dummySession = {
    me: {
      email: 'test@mail.com',
      firstName: 'test',
      initialUserData: {
        username: 'darius',
        email: 'test@mail.com',
        secondaryEmail: 'N/A',
        mobileNumber: '+254717123456'
      },
      mobileNumber: '+254717123456',
      secondaryEmail: 'N/A',
      secondaryPhoneNumber: 'N/A',
      profileImage: 'N/A',
      role: {
        name: 'Cashier',
        __typename: 'RoleType'
      },
      username: 'darius',
      birthday: '5/5/2019',
      jobTitle: 'Chief Cashier',
      weeklyTarget: '15',
      startingDate: '3/2/2018',
      lastName: 'tester',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      errors: {
        status: false,
        message: ''
      },
      crop: {
        aspect: 1 / 1
      },
      samePasswordError: {
        status: false,
        message: ''
      }
    }
  };

  const dummySession2 = {
    me: {
      firstName: 'N/A',
      initialUserData: {
        username: 'N/A',
        email: 'N/A',
        secondaryEmail: 'N/A',
        mobileNumber: 'N/A'
      },
      lastName: 'N/A',
      username: 'N/A',
      email: 'N/A',
      secondaryEmail: 'N/A',
      secondaryPhoneNumber: 'N/A',
      profileImage: 'N/A',
      mobileNumber: 'N/A',
      birthday: 'N/A',
      role: 'N/A',
      startingDate: 'N/A',
      jobTitle: 'N/A',
      weeklyTarget: 'N/A',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
      errors: {
        status: false,
        message: ''
      }, crop: {
        aspect: 1 / 1
      },
      samePasswordError: {
        status: false,
        message: ''
      }
    }
  };

  const props = {
    updatePassword: jest.fn(() => Promise.resolve({
      data: {
        updateUser: {
          user: {
            email: 'test@mail.com'
          }
        }
      }
    })),
    handleOnDrop: jest.fn(),
    updateUserInfo: jest.fn(),
  };

  const propsInvalid = {
    updatePassword: jest.fn(() => Promise.reject({
      graphQLErrors: [
        {
          message: 'Test error message'
        }
      ]
    }))
  };

  ManageProfile.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()]

  it('Should render the component and the appropriate state', () => {
    const wrapper = shallow(<ManageProfile session={dummySession} />, { context });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.instance().state).toEqual(dummySession.me);
  });

  it('Should update user info', () => {
    const wrapper = shallow(<ManageProfile session={{}} {...props} />, { context });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.instance().state).toEqual(dummySession2.me);
  });

  it('Should render the component and N/A when state is not provided', () => {
    const wrapper = shallow(<ManageProfile session={{}} />, { context });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.instance().state).toEqual(dummySession2.me);
  });

  it('Should call handleInputChange on input change and update state', () => {
    const wrapper = shallow(<ManageProfile session={dummySession} />, { context });
    const event = {
      target: {
        name: 'currentPassword',
        value: 'Test1234'
      }
    };
    const event2 = {
      target: {
        name: 'newPassword',
        value: 'Test12345'
      }
    };
    const event3 = {
      target: {
        name: 'confirmPassword',
        value: 'Test12345'
      }
    };

    const spy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const previousState = wrapper.instance().state;
    wrapper.instance().handleInputChange(event);
    wrapper.instance().handleInputChange(event2);
    wrapper.instance().handleInputChange(event3);
    const currentState = wrapper.instance().state;

    expect(previousState.currentPassword).toBe('');
    expect(currentState.currentPassword).toBe(event.target.value);
    expect(previousState.newPassword).toBe('');
    expect(currentState.newPassword).toBe(event2.target.value);
    expect(previousState.confirmPassword).toBe('');
    expect(currentState.confirmPassword).toBe(event3.target.value);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('Should call handleClickShowPassword and update state', () => {
    const wrapper = shallow(<ManageProfile session={dummySession} />, { context });

    const spy = jest.spyOn(wrapper.instance(), 'handleClickShowPassword');
    const previousState = wrapper.instance().state;
    wrapper.instance().handleClickShowPassword('showCurrentPassword');
    wrapper.instance().handleClickShowPassword('showNewPassword');
    wrapper.instance().handleClickShowPassword('showConfirmPassword');
    const currentState = wrapper.instance().state;

    expect(previousState.showCurrentPassword).toBe(false);
    expect(currentState.showCurrentPassword).toBe(true);
    expect(previousState.showNewPassword).toBe(false);
    expect(currentState.showNewPassword).toBe(true);
    expect(previousState.showConfirmPassword).toBe(false);
    expect(currentState.showConfirmPassword).toBe(true);
    expect(spy).toHaveBeenCalledTimes(3);
  });

  it('Should call handleSubmit - Valid Data', () => {
    const wrapper = shallow(<ManageProfile session={dummySession} {...props} />, { context });
    const notify = jest.fn();
    window.scrollTo = jest.fn();
    wrapper.setState({
      currentPassword: 'Test1234',
      newPassword: 'Test12345',
      confirmPassword: 'Test12345'
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy2 = jest.spyOn(wrapper.instance().props, 'updatePassword');

    wrapper.instance().handleSubmit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveReturned();
  });

  it('Should call handleSubmit - Valid Data - Promise rejected', () => {
    const wrapper = shallow(<ManageProfile session={dummySession} {...propsInvalid} />, { context });
    const notify = jest.fn();
    window.scrollTo = jest.fn();
    wrapper.setState({
      currentPassword: 'Test1234',
      newPassword: 'Test12345',
      confirmPassword: 'Test12345'
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const spy2 = jest.spyOn(wrapper.instance().props, 'updatePassword');

    wrapper.instance().handleSubmit();
    wrapper.update();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveReturned();
  });

  it('Should call handleSubmit - No changed password', () => {
    const wrapper = shallow(<ManageProfile session={dummySession} {...props} />, { context });
    const error = {
      status: true,
      message: 'The password entered is the same as the old password'
    };
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    window.scrollTo = jest.fn();
    wrapper.setState({
      currentPassword: 'Test1234',
      newPassword: 'Test1234',
      confirmPassword: 'Test1234'
    });

    wrapper.instance().handleSubmit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(wrapper.instance().state.samePasswordError).toEqual(error);
  });

  it('Should call handleSubmit - Mismatching passwords', () => {
    const wrapper = shallow(<ManageProfile session={dummySession} {...props} />, { context });
    const error = {
      status: true,
      message: 'The password entered is the same as the old password'
    };
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    window.scrollTo = jest.fn();
    wrapper.setState({
      currentPassword: 'Test1234',
      newPassword: 'Test12346',
      confirmPassword: 'Test1234'
    });

    wrapper.instance().handleSubmit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(spy).toHaveReturned();
  });
});
