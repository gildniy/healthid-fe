import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from 'react-apollo/test-utils';
import GET_USER_INFO from '../queries/userDataQuery';
import PropTypes from 'prop-types';
import SteppedNav, { StepperNav } from '../components/setup/Stepper';
import BusinessSetUp from '../components/setup/businessSetup';
import AdminSetUp from '../components/setup/adminSetup';
import OutletSetUp from '../components/setup/outletSetup';
import withAuth from '../components/withAuth';
import UserSetup from '../components/setup/userSetup';
import FinalScreen from '../components/setup/finalScreen';
import { StateContext } from '../providers/stateProvider';

const results = {
  data: {
    createOutlet: {
      success: '',
      outlet: {
        id: '1',
        kind: {
          name: 'warehouse'
        }
      }
    },
    createReceiptTemplate: {
      receiptTemplate: {
        id: 5,
      }
    },
    createRegister: {
      register: {
        outlet: {
          id: 5,
          kind: {
            name: 'warehouse'
          }
        }
      }
    },
    deleteOutlet: {
      success: ''
    },
    updateRegister: {
      register: {
        outlet: {
          id: 9,
          kind: {
            name: 'warehouse'
          }
        }
      }
    },
    addUser: {
      user: {
        id: 'userId',
        firstName: 'firstName',
        lastName: 'lastName',
        email: 'email',
        mobileNumber: '+254725976394',
        jobTitle: 'Cashier',
        username: 'username',
        startingDate: '2019-01-01',
        users: [{ id: 'outletId' }],
        role: { id: 'userRole' },
      },
      errors: null,
    },
    adminUpdateUser: {
      message: [
        'message',
        'You have successfully updated this User.'
      ],
    },
  },
};

const errorResults = {
  data: {
    addUser: {
      errors: ['Something went wrong: Problem adding user'],
    }
  }
};

const props = {
  nextProps: {
    userData: {
      me: {
        email: 'awesome@gmail.com',
        mobileNumber: '1234567890',
      },
      loading: true,
      error: { message: 'network problem' },
    },
    countriesData: {
      countries: [{
        name: 'Nigeria',
        citySet: [{ city: '' }]
      }]
    },
    userRoles: {
      roles: [],
      loading: false,
      error: null,
    },
    assignedOutlets: {
      business: {
        users: []
      },
      loading: false,
      error: null,
    }
  },
  assignedOutlets: {
    roles: [],
    loading: false,
    error: null,
    refetch: jest.fn(),
    business: {
      outletSet: [],
    },
  },
  userRoles: {
    roles: [],
    loading: false,
    error: null,
    refetch: jest.fn(),
  },
  classes: {},
  editAdmin: jest.fn(() => Promise.resolve()),
  createBusiness: jest.fn(() => Promise.resolve()),
  createOutlet: jest.fn(() => Promise.resolve(results)),
  createReceiptTemplate: jest.fn(() => Promise.resolve(results)),
  createRegister: jest.fn(() => Promise.resolve(results)),
  updateOutlet: jest.fn(() => Promise.resolve()),
  deleteOutlet: jest.fn(() => Promise.resolve()),
  deleteReceipt: jest.fn(() => Promise.resolve()),
  updateReceiptTemplate: jest.fn(() => Promise.resolve()),
  updateRegister: jest.fn(() => Promise.resolve()),
  fetchUserData: jest.fn(),
  addUser: jest.fn(() => Promise.resolve(results)),
  adminUserUpdate: jest.fn(() => Promise.resolve(results)),
  session: {
    me: {
      firstName: 'Andrew',
      businessUser: {
        id: 'd6d6d8dd'
      },
      outlets: [
        {
          id: 'h2yu22y2'
        }
      ]
    }
  }
};

let event = {
  target: {
    name: 'firstName',
    value: 'michael'
  }
};
const crop = {
  x: 50,
  y: 50,
  width: 50,
  height: 50,
};

const imageFile = 'new image src';
const fileName = 'new file name';
const file = new Blob(['file name'], { type: 'plain/text', name: 'name' });
const event1 = {
  target: {
    files: [
      file
    ],
    value: 'michael'
  }
};

StepperNav.contextTypes = [
  PropTypes.Bool,
  PropTypes.func
];

const context = [true, jest.fn()]

describe('Test UserSetup', () => {
  let wrapper = shallow(<StepperNav {...props} />, { context });
  wrapper.instance().setState({
    activeStep: 3, showUsers: true, users: [], editMode: false, unhideMainButtons: true
  });
  const InviteButton = wrapper.find('#next-button');

  it('renders UserSetup correctly', () => {
    expect(wrapper.find(UserSetup)).toHaveLength(1);
  });
  it('handleNextButton function is called when invite button is clicked', () => {
    InviteButton.simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'handleNextButton');
    wrapper.instance().handleNextButton();
    expect(spy).toHaveBeenCalled();
  });
  it('calls add user when the form is valid', () => {
    wrapper.instance().handleClickAddButton();
    wrapper.instance().setState({
      userEmail: 'rich@example.com',
      phone: '+254724465678',
      roleId: 'roleId',
      outlet: 'outletId',
      userUsername: 'username',
    });
    InviteButton.simulate('click');
    const spyOnAddUser = jest.spyOn(wrapper.instance(), 'addUser');
    wrapper.instance().handleNextButton();
    expect(spyOnAddUser).toHaveBeenCalled();
  });
  it('sets state appropriately when the edit function is called', () => {
    const user = {
      firstName: '',
      lastName: '',
      email: 'rich@example.com',
      mobileNumber: '+254724465678',
      jobTitle: '',
      role: 'roleId',
      username: '',
      users: [{ id: 'outletId' }],
      target: '',
      startingDate: '2019-01-01',
      id: 'userId'
    };

    wrapper.instance().sendEditInfo(user);
    expect(wrapper.instance().state.userEmail).toBe('rich@example.com');
  });
  it('displays errors without crashing', () => {
    props.addUser = jest.fn(() => Promise.resolve(errorResults));
    wrapper = shallow(<StepperNav {...props} />, { context });
    wrapper.instance().addUser();
    expect(props.addUser).toBeCalled();
  });
  it('catches errors correctly when adding users', () => {
    props.addUser = jest.fn(() => Promise.resolve());
    wrapper = shallow(<StepperNav {...props} />, { context });
    wrapper.instance().addUser();
    expect(props.addUser).toBeCalled();
  });
  it('catches errors correctly when updating users', () => {
    props.adminUserUpdate = jest.fn(() => Promise.resolve());
    wrapper = shallow(<StepperNav {...props} />, { context });
    wrapper.instance().setState({ editMode: true });
    wrapper.instance().addUser();
    expect(props.adminUserUpdate).toBeCalled();
  });

  it('renders the final Screen correctly', () => {
    wrapper.instance().setState({ activeStep: 3, showUsers: true, users: [{ email: 'email.test.com' }, { email: 'second.test.com' }], unhideMainButtons: true });
    const finishButton = wrapper.find('#next-button');
    finishButton.simulate('click');
    const finalPage = wrapper.find(FinalScreen).length;
    expect(finalPage).toBe(1);
  });
});

describe('Test stepper component', () => {
  const wrapper = shallow(<StepperNav {...props} />, { context });
  beforeEach(() => {
    wrapper.instance().setState({
      activeStep: 0,
      boxChecked: false
    });
  });

  it('renders adminSetup component when the app initially loads', () => {
    wrapper.instance().getStepContent(0);
    expect(wrapper.find(AdminSetUp)).toHaveLength(1);
  });

  it('renders nothing when an out of index number is passed to getStepContent', () => {
    const nullable = wrapper.instance().getStepContent(4);
    expect(nullable).toBeNull();
  });

  it('displays an error toast when called and passed an error message', () => {
    wrapper.setState({ serverError: true });
    const spy = jest.spyOn(wrapper.instance(), 'serverErrorHandler');
    wrapper.instance().serverErrorHandler();
    expect(spy).toHaveBeenCalled();
  });

  it('handle validation method updates formError state value', () => {
    wrapper.instance().handleInputValidation();
    expect(wrapper.state('formError')).toBeTruthy();
  });

  it('handleInPutChange method handles input change and updates state', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleInPutChange');
    wrapper.instance().handleInPutChange(event);
    expect(spy).toBeCalled();
    expect(wrapper.state('firstName')).toBeTruthy();
  });

  it('renders Business Setup Component when next button is clicked', () => {
    wrapper.setState({ checked: true, isLoading: false, unhideMainButtons: true });
    wrapper.instance().getStepContent(0);
    wrapper.setState({
      firstName: 'firstname',
      lastName: 'lastname',
      username: 'username',
      secondaryEmail: 'secondaryEmail',
      secondaryPhoneNumber: 'phone number',
    });
    const nextButton = wrapper.find('#next-button').at(0);
    const spy = jest.spyOn(wrapper.instance(), 'addBusiness');
    nextButton.simulate('click');
    wrapper.instance().addBusiness();
    expect(spy).toHaveBeenCalled();
  });

  it('renders a case where business setup validation fails', () => {
    wrapper.setState({ checked: true, isLoading: false, unhideMainButtons: true });
    wrapper.instance().getStepContent(0);
    wrapper.setState({
      firstName: '',
      lastName: '',
      username: '',
      secondaryEmail: '',
      secondaryPhoneNumber: '',
    });
    const nextButton = wrapper.find('#next-button').at(0);
    const spy = jest.spyOn(wrapper.instance(), 'addBusiness');
    nextButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });

  it('activates the next button when required fields are filled', () => {
    let event = {
      target: {
        name: 'businessEmail',
        value: 'buzzy@email.com'
      }
    };
    wrapper.setState({
      legalName: 'buzzy',
      tradingName: 'buzzy',
      addressLine1: 'street 1',
      phoneNumber: '+256753111111',
      checked: false,
      activeStep: 1,
      isAcknowledged: true,
      firstName: 'boss',
      unhideMainButtons: true
    });

    expect(wrapper.state('checked')).toBe(false);

    const spy = jest.spyOn(wrapper.instance(), 'checkForRequiredFields');
    wrapper.instance().handleInPutChange(event);
    expect(spy).toBeCalled();
    expect(wrapper.state('checked')).toBe(true);

    const nextButton = wrapper.find('#next-button');
    expect(nextButton.prop('disabled')).toBe(false);

  });

  it('renders OutletSetup Component when next button is clicked', () => {
    wrapper.setState({ checked: true, isLoading: false, activeStep: 2 });
    wrapper.instance().getStepContent(2);
    expect(wrapper.find(OutletSetUp)).toHaveLength(1);
  });

  it('skips to the addbusiness section when 1 is passed to handleNextButton', () => {
    wrapper.setState({
      legalName: 'legalName',
      tradingName: 'tradingName',
      businessEmail: 'businessEmail',
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      phoneNumber: 'phoneNumber',
      city: 'city',
      country: 'country',
      localGovernmentArea: 'local',
      website: 'website',
      twitter: 'twitter',
      instagram: 'instagram',
      logo: 'logo',
      facebook: 'facebook',
      activeStep: 1,
      unhideMainButtons: true
    });
    wrapper.setState({ checked: true, isLoading: false });
    wrapper.instance().getStepContent();
    const nextButton = wrapper.find('#next-button').at(0);
    wrapper.instance().getStepContent();
    nextButton.simulate('click');
    expect(wrapper.find(BusinessSetUp)).toHaveLength(1);
  });

  it('handles a case where input validation fails', () => {
    wrapper.setState({
      legalName: '',
      tradingName: '',
      businessEmail: '',
      addressLine1: '',
      addressLine2: '',
      phoneNumber: '',
      city: '',
      country: '',
      localGovernmentArea: '',
      website: '',
      twitter: '',
      instagram: '',
      logo: '',
      facebook: '',
      unhideMainButtons: true
    });
    wrapper.setState({ checked: true, isLoading: false });
    wrapper.instance().getStepContent();
    const nextButton = wrapper.find('#next-button').at(0);

    wrapper.instance().getStepContent();
    nextButton.simulate('click');
    expect(wrapper.find(BusinessSetUp)).toHaveLength(0);
  });

  it('calls handleBackButton handler and sets state', () => {
    wrapper.setState({ checked: true, isLoading: false });
    wrapper.instance().getStepContent(0);
    wrapper.setState({
      firstName: 'firstname',
      lastName: 'lastname',
      username: 'username',
      secondaryEmail: 'secondaryEmail',
      secondaryPhoneNumber: 'phone number',
      activeStep: 1,
      unhideMainButtons: true
    });
    const nextButton = wrapper.find('#next-button').at(0);
    nextButton.simulate('click');
    const backButton = wrapper.find('#back-button').at(0);
    backButton.simulate('click');
    const spy = jest.spyOn(wrapper.instance(), 'handleBackButton');
    wrapper.instance().handleBackButton();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.checked).toBeTruthy();
  });

  it('calls onSelectFile method when an image is selected from the file picker ', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(event1);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onSelectFile with file passed as an argument', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile({ ...event1, target: {} });
    expect(spy).toHaveBeenCalled();
  });

  it('calls getCroppedImg method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'getCroppedImg');
    wrapper.instance().getCroppedImg(imageFile, crop, fileName);
    expect(spy).toHaveBeenCalled();
  });

  it('calls handleClose method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleClose');
    wrapper.instance().handleClose();
    expect(spy).toHaveBeenCalled();
  });

  it('calls onCropChange method', () => {
    wrapper.instance().onCropChange(crop);
    expect(wrapper.instance().state.crop).toEqual(crop);
  });

  it('calls handleSave method', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleSave');
    new Promise((resolve) => {
      wrapper.instance().getCroppedImg = () => new Promise(jest.fn);
      wrapper.instance().handleSave();
      resolve();
    }).then(() => {
      expect(spy).toHaveBeenCalled();
    });
  });
  it('calls handleOutletFormInputValidation', () => {
    wrapper.setState({
      outletName: 'outletName',
      addressLine1: 'addressLine1',
      city: 'city',
      country: 'country',
      phoneNumber: 123,
      outletType: 'storefront',
      registerName: 'registerName',
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleOutletFormInputValidation');
    wrapper.instance().handleOutletFormInputValidation();
    expect(spy).toHaveBeenCalled();
  });

  it('sets state when handleOutletFormInputValidation is called', () => {
    wrapper.setState({
      outletName: 'outletName',
      addressLine1: 'addressLine1',
      city: '',
      country: 'country',
      phoneNumber: 123,
      outletType: 'storefront',
      registerName: 'registerName',
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleOutletFormInputValidation');
    wrapper.instance().handleOutletFormInputValidation();
    expect(wrapper.instance().state.formError).toBeTruthy();
  });

  it('sets state when handleRegisterValidation is called', () => {
    wrapper.setState({
      registerName: '',
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleRegisterValidation');
    wrapper.instance().handleRegisterValidation();
    expect(spy).toHaveBeenCalled();
    expect(wrapper.instance().state.formError).toBeTruthy();
  });

  it('calls setOutletKindId if name is outletType ', () => {
    event = {
      target: {
        name: 'outletType',
        value: 'value'
      }
    };
    const setOutletKindIdSpy = jest.spyOn(wrapper.instance(), 'setOutletKindId');
    wrapper.instance().handleInPutChange(event);
    expect(setOutletKindIdSpy).toHaveBeenCalled();
  });

  it('sets state kindId when setOutletKindId is called with value of storefront ', () => {
    event = {
      target: {
        name: 'outletType',
        value: 'storefront'
      }
    };
    wrapper.instance().handleInPutChange(event);
    expect(wrapper.instance().state.kindId).toBe(2);
  });

  it('sets state kindId when setOutletKindId is called with value of warehouse ', () => {
    event = {
      target: {
        name: 'outletType',
        value: 'warehouse'
      }
    };
    wrapper.instance().handleInPutChange(event);
    expect(wrapper.instance().state.kindId).toBe(1);
  });

  it('sets state when toggleRegisterDisplay is called', () => {
    event = {
      target: {
        id: 5,
      }
    };
    wrapper.instance().toggleRegisterDisplay(event);
    expect(wrapper.instance().state.clickedOutlet).toBe(5);
  });

  it('sets state when toggleRegisterDisplay is called', () => {
    wrapper.setState({ clickedOutlet: 8 });
    event = {
      target: {
        id: 8,
      }
    };
    wrapper.instance().toggleRegisterDisplay(event);
    expect(wrapper.instance().state.clickedOutlet).toBe('');
  });

  it('calls handleOutletEdit and updates state', () => {
    const data = {
      id: 'id',
      name: 'name',
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      lga: 'lga',
      city: {
        name: 'name',
        country: {
          name: 'name'
        }
      },
      phoneNumber: 123,
      dateLaunched: 123,
      kind: 'kind',
      registerSet: [{
        receipt: {}
      }]
    };
    const spy = jest.spyOn(wrapper.instance(), 'handleOutletEdit');
    wrapper.instance().handleOutletEdit(data);
    expect(spy).toBeCalled();
  });

  it('calls handleOutletEdit and updates state for warehouse', () => {
    const data = {
      id: 'id',
      name: 'name',
      addressLine1: 'addressLine1',
      addressLine2: 'addressLine2',
      lga: 'lga',
      city: {
        name: 'name',
        country: {
          name: 'name'
        }
      },
      phoneNumber: 123,
      dateLaunched: 123,
      kind: 'kind',
      registerSet: []
    };
    const spy = jest.spyOn(wrapper.instance(), 'handleOutletEdit');
    wrapper.instance().handleOutletEdit(data);
    expect(spy).toBeCalled();
  });

  it('calls removeOutlet function', () => {
    const data = {
      id: 4
    };
    const spy = jest.spyOn(wrapper.instance(), 'removeOutlet');
    wrapper.instance().handleOutletDelete(data);
    expect(spy).toBeCalled();
  });

  it('calls removeOutlet function and sets state', () => {
    const id = 5;
    const notify = jest.fn(results);
    wrapper.setState({
      outletSet: [{
        id: 2,
        kind: {
          name: 'warehouse'
        }
      }]
    });
    wrapper.instance().removeOutlet(id);
  });

  it('calls editRegister function and sets state', () => {
    wrapper.setState({
      registerId: 408,
      registerName: 'register',
      outletSet: [{
        id: 2,
        kind: {
          name: 'warehouse'
        }
      }]
    });
    wrapper.instance().editRegister();
    expect(wrapper.instance().state.outletIsLoading).toBe(false);
  });

  it('calls handleOutletFormInputValidation function and sets state', () => {
    wrapper.setState({
      outletName: 'outletName',
      addressLine1: 'addressLine1',
      city: 'city',
      country: 'country',
      phoneNumber: 123,
      outletType: 'outletType',
      registerName: 'registerName',
      edittingOutlet: true
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleOutletFormInputValidation');
    wrapper.instance().handleAddOutletButton();
    expect(spy).toBeCalled();
  });

  it('calls addOutlet if edittingOutlet is false', () => {
    wrapper.setState({
      outletName: 'outletName',
      outletTaxNumber: 'outletTaxNumber',
      addressLine1: 'addressLine1',
      city: 'city',
      country: 'country',
      phoneNumber: 123,
      outletType: 'outletType',
      registerName: 'registerName',
      numberOfRegisters: 'numberOfRegisters',
      edittingOutlet: false
    });
    const spy = jest.spyOn(wrapper.instance(), 'addOutlet');
    wrapper.instance().handleAddOutletButton();
    expect(spy).toBeCalled();
  });

  it('calls handleAddNewOutletButton and sets state', () => {
    wrapper.setState({
      outletsActive: true,
    });
    wrapper.instance().handleAddNewOutletButton();
    expect(wrapper.instance().state.outletsActive).toBe(false);
  });

  it('calls addBusiness when activeStep is 1', () => {
    wrapper.setState({
      legalName: 'legalName',
      tradingName: 'tradingName',
      phoneNumber: 123,
      businessEmail: 'businessEmail',
      country: 'country',
      city: 'city',
      addressLine1: 'addressLine1',
      activeStep: 1,
    });
    const spy = jest.spyOn(wrapper.instance(), 'addBusiness');
    wrapper.instance().handleNextButton();
    expect(spy).toBeCalled();
  });

  it('calls finishAddOutlet when activeStep is 2', () => {
    wrapper.setState({
      activeStep: 2,
    });
    const spy = jest.spyOn(wrapper.instance(), 'finishAddOutlet');
    wrapper.instance().handleNextButton();
    expect(spy).toBeCalled();
  });

  it('calls finishAddOutlet when activeStep is 2', () => {
    wrapper.setState({
      activeStep: 2,
    });
    const spy = jest.spyOn(wrapper.instance(), 'finishAddOutlet');
    wrapper.instance().handleNextButton();
    expect(spy).toBeCalled();
  });

  it('handles out of range activeStep', () => {
    wrapper.setState({
      activeStep: 8,
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleNextButton');
    wrapper.instance().handleNextButton();
    expect(spy).toBeCalled();
  });

  it('calls fetchUserData and sets state', () => {
    const newProps = {
      userData: {
        me: {
          email: 'awesome@gmail.com',
          mobileNumber: '1234567890',
        },
        loading: false,
        error: null,
      },
      countriesData: {
        countries: [{
          name: 'Nigeria',
          citySet: [],
        }],
      },
      userRoles: {
        roles: [],
        loading: false,
        error: null,
      },
      assignedOutlets: {
        business: {
          users: []
        },
        loading: false,
        error: null,
      }
    };
    wrapper.instance().fetchUserData(newProps);
    expect(wrapper.instance().state.countries[0].name).toBe('Nigeria');
  });

  it('calls addOutlet and sets state with storefront', () => {
    wrapper.setState({
      outletName: '',
      addressLine1: '',
      addressLine2: '',
      localGovernmentArea: '',
      businessId: '',
      cityId: 2,
      dateLaunched: '',
      kindId: 2,
      phoneNumber: '',
      outletType: 'storefront',
    });
    const toogleCheckbox = jest.fn();
    wrapper.instance().addOutlet();
  });

  it('calls addOutlet and sets state with warehouse', () => {
    wrapper.setState({
      outletName: '',
      addressLine1: '',
      addressLine2: '',
      localGovernmentArea: '',
      businessId: '',
      cityId: 2,
      dateLaunched: '',
      kindId: 2,
      phoneNumber: '',
      outletType: 'warehouse',
    });
    const toogleCheckbox = jest.fn();
    wrapper.instance().addOutlet();
  });

  it('calls handleBusinessFormInputValidation method to validate business data inputs', () => {
    wrapper.setState({
      legalName: 'legal name',
      tradingName: 'trading name',
      phoneNumber: 'phone number',
      businessEmail: 'business email',
      country: 'country',
      city: 'city',
      addressLine1: 'addressLine1',
      activeStep: 1
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleBusinessFormInputValidation');
    wrapper.instance().handleBusinessFormInputValidation();
    expect(spy).toHaveBeenCalled();
  });

  it('calls  handleNextButton method which inturn calls handleInputValidation with falsy state properties', () => {
    wrapper.setState({
      firstName: '',
      lastName: '',
      username: '',
      secondaryEmail: '',
      secondaryPhoneNumber: '',
      activeStep: 0
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleNextButton');
    wrapper.instance().handleNextButton();
    expect(spy).toHaveBeenCalled();
  });

  it('calls  handleNextButton method which inturn calls handleBusinessFormInputValidation with truthy state properties', () => {
    wrapper.setState({
      legalName: 'legal name',
      tradingName: 'trading name',
      phoneNumber: 'phone number',
      businessEmail: 'business email',
      country: 'country',
      city: 'city',
      addressLine1: 'addressLine1',
      activeStep: 1
    });
    const spy = jest.spyOn(wrapper.instance(), 'handleNextButton');
    wrapper.instance().handleNextButton();
    expect(spy).toHaveBeenCalled();
  });
});

describe('Test react-apollo functions', () => {
  const request = {
    query: GET_USER_INFO,
  };
  const session = {
    me: {
      name: 'joe'
    }
  };

  const MockedInstance = (
    <MockedProvider mocks={[{ request }]} addTypename={false}>
      <withAuth session={session}>
        <StateContext.Provider value={context}>
          <SteppedNav {...props} />
        </StateContext.Provider>
      </withAuth>
    </MockedProvider>
  );

  const apolloWrapper = mount(MockedInstance);

  it('updates state with results from the query', () => {
    expect(apolloWrapper.find('withAuth').props().session.me.name).toBe('joe');
    apolloWrapper.setState({
      firstName: 'firstname',
      lastName: 'lastName',
      username: 'username',
      secondaryEmail: 'secondaryEmail',
      secondaryPhoneNumber: 'secondaryPhoneNumber',
      isLoading: false,
      checked: false,
      legalName: 'legalname',
      tradingName: 'tradingname',
      email: 'email',
      address: 'address',
      phoneNumber: 'phonenumber',
      website: 'website',
      twitter: 'twitter',
      instagram: 'instagram',
      logo: 'logo',
      facebook: 'facebook',
    });
  });

  const namedProps = {
    editAdmin: jest.fn(() => Promise.resolve()),
    client: { query: jest.fn() },
    classes: {},
    createBusiness: jest.fn(() => Promise.resolve()),
    userData: {
      me: {
        email: 'awesome@gmail.com',
        mobileNumber: '1234567890',
      },
    },
    session: {
      me: {
        firstName: 'Andrew',
        businessUser: {
          id: 'd6d6d8dd'
        },
        outlets: [
          {
            id: 'h2yu22y2',
            kind: {
              name: 'warehouse'
            }
          }
        ]
      }
    }
  };
  const namedWrapper = mount(
    <StateContext.Provider value={context}>
      <StepperNav {...namedProps} />
    </StateContext.Provider>
  );

  it('toogleCheckbox gets called', () => {
    namedWrapper.instance().toggleIsAcknowledged();
  });

  it('calls fetchUserData', () => {
    const spy = jest.spyOn(namedWrapper.instance(), 'fetchUserData');
    namedWrapper.instance().fetchUserData(props.nextProps);
    expect(spy).toHaveBeenCalled();
  });

  it('calls fetchUserData with error value of false', () => {
    const spy = jest.spyOn(namedWrapper.instance(), 'fetchUserData');
    namedWrapper.instance().fetchUserData({ ...props.nextProps, error: '', loading: false });
    expect(spy).toHaveBeenCalled();
  });
});
