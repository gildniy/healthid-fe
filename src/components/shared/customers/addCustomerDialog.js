import React, { Component } from 'react';
import _ from 'lodash';
import { withApollo } from 'react-apollo';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import notify from '../Toaster';
import {
  validateName, validateEmail, validatePhone
} from '../../utils/validations';
import { addCustomerDialog } from '../../../assets/css/sellScreenStyles';
import OfflineMutation from '../../../graphql/offline/offlineMutation';
import { CUSTOMERS } from '../../../queries/customersQuery';
import CREATE_CUSTOMER from '../../../mutations/sellScreen/createCustomerMutation';
import EDIT_CUSTOMER from '../../../mutations/sellScreen/editCustomerMutation';
import CustomerActionTypes from '../../../providers/reducers/customers/customerTypes';
import RenderCustomerDialog from './renderCustomerDialog';

import { StateContext } from '../../../providers/stateProvider';

const styles = addCustomerDialog;

export class AddCustomerDialog extends Component {
  handlePrimaryPhoneChange = (value) => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: {
        primaryMobileNumber: value,
        formError: false,
        mobileError: false,
      }
    });
  };

  handleSecondaryPhoneChange = (value) => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: { secondaryMobileNumber: value }
    });
  };

  handleContactPhoneChange = (value) => {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: { emergencyContactNumber: value, }
    });
  };

  setLocale = (label) => {
    const [{ countries }, dispatch] = Object.values(this.context);
    const location = countries.find(item => item.name === label);
    const randomCity = _.sample(location.citySet);
    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: {
        cities: location.citySet,
        city: randomCity.name,
        cityId: Number(randomCity.id),
        country: label,
        countryId: Number(location.id)
      }
    });
    return label;
  };

  setCityId = (label) => {
    const [{ customers: { cities } }, dispatch] = Object.values(this.context);
    const location = cities && cities.find(item => item.name === label);
    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: {
        city: label,
        cityId: Number(location.id)
      }
    });
    return label;
  };

  handleCountryInput = ({ label }) => {
    this.setLocale(label);
  }

  handleCityInput = ({ label }) => {
    this.setCityId(label);
  }

  handleInputChange = (event) => {
    const [, dispatch] = Object.values(this.context);
    const { name, checked } = event.target;
    let { value } = event.target;
    if (name === 'firstName') {
      const checkName = validateName(value);
      dispatch({
        type: CustomerActionTypes.SET_CUSTOMER_VALUE,
        payload: {
          nameHelper: checkName[0],
          nameError: checkName[1],
          formError: checkName[1],
        }
      });
    }

    if (name === 'loyaltyMember') value = checked;

    if (name === 'email') {
      const checkEmail = validateEmail(value);
      dispatch({
        type: CustomerActionTypes.SET_CUSTOMER_VALUE,
        payload: {
          emailHelper: checkEmail[0],
          emailError: checkEmail[1],
          formError: checkEmail[1],
        }
      });
    }

    if (name === 'primaryMobileNumber') {
      const checkPhone = validatePhone(value);
      dispatch({
        type: CustomerActionTypes.SET_CUSTOMER_VALUE,
        payload: {
          mobileHelper: checkPhone[0],
          mobileError: checkPhone[1],
          formError: checkPhone[1]
        }
      });
    }

    if (name === 'secondaryMobileNumber') {
      const checkPhone = validatePhone(value);
      dispatch({
        type: CustomerActionTypes.SET_CUSTOMER_VALUE,
        payload: {
          phoneHelper: checkPhone[0],
          phoneError: checkPhone[1],
          formError: checkPhone[1]
        }
      });
    }

    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: { [name]: value }
    });
  };

  validateCustomerDialogInputs = () => {
    const [{
      customers: {
        firstName, cityId, countryId, formError, serverError
      }
    }] = Object.values(this.context);
    const isInvalid = !firstName || firstName.length < 3 || !cityId
      || !countryId || formError || serverError;
    return isInvalid;
  };

  updateCache = (customer, dispatch, isSelected) => {
    const { client } = this.props;
    const { customers } = client.readQuery({ query: CUSTOMERS });
    const {
      id, firstName, lastName, email, primaryMobileNumber,
      secondaryMobileNumber, region, loyaltyMember, city, cityId,
      country, countryId, address, emergencyContactName,
      emergencyContactEmail, emergencyContactNumber, selectedCustomer
    } = customer;
    const { id: customerId } = customers[0];
    let newId = Number(customerId);
    newId += 1;

    const points = selectedCustomer?.loyaltyPoints || 0;

    const data = {
      id: isSelected ? id : newId.toString(),
      city: { id: cityId, name: city, __typename: 'CityType' },
      country: { id: countryId, name: country, __typename: 'CountryType' },
      email,
      emergencyContactEmail,
      emergencyContactName,
      emergencyContactNumber,
      firstName,
      lastName,
      loyaltyMember,
      primaryMobileNumber,
      secondaryMobileNumber,
      addressLine1: address,
      localGovernmentArea: region,
      loyaltyPoints: points,
      wallet: null,
      saleSet: [],
      __typename: 'CustomerCustomerType'
    };
    if (!isSelected) this.addCacheCustomer(customers, data, client);
    else this.updateCacheCustomer(customers, data, client, customer);

    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: { selectedCustomer: data }
    });
    this.resetState(dispatch);
  }

  addCacheCustomer = (customers, data, client) => {
    customers.unshift(data);
    client.writeQuery({
      query: CUSTOMERS,
      data: { customers }
    });
    notify('Customer, created successfully!');
  }

  updateCacheCustomer = (customers, data, client, customer) => {
    const { id, firstName } = customer;
    const index = customers.findIndex(x => x.id === id);
    const newCustomers = [
      ...customers.slice(0, index),
      Object.assign({}, customers[index], data),
      ...customers.slice(index + 1)
    ];
    client.writeQuery({
      query: CUSTOMERS,
      data: { customers: newCustomers }
    });
    notify(`${firstName}'s profile updated successfully!`);
  }

  resetState = (dispatch) => {
    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: {
        openDialog: false,
        isLoading: false,
        firstName: '',
        lastName: '',
        isSelected: '',
        id: '',
        email: '',
        primaryMobileNumber: '',
        secondaryMobileNumber: '',
        loyaltyMember: false,
        region: '',
        emergencyContactName: '',
        emergencyContactEmail: '',
        emergencyContactNumber: '',
      }
    });
  }

  removeEmptyFields = (obj) => {
    Object.keys(obj).forEach(key => (obj[key] == null || obj[key] === '') && delete obj[key]);
    return obj;
  };

  handleButton = (event, createCustomer, editCustomer) => {
    event.preventDefault();
    const [{ customers }, dispatch] = Object.values(this.context);
    const {
      firstName, lastName, email, id, primaryMobileNumber, region,
      secondaryMobileNumber, loyaltyMember, cityId, countryId, address,
      emergencyContactName, emergencyContactEmail, emergencyContactNumber,
      isSelected,
    } = customers;
    dispatch({
      type: CustomerActionTypes.SET_CUSTOMER_VALUE,
      payload: { isLoading: true }
    });
    const data = {
      cityId,
      countryId,
      email,
      emergencyContactEmail,
      emergencyContactName,
      emergencyContactNumber,
      id,
      firstName,
      lastName,
      loyaltyMember,
      primaryMobileNumber,
      secondaryMobileNumber,
      localGovernmentArea: region,
      addressLine1: address
    };
    this.removeEmptyFields(data);

    if (!isSelected) {
      createCustomer({
        variables: { ...data },
        optimisticResponse: {
          __typename: 'Mutation'
        },
        update: this.updateCache(customers, dispatch, isSelected)
      }).then(() => {
        this.resetState(dispatch);
      }).catch((error) => {
        const errMsg = error.message.slice(14);
        notify(errMsg);
        dispatch({
          type: CustomerActionTypes.SET_CUSTOMER_VALUE,
          payload: {
            mobileError: true,
            formError: true,
            mobileHelper: errMsg,
            isLoading: false
          }
        });
      });
    } else {
      editCustomer({
        variables: { ...data },
        optimisticResponse: {
          __typename: 'Mutation'
        },
        update: this.updateCache(customers, dispatch, isSelected)
      }).then(() => {
        this.resetState(dispatch);
      }).catch((error) => {
        const errMsg = error.message.slice(14);
        notify(errMsg);
        dispatch({
          type: CustomerActionTypes.SET_CUSTOMER_VALUE,
          payload: {
            mobileError: true,
            formError: true,
            mobileHelper: errMsg,
            isLoading: false
          }
        });
      });
    }
  };

  handleCustomerDialogClose = () => {
    const [, dispatch] = Object.values(this.context);
    this.resetState(dispatch);
  };

  static contextType = StateContext;

  render() {
    const [{ customers, countries }] = Object.values(this.context);
    return (
      <OfflineMutation mutation={CREATE_CUSTOMER}>
        {createCustomer => (
          <OfflineMutation mutation={EDIT_CUSTOMER}>
            {editCustomer => (
              <RenderCustomerDialog
                customers={customers}
                countries={countries}
                handleButton={e => this.handleButton(e, createCustomer, editCustomer)}
                handleInputChange={this.handleInputChange}
                handleCountryInput={this.handleCountryInput}
                handleCityInput={this.handleCityInput}
                handlePrimaryPhoneChange={this.handlePrimaryPhoneChange}
                handleSecondaryPhoneChange={this.handleSecondaryPhoneChange}
                handleContactPhoneChange={this.handleContactPhoneChange}
                handleCustomerDialogClose={this.handleCustomerDialogClose}
                validateCustomerDialogInputs={this.validateCustomerDialogInputs}
              />
            )}
          </OfflineMutation>
        )}
      </OfflineMutation>
    );
  }
}

AddCustomerDialog.propTypes = {
  client: PropTypes.instanceOf(Object),
};

AddCustomerDialog.defaultProps = {
  client: {},
};

export default withStyles(styles)(withApollo(AddCustomerDialog));
