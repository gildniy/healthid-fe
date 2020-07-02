import React from 'react';
import { shallow } from 'enzyme';
import { AddUser } from '../../../components/main_setup/users/addUser';
import { SetupHeader } from '../../../assets/styles/setup';
import PropTypes from 'prop-types';

const session = {
    me: {
        outlets: [
            {
                id: '1',
                kind: {
                    name: 'warehouse'
                },
                name: 'any',
                users: [
                    {
                        email: 'someone@email.com',
                        id: 'user1',
                        jobTitle: 'cs',
                        role: {
                            id: 'role1',
                            name: 'cashier'
                        },
                        username: 'someone'
                    }
                ]
            }
        ],
        businessUser: {
          addressLine1: 'somewhere',
          addressLine2: 'somewhere',
          city: 'somewhere',
          country: 'somewhere',
          localGovernmentArea: 'somewhere',
          businessEmail: 'someone@gmail.com',
          facebook: 'www.facebook.com/someone',
          instagram: 'www.instagram.com/someone',
          legalName: 'someone',
          phoneNumber: '+1234567890',
          tradingName: 'someone',
          twitter: 'www.twitter.com/someone',
          website: 'www.someone.com',
          logo: 'logo.jpg'
        }
    }
};

const results = {
  data: {
    data: {
      success: ['user added']
    }
  }
};

const props = {
    session,
    addNewUser: jest.fn(() => Promise.resolve(results)),
    history: {
      push: jest.fn()
    }
}

const state = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    role: '',
    outlet: '',
    target: '',
    jobTitle: '',
    startingDate: '2020-01-01',
    roles: '',
    outlets: '',
    formError: false,
    active: false,
    saveButtonStyle: SetupHeader.saveButton,
    addButtonStyle: SetupHeader.addButton,
  }

  AddUser.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

const context = ["kitty", jest.fn()];

describe('Add User component tests', () => {
  const wrapper = shallow(<AddUser {...props} />, { context })

    beforeEach(() => {
        wrapper.setState({
            ...state
        })
      })

    it('should render the component', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should call the componentWillReceiveProps', () => {
      const nextProps = {
        userRoles: {
         roles: [
            {
              id: 1,
              name: 'cashier'
            },
            {
              id: 2,
              name: 'admin'
            }
          ]
        }
      };
  
      const spyOnWillReceiveProps = jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
  
      wrapper.instance().componentWillReceiveProps(nextProps);
  
      expect(spyOnWillReceiveProps).toHaveBeenCalledWith(nextProps);
    });

    it('should fill up and submit the form', () => {
      const textFieldOne = {
        target: {
          name: 'firstName',
          value: 'someone'
        }
      };
  
      const textFieldTwo = {
        target: {
          name: 'lastName',
          value: 'someone'
        }
      };
  
      const textFieldThree = {
        target: {
          name: 'userName',
          value: 'someone'
        }
      };
  
      const textFieldFour = {
        target: {
          name: 'email',
          value: 'someone@email.com'
        }
      };
  
      const textFieldFive = {
        target: {
          name: 'phoneNumber',
          value: '+2503786238462'
        }
      };
  
      const textFieldSix = {
        target: {
          name: 'role',
          value: 'cashier'
        }
      };
  
      const textFieldSeven = {
        target: {
          name: 'outlet',
          value: 'fest'
        }
      };

      const textFieldEight = {
        target: {
          name: 'jobTitle',
          value: 'mr. cashier'
        }
      };

        const textFieldNine = {
          target: {
            name: 'startingDate',
            value: '2020-01-10'
          }
        };
  
      wrapper.instance().handleInPutChange(textFieldOne);
      expect(wrapper.state('firstName')).toBe('someone');
  
      wrapper.instance().handleInPutChange(textFieldTwo);
      expect(wrapper.state('lastName')).toBe('someone');
  
      wrapper.instance().handleInPutChange(textFieldThree);
      expect(wrapper.state('userName')).toBe('someone');
  
      wrapper.instance().handleInPutChange(textFieldFour);
      expect(wrapper.state('email')).toBe('someone@email.com');
  
      wrapper.instance().handleInPutChange(textFieldFive);
      expect(wrapper.state('phoneNumber')).toBe('+2503786238462');
  
      wrapper.instance().handleInPutChange(textFieldSix);
      expect(wrapper.state('role')).toBe('cashier');
  
      wrapper.instance().handleInPutChange(textFieldSeven);
      expect(wrapper.state('outlet')).toBe('fest');

      wrapper.instance().handleInPutChange(textFieldEight);
      expect(wrapper.state('jobTitle')).toBe('mr. cashier');

      wrapper.instance().handleInPutChange(textFieldNine);
      expect(wrapper.state('startingDate')).toBe('2020-01-10');
  
      expect(wrapper.state('active')).toBe(false);
      expect(wrapper.state('saveButtonStyle')).toBe(SetupHeader.saveButton);
      expect(wrapper.state('addButtonStyle')).toBe(SetupHeader.addButton);
  
      const addButton = wrapper.find('WithStyles(ForwardRef(Button))').at(1);
      const saveButton = wrapper.find('WithStyles(ForwardRef(Button))').at(2);
  
      addButton.simulate('click');
      saveButton.simulate('click');
    });
});