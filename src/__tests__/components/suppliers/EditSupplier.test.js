/* eslint-disable prefer-promise-reject-errors */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import wait from 'waait';
import { MockedProvider } from 'react-apollo/test-utils';
import * as moxios from 'moxios';
import PropTypes from 'prop-types';
import { EditSupplier } from '../../../components/suppliers/EditSupplier';
import { GET_COUNTRIES_CITIES } from '../../../queries/countryQuery';
import '../../../../__mocks__/window';

import { StateContext } from '../../../providers/stateProvider';

describe('Render Add Supplier component', () => {
  EditSupplier.contextTypes = [
    PropTypes.string,
    PropTypes.func
  ];

  const context = ['kitty', jest.fn()];

  jest.useFakeTimers();
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  const notify = jest.fn();
  const props = {
    match: {
      params: {
        id: 1
      }
    },
    session: {
      me: {
        mobileNumber: '254123123123',
        email: 'user@gmail.com',
        username: 'user',
        role: { name: 'Master Admin' },
        activeOutlet: {
          outletpreference: {
            outletTimezone: { name: 'Africa/Lagos' }
          }
        }
      }
    },
    addSupplier: jest.fn(
      () => new Promise((resolve) => {
        const data = {
          addSupplier: {
            supplier: {
              name: 'name',
              supplierId: 1
            }
          }
        };
        const res = { data };
        return resolve(res);
      })
    ),
    editSupplier: jest.fn(
      () => new Promise((resolve) => {
        const data = {
          editSupplier: {
            message: 'Edited'
          }
        };
        const res = { data };
        return resolve(res);
      })
    ),
    client: {
      query: jest.fn(
        () => new Promise((resolve) => {
          const data = {
            singleSupplier: {
              supplierMeta: [{
                displayName: 'x'
              }],
              supplierContacts: [{
                country: {},
                city: {}
              }],
              tier: {}
            }
          };
          const res = { data };
          return resolve(res);
        })
      ),
    },
    refetch: jest.fn(),
    history: { push: jest.fn() },
    getAttribute: jest.fn(),
    value: 'credit'
  };

  const propsFetchError = { ...props };
  propsFetchError.client = {
    query: jest.fn(
      () => new Promise((reject) => {
        const error = {
          graphQLErrors: [{
            message: 'Version approval failed!'
          }]
        };
        return reject(error);
      })
    )
  };

  const mocks = [
    {
      request: {
        query: GET_COUNTRIES_CITIES
      },
      result: {
        data: {
          outlet: {
            city: {
              id: '4',
              name: 'Lagos',
              country: {
                name: 'Nigeria_2019-09-04 14:29:24.435848+00:00'
              }
            }
          },
          countries: [
            {
              id: '4',
              name: 'South Sudan',
              citySet: [
                {
                  id: '10',
                  name: 'Juba'
                },
                {
                  id: '11',
                  name: 'Yambio'
                }
              ]
            },
            {
              id: '9',
              name: 'Nigeria',
              citySet: [
                {
                  id: '19',
                  name: 'Ido'
                },
                {
                  id: '20',
                  name: 'Lagos'
                },
                {
                  id: '21',
                  name: 'Abuja'
                }
              ]
            },
            {
              id: '11',
              name: 'Kenya',
              citySet: [
                {
                  id: '22',
                  name: 'Nairobi'
                },
                {
                  id: '23',
                  name: 'Mombasa'
                },
                {
                  id: '24',
                  name: 'Kitui'
                }
              ]
            }
          ]
        },
        error: 'x'
      }
    }
  ];

  const crop = {
    x: 0,
    y: 10,
    width: 200,
    height: 200,
    aspect: 1 / 1
  };

  const wrapper = shallow(<EditSupplier {...props} />, { context });

  const validFile = [
    {
      name: 'eucerin',
      size: 10000,
      type: 'image/jpg',
      lastModified: ''
    }
  ];

  const invalidFile = [
    {
      name: 'eucerin',
      size: 10000,
      type: 'text/csv',
      lastModified: ''
    }
  ];

  const data = [
    {
      name: 'eucerin',
      size: 10000,
      type: 'image/jpg',
      lastModified: ''
    }
  ];

  const largeFile = [
    {
      name: 'eucerin',
      size: 1000000000,
      type: 'image/jpg',
      lastModified: ''
    }
  ];

  const fileName = 'eucerin';

  it('renders data upon successful view', () => {
    mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <StateContext.Provider value={context}>
            <EditSupplier {...props} />
          </StateContext.Provider>
        </BrowserRouter>
      </MockedProvider>
    );
    wait(0);
  });
  it('should fail to fetch data', () => {
    const wrapperFetchError = shallow(<EditSupplier {...propsFetchError} />, { context });
    expect(wrapperFetchError.length).toEqual(1);
    expect(wrapperFetchError.state().name).toEqual('');
  });
  it('calls handle slider change function', () => {
    const attr = { value: undefined };
    const event = {
      target: {
        getAttribute: value => attr[value]
      }
    };
    wrapper.instance().handleSliderChange(event);
    expect(wrapper.state().creditDays).toEqual(event);
  });
  it('calls "handlesliderchange" function', () => {
    const event = 0;
    wrapper.instance().handleSliderChange(event);
    expect(wrapper.state().creditDays).toEqual(event);
  });
  it('calls "handleSliderInput" function', () => {
    const event = { target: { name: 'credit', value: '0' } };
    wrapper.instance().handleSliderChange(event);
    expect(wrapper.state().creditDays).toEqual(event.target.value);
  });
  it('calls "handleSliderInput" function', () => {
    const event = { target: { name: 'credit', value: '-3' } };
    wrapper.instance().handleSliderChange(event);
    expect(wrapper.state().creditDays).toEqual('0');
  });
  it('calls "handleSliderInput" function', () => {
    const event = { target: { name: 'credit', value: '99' } };
    wrapper.instance().handleSliderChange(event);
    expect(wrapper.state().creditDays).toEqual('45');
  });
  it('calls "handlesradiochange" function', () => {
    const event = { target: { value: 'credit' } };
    wrapper.instance().handleRadioChange(event);
    expect(wrapper.state().paymentTerms).toEqual('ON_CREDIT');
  });
  it('calls "handlesradiochange" function', () => {
    const event = { target: { value: 'delivery' } };
    wrapper.instance().handleRadioChange(event);
    expect(wrapper.state().paymentTerms).toEqual('CASH_ON_DELIVERY');
  });
  it('calls "handleChange" function', () => {
    const event = { target: { name: 'delivery' } };
    wrapper.instance().handleChange(event);
    expect(wrapper.state().paymentTerms).toEqual('CASH_ON_DELIVERY');
  });
  it('calls handle change comment function', () => {
    const event = {
      target: {
        value: 'comment'
      }
    };

    wrapper.instance().handleCommentChange(event);
    expect(wrapper.state().commentary).toEqual(event.target.value);
  });
  it('calls handle color change function', () => {
    const event = {};
    const colorHasChanged = true;

    wrapper.instance().handleColorChange(event);
    expect(wrapper.state().colorHasChanged).toEqual(colorHasChanged);
  });
  it('calls handle color city change function', () => {
    const event = {};
    const colorHasChangedCity = true;

    wrapper.instance().handleColorChangeCity(event);
    expect(wrapper.state().colorHasChangedCity).toEqual(colorHasChangedCity);
  });

  it('calls handle tier change function', () => {
    const event = {
      id: 1
    };

    wrapper.instance().handleTierChange(event);
    expect(wrapper.instance().state.tierId).toBe(1);
  });

  it('calls handle payment terms change function', () => {
    const event = {
      target: {
        value: 1
      }
    };

    wrapper.setState({ paymentTermsId: event.target.value });
    wrapper.instance().handlePaymentTermsChange(event);

    expect(wrapper.instance().state.paymentTermsId).toBe(1);
  });

  it('calls handle country change function', () => {
    const event = {
      value: 'Nigeria',
      label: 'Nigeria',
      citySet: [
        {
          id: 22,
          name: 'Nairobi'
        },
        {
          id: 23,
          name: 'Mombasa'
        },
        {
          id: 24,
          name: 'Kitui'
        }
      ]
    };

    wrapper.setState({
      countryValue: {
        label: event.label,
        value: event.value
      },
      cities: event.citySet
    });
    wrapper.instance().handleCountryChange(event);

    expect(wrapper.instance().state.cityId).toBe(22);
    expect(wrapper.instance().state.cityValue.label).toBe('Nairobi');
  });

  it('calls handle city change function', () => {
    const event = {
      label: 'Lagos',
      value: 'Lagos',
      id: 2
    };

    wrapper.setState({
      cityValue: {
        label: event.label,
        value: event.value
      },
      cityId: event.id
    });
    wrapper.instance().handleCityChange(event);

    expect(wrapper.instance().state.cityId).toBe(2);
    expect(wrapper.instance().state.cityValue.label).toBe('Lagos');
  });

  it('calls handle email change function and return error when email is not correct', () => {
    const event = {
      target: {
        value: 'email'
      }
    };

    wrapper.setState({ email: event.target.value });
    wrapper.instance().handleEmailChange(event);

    expect(wrapper.instance().state.email).toBe('email');
    expect(wrapper.instance().state.emailError).toBe(true);
    expect(wrapper.instance().state.emailHelperText).toBe('Invalid Email');
  });

  it('calls handle email change function and return no error when email is correct', () => {
    const event = {
      target: {
        value: 'email@email.com'
      }
    };

    wrapper.setState({ email: event.target.value });
    wrapper.instance().handleEmailChange(event);

    expect(wrapper.instance().state.email).toBe('email@email.com');
    expect(wrapper.instance().state.emailError).toBe(false);
    expect(wrapper.instance().state.emailHelperText).toBe('');
  });

  it('calls handle mobile change function and return no error when number is correct', () => {
    const value = '+2347030303030';

    wrapper.setState({ mobileNumber: value });
    wrapper.instance().handleMobileChange(value);

    expect(wrapper.instance().state.mobileNumber).toBe('+2347030303030');
    expect(wrapper.instance().state.mobileNumberError).toBe(false);
    expect(wrapper.instance().state.mobileHelperText).toBe('');
  });

  it('calls handle mobile change function and return error when number is inccorrect', () => {
    const value = '7030303030';

    wrapper.setState({ mobileNumber: value });
    wrapper.instance().handleMobileChange(value);

    expect(wrapper.instance().state.mobileNumber).toBe('7030303030');
    expect(wrapper.instance().state.mobileNumberError).toBe(true);
    expect(wrapper.instance().state.mobileHelperText).toBe('Invalid Phone Number');
  });

  it('calls handlePropose supplier', () => {
    const btnClicked = 'save';
    const message = 'test';
    wrapper.instance().handleEditSupplier(btnClicked);
    notify(message);
    expect(wrapper.state().loading).toBeTruthy();
  });

  it('calls handleSendForApproval', () => {
    const event = {
      currentTarget: {
        id: 'save'
      }
    };

    wrapper.instance().handleSendForApproval(event);
  });

  it('calls handleAddAnotherSupplier', () => {
    const btnClicked = 'save';

    wrapper.instance().handleEditSupplier(btnClicked);
    expect(setTimeout).toHaveBeenCalledTimes(6);
  });

  it('calls onSelectFile function on a large image file', () => {
    const e = {
      target: {
        files: largeFile
      }
    };
    wrapper.instance().onSelectFile(e);
  });

  it('calls handle drag image function ', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleDragOverImage');
    const acceptedFiles = [new Blob()];
    wrapper.instance().handleDragOverImage(acceptedFiles);
    expect(spy).toHaveBeenCalled();
  });
  it('calls onSelectFile function on a non-image file', () => {
    const e = {
      target: {
        files: invalidFile
      }
    };
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(e);
    expect(spy).toHaveBeenCalled();
  });
  it('calls onSelectFile function on a image file', () => {
    const validFileTwo = new File([new Blob()], 'image.jpg', {
      name: 'profile',
      size: 10000,
      type: 'image/jpg',
      lastModified: ''
    });
    const e = {
      target: {
        files: [validFileTwo]
      }
    };
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(e);
    expect(spy).toHaveBeenCalled();
  });

  it('calls getCroppedImage function', () => {
    const spy = jest.spyOn(wrapper.instance(), 'getCroppedImg');
    wrapper.instance().getCroppedImg(validFile, crop, fileName);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onCropChange function', () => {
    wrapper.instance().handleOnCropChange(crop);
    expect(wrapper.state().crop).toEqual(crop);
  });

  it('calls "handleChange" function', () => {
    const event = { target: { name: 'daily' } };
    wrapper.instance().handleChange(event);
  });

  it('calls "handleCancel" function', () => {
    wrapper.instance().handleCancel();
  });

  it('calls handleClose function', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleImageDrop');
    wrapper.instance().handleClose();
    wrapper.setState({ imageFile: validFile });
    expect(wrapper.state().src).toEqual('');
    expect(wrapper.state().open).toBeFalsy();
    wrapper.instance().handleImageDrop(wrapper.state().imageFile);
    expect(spy).toHaveBeenCalled();
  });

  it('calls handleSave function', () => {
    wrapper.instance().getCroppedImg = jest.fn(() => Promise.resolve(data));

    wrapper.instance().handleSave();
    wrapper.setState({
      src: 'image-src',
      fileName: 'eucerin',
      crop
    });
    expect(wrapper.instance().getCroppedImg).toHaveBeenCalled();
  });
  it('calls handleProposeSupplier function', () => {
    const newProps = {
      ...props,
      addSupplier: jest.fn(
        () => new Promise((resolve, reject) => reject({
          graphQLErrors: [
            {
              message: 'error'
            }
          ]
        }))
      )
    };
    wrapper.instance().handleEditSupplier();
    wrapper.setProps(newProps);
  });
  it('should disble the save button', () => {
    wrapper.setState({
      name: 'jean',
      email: 'jo@jo.co',
      mobileNumber: '123',
      mobileNumberError: '',
      addressLine1: 'town',
      cityId: '4',
      countryId: '4',
      tierId: '4',
      paymentTerms: 'ON_CREDIT',
      isDisabled: false,
      creditDays: '',
    });
    expect(wrapper.find('Btn').length).toBe(0);
  });
});
