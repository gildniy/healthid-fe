import React from 'react';
import { shallow } from 'enzyme';
import PropTypes from 'prop-types';
import { BusinessUpdate } from '../../../components/main_setup/business/mainBusinessSetupUpdate';
import FileUpload from '../../../components/setup/fileUpload';
import { SetupHeader } from '../../../assets/styles/setup';


const session = {
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
  },
  outlets: []
};

const results = {
  data: {
    updateBusiness: {
      success: ''
    }
  }
};

const props = {
  nextProps: {
    countriesData: {
      countries: [
        {
          name: 'Nigeria',
          citySet: [{ city: '' }]
        }
      ]
    }
  },
  history: {
    push: jest.fn()
  },
  session,
  updateBusiness: jest.fn(() => Promise.resolve(results)),
  fetchUserData: jest.fn()
};

const state = {
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
  active: false,
  saveButtonStyle: SetupHeader.saveButton,
  serverError: '',
  formError: false,
  isError: false,
  src: '',
  crop: {
    x: 50,
    y: 50,
    width: 50,
    height: 50
  },
  fileName: '',
  originalImageFile: '',
  croppedImage: '',
  cities: [],
  countries: []
};

BusinessUpdate.contextTypes = [PropTypes.string, PropTypes.func];

const context = ['kitty', jest.fn()];

describe('Test BusinessUpdate component', () => {
  const wrapper = shallow(<BusinessUpdate {...props} />, { context });
  beforeEach(() => {
    wrapper.setState({
      ...state
    });
  });

  it('should fetch country and update the state', () => {
    const newProps = {
      countriesData: {
        countries: [
          {
            name: 'Nigeria',
            citySet: [{ city: '' }]
          }
        ]
      }
    };

    wrapper.instance().fetchUserData(newProps);
    expect(wrapper.instance().state.countries[0].name).toBe('Nigeria');
  });

  it('should find the back and save buttons', () => {
    expect(wrapper.find('WithStyles(ForwardRef(Button))').length).toEqual(2);
  });

  it('should upload a photo', () => {
    const crop = {
      x: 50,
      y: 50,
      width: 50,
      height: 50,
    };

    const imageFile = 'new image src';
    const fileName = 'new file name';
    const file = new Blob(['file name'], { type: 'plain/text', name: 'name' });
    const spyCrop = jest.spyOn(wrapper.instance(), 'getCroppedImg');
    const spySelect = jest.spyOn(wrapper.instance(), 'onSelectFile');
    const spyDrop = jest.spyOn(wrapper.instance(), 'handleImageDrop');
    const spySave = jest.spyOn(wrapper.instance(), 'handleSave');
    const spyCropChange = jest.spyOn(wrapper.instance(), 'onCropChange');
    const spyClose = jest.spyOn(wrapper.instance(), 'handleClose');

    const event = {
      target: {
        files: [
          file
        ],
        value: 'michael'
      }
    };

    wrapper.instance().onSelectFile(event);
    expect(spySelect).toHaveBeenCalledWith(event);

    wrapper.instance().getCroppedImg(imageFile, crop, fileName);
    expect(spyCrop).toHaveBeenCalledWith(imageFile, crop, fileName);

    wrapper.instance().handleImageDrop(imageFile);
    expect(spyDrop).toHaveBeenCalledWith(imageFile);

    wrapper.instance().handleSave();
    expect(spySave).toHaveBeenCalled();

    wrapper.instance().onCropChange(crop);
    expect(spyCropChange).toHaveBeenCalledWith(crop);

    wrapper.instance().handleClose();
    expect(spyClose).toHaveBeenCalled();
  });

  it('should call the componentWillReceiveProps', () => {
    const nextProps = {
      countriesData: {
        countries: [
          {
            name: 'Nigeria',
            citySet: [{ city: '' }]
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
        name: 'legalName',
        value: 'someone'
      }
    };

    const textFieldTwo = {
      target: {
        name: 'tradingName',
        value: 'someone'
      }
    };

    const textFieldThree = {
      target: {
        name: 'addressLine1',
        value: 'somewhere'
      }
    };

    const textFieldFour = {
      target: {
        name: 'phoneNumber',
        value: '+2503786238462'
      }
    };

    const textFieldFive = {
      target: {
        name: 'businessEmail',
        value: 'someone@business.com'
      }
    };

    const textFieldSix = {
      target: {
        name: 'city',
        value: 'somewhere'
      }
    };

    const textFieldSeven = {
      target: {
        name: 'country',
        value: 'somewhere'
      }
    };

    const spyServerError = jest.spyOn(wrapper.instance(), 'serverErrorHandler');

    wrapper.instance().handleInPutChange(textFieldOne);
    expect(wrapper.state('legalName')).toBe('someone');

    wrapper.instance().handleInPutChange(textFieldTwo);
    expect(wrapper.state('tradingName')).toBe('someone');

    wrapper.instance().handleInPutChange(textFieldThree);
    expect(wrapper.state('addressLine1')).toBe('somewhere');

    wrapper.instance().handleInPutChange(textFieldFour);
    expect(wrapper.state('phoneNumber')).toBe('+2503786238462');

    wrapper.instance().handleInPutChange(textFieldFive);
    expect(wrapper.state('businessEmail')).toBe('someone@business.com');

    wrapper.instance().handleInPutChange(textFieldSix);
    expect(wrapper.state('city')).toBe('somewhere');

    wrapper.instance().handleInPutChange(textFieldSeven);
    expect(wrapper.state('country')).toBe('somewhere');

    wrapper.instance().serverErrorHandler();
    expect(spyServerError).toHaveBeenCalled();

    expect(wrapper.state('active')).toBe(false);
    expect(wrapper.state('saveButtonStyle')).toBe(SetupHeader.saveButton);

    const saveButton = wrapper.find('WithStyles(ForwardRef(Button))').at(1);

    saveButton.simulate('click');
  });
});


const fileUploadProps = {
  state: {
    src: '',
    open: false,
  },
  logo: 'logo',
  handleImageDrop: jest.fn(),
  onSelectFile: jest.fn(),
  onCropChange: jest.fn(),
  handleClose: jest.fn(),
  handleSave: jest.fn(),
};

describe('File Upload component tests', () => {
  const wrapper = shallow(<FileUpload {...fileUploadProps} />);

  it('should render the component with required props', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.props()).toBeDefined();
  });
});
