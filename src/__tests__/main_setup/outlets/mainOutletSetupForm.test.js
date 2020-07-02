import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { MainOutletSetupForm } from '../../../components/main_setup/outlets/mainOutletSetupForm';


MainOutletSetupForm.contextTypes = [PropTypes.string, PropTypes.func];

const context = ["hello", jest.fn()];

const props = {
  session: {
    me: {
      role: {
        name: 'Master Admin'
      },
      activeOutlet: {
        outletpreference: {
          outletTimezone: {
            name: 'Africa/Nairobi'
          }
        }
      }
    }
  },
  getAllCities: {
    cities: [
      {
        country: {
          name: 'Nigeria'
        },
        id: 1,
        name: 'Lagos'
      },

    ]
  },
  getAllCountries:{
    countries: [{
      id: 1,
      name: 'Nigeria'
    }]
  },
  history: {
    push: jest.fn()
  },
  createOutlet: jest.fn(
    () => new Promise((resolve) => {
      const data = {
        createOutlet: {
          outlet: {}
        }
      };
      const res = { data };
      return resolve(res);
    })
  ),
  updateOutlet: jest.fn(
    () => new Promise((resolve) => {
      const data = {
        updateOutlet: {
          outlet: {
            id: 2,
            name: 'Outlet 5'
          }
        }
      }
      return resolve( {data} )
    })
  ),

  classes: {}
}
let props2 = {}

describe('Add outlet Tests', () => {
  
  const wrapper = shallow(<MainOutletSetupForm {...props} />, { context });

  it('should find the save button', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Button))').length).toEqual(1);
  });

  it('Fills input to fields and submit form to save outlet', ()=>{
    const spy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const submitSpy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const textField = wrapper.find('WithStyles(ForwardRef(TextField))')
    textField.at(0).simulate('change', { target: { name: 'outletName', value: 'Outlet 1'}})
    textField.at(1).simulate('change', { target: { name: 'addressLine1', value: 'Address 1'}})
    textField.at(2).simulate('change', { target: { name: 'addressLine2', value: 'Address 2'}})
    textField.at(3).simulate('change', { target: { name: 'selectedCountry', value: 'Nigeria'}})
    textField.at(4).simulate('change', { target: { name: 'selectedCity', value: 'Lagos'}})
    textField.at(5).simulate('change', { target: { name: 'localGovernmentArea', value: 'lga'}})
    textField.at(6).simulate('change', { target: { name: 'phoneNumber', value: '0732012321'}})
    textField.at(7).simulate('change', { target: { name: 'dateLaunched', value: '2020/01/02'}})

    wrapper.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalled();
  })

});
describe('Edit outlet Tests with no error', () => {
  props2 = {
      ...props,
      location: {
        state: {
          outlet: {
            kind: {
              name: 'storefront'
            },
            id: 4,
            name: 'Outlet 4',
            city: {
              name: 'Lagos',
              country: {
                name: 'Nigeria'
              }
            },
            outletmetaSet: [
              {
                dataValue: '2020-01-02'
              }
            ],
            business: {
              addressLine1: 'Address Line 1',
              addressLine2: 'Address Line 2',
              phoneNumber: '0732013212'
            }
          }
        }
      },
    }
  const wrapper = shallow(<MainOutletSetupForm {...props2} />, { context });

  it('should find the back and save buttons', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Button))').length).toEqual(2);
  });
  it('should simulate the submit button to update outlet', async (done) => {
    const spy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const submitSpy = jest.spyOn(wrapper.instance(), 'handleUpdateOutlet');
    const textField = wrapper.find('WithStyles(ForwardRef(TextField))')
    textField.at(0).simulate('change', { target: { name: 'outletName', value: 'Outlet 1'}})
    textField.at(1).simulate('change', { target: { name: 'addressLine1', value: 'Address 1'}})

    wrapper.find('WithStyles(ForwardRef(Button))').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalled();
    done();
  });
  it('should simulate the back button', () => {
    wrapper.find('WithStyles(ForwardRef(Button))').at(0).simulate('click');
    expect(wrapper.find('WithStyles(ForwardRef(Button))').length).toEqual(2);
  });


});
describe('Edit outlet Tests with error', () => {
  const props3 = {
      ...props2,
      updateOutlet: jest.fn(
        () => new Promise((resolve, reject) => {
          const data = {
            error: new Error('gpl error')
          };
          const error = { data };
          return reject(error);
        })
      )
    }
  const wrapper = shallow(<MainOutletSetupForm {...props3} />, { context });


  it('should simulate the submit button to update outlet and throw an error', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleInputChange');
    const submitSpy = jest.spyOn(wrapper.instance(), 'handleUpdateOutlet');
    const textField = wrapper.find('WithStyles(ForwardRef(TextField))')
    textField.at(0).simulate('change', { target: { name: 'outletName', value: ''}})
    textField.at(1).simulate('change', { target: { name: 'addressLine1', value: 'Address 1'}})

    wrapper.find('WithStyles(ForwardRef(Button))').at(1).simulate('click');
    expect(spy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalled();
  });

});


