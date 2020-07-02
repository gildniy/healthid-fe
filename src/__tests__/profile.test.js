import React from 'react';
import { mount } from 'enzyme';
import * as moxios from 'moxios';
import { UserProfile } from '../components/profile/Profile';

const data = {
  file: new File([''], {
    name: 'shrek-8888', size: 234, type: 'text/plain', lastModified: ''
  }),
};

const validDataFile = {
  file: new File([''], {
    name: 'shrek-8888', size: 234, type: 'image/jpg', lastModified: ''
  }),
};

const invalidDataFile = {
  file: new File([''], {
    name: 'shrek-8888', size: 1433602, type: 'image/jpg', lastModified: ''
  }),
};

const dataResult = {
  data: {
    updateUser: {
      user: {
        username: 'Cool Kid',
        email: 'email@emil.com',
        mobileNumber: '072129912'
      }
    }
  }
}

const graphqlProps = {
  userData: {
    me: {
      email: 'awesome@gmail.com',
      mobileNumber: '1234567890',
      username: 'username',
      outlets: []
    },
    loading: true,
    error: { message: 'network problem' },
  },
  finalScreen: true,
  classes: {},
  updateUser: jest.fn(() => Promise.resolve(dataResult)),
  getCroppedImg: jest.fn(() => Promise.resolve(data)),
};

const event = {
  target: {
    name: 'firstName',
    value: 'michael'
  }
};

const formEvent = {
  target: {
    files: [validDataFile],
  }
};

const formEvent2 = {
  target: {
    files: [invalidDataFile],
  }
};

const formEvent3 = {
  target: {
    files: [],
  }
};

describe('Profile container component', () => {
  let wrapper;
  beforeEach(() => {
    moxios.install();
    wrapper = mount(<UserProfile {...graphqlProps} />);
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('renders profileData component upon successful login', () => {
    expect(wrapper.find('ProfileData')).toHaveLength(1);
  });

  it('calls handleClickShowPassword method and sets state', () => {
    jest.spyOn(wrapper.instance(), 'handleClickShowPassword');
    wrapper.instance().handleClickShowPassword();
    expect(wrapper.state('showPassword')).toBeFalsy();
  });

  it('calls handleClickShowPassword1 method and sets state', () => {
    jest.spyOn(wrapper.instance(), 'handleClickShowPassword1');
    wrapper.instance().handleClickShowPassword1();
    expect(wrapper.state('showPassword1')).toBeFalsy();
  });

  it('calls handleClickShowPassword2 method and sets state', () => {
    jest.spyOn(wrapper.instance(), 'handleClickShowPassword2');
    wrapper.instance().handleClickShowPassword2();
    expect(wrapper.state('showPassword2')).toBeFalsy();
  });

  it('calls handleArrowButtonClick method, sets state and renders the UserProfilecomplete component', () => {
    wrapper.setState({ outlets: [] })
    jest.spyOn(wrapper.instance(), 'handleArrowButtonClick');
    wrapper.instance().handleArrowButtonClick();
    expect(wrapper.state('isDone')).toBeTruthy();
  });

  it('calls handleManageProfileButton method and sets state', () => {
    jest.spyOn(wrapper.instance(), 'handleManageProfileButton');
    wrapper.instance().handleManageProfileButton();
    expect(wrapper.state('isDone')).toBeFalsy();
    expect(wrapper.state('finalScreen')).toBeFalsy();
    expect(wrapper.state('isButtonDisabled')).toBeTruthy();
  });

  it('calls handleInputChange method on user input and sets state', () => {
    jest.spyOn(wrapper.instance(), 'handleInputChange');
    wrapper.instance().handleInputChange(event);
    expect(wrapper.state('firstName')).toBeTruthy();
  });

  it('calls handlePasswordMatch method whenever a user attempts to update their password', () => {
    wrapper.setState({ newPassword: 'password1', comfirmPassword: 'password2' });
    const spy = jest.spyOn(wrapper.instance(), 'handlePasswordMatch');
    wrapper.instance().handlePasswordMatch();
    expect(spy).toHaveBeenCalled();
  });

  it('calls handlePasswordMatch method with null password values', () => {
    wrapper.setState({ newPassword: '', comfirmPassword: '' });
    const spy = jest.spyOn(wrapper.instance(), 'handlePasswordMatch');
    wrapper.instance().handlePasswordMatch();
    expect(spy).toHaveBeenCalled();
  });

  it('calls handlePasswordMatch method and checks if newPassword and comfirm password match', () => {
    wrapper.setState({ newPassword: 'password1', comfirmPassword: 'password1' });
    const spy = jest.spyOn(wrapper.instance(), 'handlePasswordMatch');
    wrapper.instance().handlePasswordMatch();
    expect(spy).toHaveBeenCalled();
  });

  it('calls onCropChange method to update state with cropped values', () => {
    const crop = {
      x: 200,
      y: 200,
      width: 200,
      height: 200,
    };
    const spy = jest.spyOn(wrapper.instance(), 'onCropChange');
    wrapper.instance().onCropChange(crop);
    expect(wrapper.state('crop')).toEqual(crop);
  });

  it('calls handleSave method to update state with cropped values', () => {
    const crop = {
      x: 200,
      y: 200,
      width: 200,
      height: 200,
    };
    wrapper.setState({ src: '', fileName: '', crop });
    jest.spyOn(wrapper.instance(), 'handleSave');
    jest.spyOn(wrapper.instance(), 'getCroppedImg');
    wrapper.instance().handleSave();
    expect(wrapper.instance().getCroppedImg).toHaveBeenCalled();
  });

  it('calls handleClose method to update state values', () => {
    wrapper.setState({ originalImageFile: data.file });
    jest.spyOn(wrapper.instance(), 'handleClose');
    jest.spyOn(wrapper.instance(), 'handleImageDrop');
    wrapper.instance().handleClose();
    expect(wrapper.state('src')).toBeFalsy();
    expect(wrapper.state('open')).toBeFalsy();
  });

  it('calls onSelectFile method with valid and size and updates src state value with the selected file name', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(formEvent);
    expect(spy).toHaveBeenCalled();
  });

  it('calls onSelectFile method with nofile size provided', () => {
    const spy = jest.spyOn(wrapper.instance(), 'onSelectFile');
    wrapper.instance().onSelectFile(formEvent3);
    expect(spy).toHaveBeenCalled();
  });

  it('calls verifyUploadFile method for file validation', () => {
    const spy = jest.spyOn(wrapper.instance(), 'verifyUploadFile');
    wrapper.instance().verifyUploadFile(formEvent2);
    expect(spy).toHaveBeenCalled();
  });

  it('calls handle image drop and uploads it to cloudinary', () => {
    const secure_url = 'https://api.cloudinary.com/v1_1/dojaopytm/image/upload';
    process.env.CLOUDINARY_URL = secure_url;
    moxios.stubRequest(process.env.CLOUDINARY_URL, {
      status: 200,
      response: { secure_url }
    });
    wrapper.instance().handleImageDrop(validDataFile);
    expect(wrapper.instance().state.profileImage).toBeFalsy();
  });

  it('calls handleDoneButton', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handleDoneButton');
    wrapper.instance().handleDoneButton();
    expect(spy).toHaveBeenCalled();
  });

  it('calls handlePasswordMatch', () => {
    const spy = jest.spyOn(wrapper.instance(), 'handlePasswordMatch');
    wrapper.instance().handlePasswordMatch();
    expect(spy).toHaveBeenCalled();
  });

  it('calls handlePasswordMatch when they  match', () => {
    wrapper.setState({ newPassword: 'Password@#12', confirmPassword: 'Password@#12' });
    const spy = jest.spyOn(wrapper.instance(), 'handlePasswordMatch');
    wrapper.instance().handlePasswordMatch();
    expect(spy).toHaveBeenCalled();
  });

  it('calls handlePasswordMatch when they dont match', () => {
    wrapper.setState({ newPassword: 'Password@#12', confirmPassword: 'Passwordsda@#12' });
    const spy = jest.spyOn(wrapper.instance(), 'handlePasswordMatch');
    wrapper.instance().handlePasswordMatch();
    expect(spy).toHaveBeenCalled();
  });

  it('calls fetchUserData with no error', () => {
    const me = {
      birthday:'', email: 'email@emas.com', firstName: 'Namee',
      jobTitle: 'Directore', lastName: 'Jamal', mobileNumber: '0282012021', profileImage:'cool Profile_Picture_Placeholder.png',
      role:'CF', startingDate:'2020-10-10', username:'jane', outlets: []
    }
    const userData = {
      me
    }
    const spy = jest.spyOn(wrapper.instance(), 'fetchUserData');
    wrapper.instance().fetchUserData(userData);
    expect(spy).toHaveBeenCalled();
  });
  it('calls fetchUserData with error', () => {
    const me = {
      birthday:'', email: 'email@emas.com', firstName: 'Namee',
      jobTitle: 'Directore', lastName: 'Jamal', mobileNumber: '0282012021', profileImage:'cool Profile_Picture_Placeholder.png',
      role:'CF', startingDate:'2020-10-10', username:'jane', outlets: []
    }
    const userData = {
      me,
      error: {
        message: 'Something went wrong'
      }
    }
    const spy = jest.spyOn(wrapper.instance(), 'fetchUserData');
    wrapper.instance().fetchUserData(userData);
    expect(spy).toHaveBeenCalled();
  });

  it('calls handlePasswordChange with different new and confirm password not matching', () => {
    const state = {
      username: 'userFox',
      mobileNumber: '082123213',
      newEmail: 'wmail@email.com',
      email: 'wail@email.com',
      profileImage: 'pic.jpg',
      oldPassword: 'BackKang',
      newPassword: 'BookClub',
      confirmPassword: 'BookClubssd'
    }
    wrapper.setState(state)
    const spy = jest.spyOn(wrapper.instance(), 'handlePasswordChange');
    wrapper.instance().handlePasswordChange();
    expect(spy).toHaveBeenCalled();
  });

  it('calls handlePasswordChange', () => {
    const state = {
      username: 'userFox',
      mobileNumber: '082123213',
      newEmail: 'wmail@email.com',
      email: 'wail@email.com',
      profileImage: 'pic.jpg',
      oldPassword: 'BackKang',
      newPassword: 'BookClub',
      confirmPassword: 'BookClub'
    }
    wrapper.setState(state)
    const spy = jest.spyOn(wrapper.instance(), 'handlePasswordChange');
    wrapper.instance().handlePasswordChange();
    expect(spy).toHaveBeenCalled();
  });

  
});
