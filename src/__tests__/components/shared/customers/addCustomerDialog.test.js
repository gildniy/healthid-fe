import React from 'react';
import { mount, shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { MockedProvider } from 'react-apollo/test-utils';
import wait from 'waait';
import {AddCustomerDialog} from '../../../../components/shared/customers/addCustomerDialog';
import CREATE_CUSTOMER from '../../../../mutations/sellScreen/createCustomerMutation';
import EDIT_CUSTOMER from '../../../../mutations/sellScreen/editCustomerMutation';
import { StateContext } from '../../../../providers/stateProvider';

const customers = {
  firstName: 'John',
  lastName: 'Paul',
  email: 'jo@po.com',
  id: '1',
  primaryMobileNumber: 123,
  secondaryMobileNumber: 456,
  loyaltyMember: true,
  cityId: '1',
  cities: [{name: 'Kampala', id: '1' }],
  countryId: '10',
  emergencyContactName: 'Kelly',
  emergencyContactEmail: 'Paul',
  emergencyContactNumber: 789,
  isSelected: '',
  formError: '',
  serverError: '',
};

const countries = [{
  id: '10',
  name: 'Uganda',
  citySet: [{name: 'Kampala', id: '1' }]
}]

const context = [{ customers, countries }, jest.fn()]

const props = {
  updateCustomers: jest.fn(),
};
describe('AddCustomerDialog', () => {
  let wrapper = mount((
    <MockedProvider mocks={[]}>
      <StateContext.Provider value={context}>
        <AddCustomerDialog {...props} />
      </StateContext.Provider>
    </MockedProvider>
  ));

  it('should render without fail', () => {
    expect(wrapper.find('Mutation').length).toBe(2);
  });
  it('should render loading state initially', () => {
    const createCustomer = {
      customer: {
        addressLine1: null,
        city: {
          id: '6',
          name: 'Abuja'
        },
        country: {
          id: '3',
          name: 'Nigeria'
        },
        email: null,
        emergencyContactEmail: null,
        emergencyContactName: null,
        emergencyContactNumber: null,
        firstName: 'Dan',
        id: '81',
        lastName: 'Abedi',
        localGovernmentArea: null,
        loyaltyMember: false,
        primaryMobileNumber: null,
        secondaryMobileNumber: null,
      },
      message: 'Customer Created successfully'
    };
    const mocks = [
      {
        request: {
          query: CREATE_CUSTOMER,
          variables: {
            cityId: 1,
            countryId: 3,
            email: '',
            emergencyContactEmail: '',
            emergencyContactName: '',
            emergencyContactNumber: '',
            firstName: '',
            lastName: '',
            loyaltyMember: false,
            primaryMobileNumber: '',
            secondaryMobileNumber: ''
          },
        },
        result: { data: { createCustomer } },
      },
    ];
    wrapper = mount((
      <MockedProvider mocks={mocks} addTypename={false}>
        <StateContext.Provider value={context}>
          <AddCustomerDialog {...props} />
        </StateContext.Provider>
      </MockedProvider>
    ));
  });

  describe('functions', () => {
    AddCustomerDialog.contextTypes = [
      PropTypes.object,
      PropTypes.func
    ];

    const contextState = {
      customers,
      countries
    };
    
    const context = [contextState, jest.fn()]

    const wrapper = shallow(
        <AddCustomerDialog {...props} />, {context}
    );

    it('handle PrimaryPhoneChange', () => {
      const value = '+234239094';
      wrapper.instance().handlePrimaryPhoneChange(value);
    expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle SecondaryPhoneChange', () => {
      const value = '+234239094';
      wrapper.instance().handleSecondaryPhoneChange(value);
    expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle ContactPhoneChange', () => {
      const value = '+234239094';
      wrapper.instance().handleContactPhoneChange(value);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle setLocale', () => {
      const value = 'Uganda';
      wrapper.instance().setLocale(value);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle setCityId', () => {
      const value = 'Kampala';
      wrapper.instance().setCityId(value);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle InputChange with firstName', () => {
      const event = {
        target: { name: 'firstName', value: 'jo', checked: true }
      };
      wrapper.instance().handleInputChange(event);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle InputChange with loyaltyMember', () => {
      const event = {
        target: { name: 'loyaltyMember', value: 'jo', checked: true }
      };
      wrapper.instance().handleInputChange(event);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle InputChange with email', () => {
      const event = {
        target: { name: 'email', value: 'jo', checked: true }
      };
      wrapper.instance().handleInputChange(event);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle InputChange with primaryMobileNumber', () => {
      const event = {
        target: { name: 'primaryMobileNumber', value: 'jo', checked: true }
      };
      wrapper.instance().handleInputChange(event);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle InputChange with secondaryMobileNumber', () => {
      const event = {
        target: { name: 'secondaryMobileNumber', value: 'jo', checked: true }
      };
      wrapper.instance().handleInputChange(event);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle InputChange with country', () => {
      const event = {
        target: { name: 'country', value: 'Uganda', checked: true }
      };
      wrapper.instance().handleInputChange(event);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle InputChange with city', () => {
      const event = {
        target: { name: 'city', value: 'Kampala', checked: true }
      };
      wrapper.instance().handleInputChange(event);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handles add Customer Button with Null "isSelected"', () => {
      const spy = jest.spyOn(wrapper.instance(), 'removeEmptyFields')
      const results = { data: { createCustomer: { message: '' } } };
      const event = {
        preventDefault: jest.fn()
      };
      const createCustomer = jest.fn().mockResolvedValue(results);
      const editCustomerBasicProfile = jest.fn();
      wrapper.instance().handleAddCustomerButton(event, createCustomer, editCustomerBasicProfile);
      expect(spy).toHaveBeenCalled();
    });
    it('handles add Customer Button with error', () => {
      const error = { message: 'Async error' };
      const event = {
        preventDefault: jest.fn()
      };
      const createCustomer = jest.fn().mockRejectedValueOnce(new Error(error));
      const editCustomerBasicProfile = jest.fn();
      wrapper.instance().handleAddCustomerButton(event, createCustomer, editCustomerBasicProfile);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
   it('handles edit Customer Button without error', () => {
      customers.isSelected = true;
      const results = { data: { editCustomerBasicProfile: { message: '' } } };
      const event = {
        preventDefault: jest.fn()
      };
      const createCustomer = jest.fn();
      const editCustomerBasicProfile = jest.fn().mockResolvedValue(results);
      wrapper.instance().handleAddCustomerButton(event, createCustomer, editCustomerBasicProfile);
    });
    it('handles edit Customer Button with error', () => {
      customers.isSelected = true;
      const error = { message: 'Async error' };
      const event = {
        preventDefault: jest.fn()
      };
      const createCustomer = jest.fn();
      const editCustomerBasicProfile = jest.fn().mockRejectedValueOnce(new Error(error));
      wrapper.instance().handleAddCustomerButton(event, createCustomer, editCustomerBasicProfile);
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
    it('handle CustomerDialogClose', () => {
      wrapper.instance().handleCustomerDialogClose();
      expect(wrapper.context()[1]).toHaveBeenCalled;
    });
  });
});
