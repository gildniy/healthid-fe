import React from 'react';
import { compose, graphql } from 'react-apollo';
import PropTypes from 'prop-types';
import axios from 'axios';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { Fab } from '@material-ui/core';
import initialState from './stepperInitialState';
import AdminSetUp from './adminSetup';
import BusinessSetUp from './businessSetup';
import OutletSetUp from './outletSetup';
import FinalScreen from './finalScreen';
import { StepperStyles } from '../../assets/styles/setup';
import NavBar from '../shared/Navbar';
import Footer from '../shared/Footer';
import Loader from '../shared/Loader';
import UPDATE_ADMIN_USER from '../../mutations/adminSetupMutation';
import GET_USER_INFO from '../../queries/userDataQuery';
import CREATE_BUSSINESS from '../../mutations/businessSetupMutation';
import notify from '../shared/Toaster';
import CREATE_OUTLET from '../../mutations/outletSetupMutation';
import GET_ALL_COUNTRIES from '../../queries/countryQuery';
import CREATE_REGISTER from '../../mutations/createRegisterMutation';
import UPDATE_OUTLET from '../../mutations/updateOutletMutation';
import DELETE_OUTLET from '../../mutations/deleteOutletMutation';
import UPDATE_REGISTER from '../../mutations/updateRegisterMutation';
import withAuth from '../withAuth';
import UserSetup from './userSetup';
import {
  ADD_NEW_USER,
  ADMIN_UPDATE_USER,
} from '../../mutations/addUsersSetupMutation';
import { GET_OUTLETS, GET_ROLES } from '../../queries/addUsersSetupQuery';
import { StateContext } from '../../providers/stateProvider';
import StepperConnector from './stepperConnector';
import StepperIcon from './stepperIcon';

const styles = StepperStyles;

const steps = [
  'Admin Account',
  'Business Information',
  'Add Outlet(s)',
  'Add User(s)',
];

export class StepperNav extends React.Component {
  state = initialState;

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'hideNavbar',
      payload: true
    });
    this.checkStep();
  }

  componentWillReceiveProps(nextProps) {
    nextProps && this.fetchUserData(nextProps);
  }

  checkStep = () => {
    const { session: { me, me: { outlets, businessUser } } } = this.props;
    let data = {};
    let activeStep = 0;
    if (me.firstName) {
      data = { ...me, checked: true };
      activeStep = 1;
    }
    if (businessUser) {
      const { id } = businessUser;
      data = Object.assign({
        ...businessUser,
        businessId: id,
        unhideMainButtons: false,
      }, data);
      data.checked = false;
      activeStep = 2;
    }
    if (outlets.length) {
      data = Object.assign({ outletSet: outlets }, { outletsActive: true }, data);
      data.unhideMainButtons = true;
      activeStep = 3;
    }
    this.setState({ ...data, activeStep });
  }

  // Stepper navigation handlers
  getStepContent = (step) => {
    switch (step) {
    case 0:
      return (
        <AdminSetUp
          state={this.state}
          handleInputChange={this.handleInPutChange}
          checked={this.toggleIsAcknowledged}
          errorHandler={this.errorHandler}
          serverErrorHandler={this.serverErrorHandler}
        />
      );
    case 1:
      return (
        <BusinessSetUp
          state={this.state}
          handleInPutChange={this.handleInPutChange}
          handleImageDrop={this.handleImageDrop}
          errorHandler={this.errorHandler}
          serverErrorHandler={this.serverErrorHandler}
          onSelectFile={this.onSelectFile}
          onCropChange={this.onCropChange}
          handleClose={this.handleClose}
          handleSave={this.handleSave}
          handleCheckboxChange={this.handleCheckboxChange}
          handlePhoneChange={this.handlePhoneChange}
        />
      );
    case 2:
      return (
        <OutletSetUp
          state={this.state}
          handleInPutChange={this.handleInPutChange}
          errorHandler={this.errorHandler}
          handleAddOutletButton={this.handleAddOutletButton}
          handleAddNewOutletButton={this.handleAddNewOutletButton}
          toggleRegisterDisplay={this.toggleRegisterDisplay}
          handleOutletEdit={this.handleOutletEdit}
          handleOutletDelete={this.handleOutletDelete}
          handleCheckboxChange={this.handleCheckboxChange}
        />
      );
    case 3:
      return (
        <UserSetup
          state={this.state}
          handleInPutChange={this.handleInPutChange}
          handleClickAddButton={this.handleClickAddButton}
          sendEditInfo={this.sendEditInfo}
          errorHandler={this.errorHandler}
        />
      );
    default:
      return null;
    }
  };

  handleClickAddButton = () => {
    const { showUsers } = this.state;
    this.setState({
      fName: '',
      lName: '',
      userEmail: '',
      phone: '',
      jobTitle: '',
      roleId: '',
      userUsername: '',
      outlet: '',
      target: '',
      startingDate: '2019-01-01',
      showUsers: !showUsers,
      editMode: false,
      formError: false,
      isError: false,
      phoneError: false,
      usernameError: false,
      emailError: false
    });
  };

  sendEditInfo = (user) => {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      jobTitle,
      role,
      username,
      users,
      target,
      startingDate,
      id
    } = user;
    this.setState({
      fName: firstName,
      lName: lastName,
      userEmail: email,
      phone: mobileNumber,
      jobTitle,
      roleId: role.id,
      userUsername: username,
      outlet: users[0].id,
      target,
      startingDate,
      userId: id,
      showUsers: false,
      editMode: true,
      isError: false,
      phoneError: false,
      usernameError: false,
      emailError: false
    });
  };

  handleBackButton = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      checked: true,
      showUsers: true,
      formError: false
    }));
  };

  //  Form validation handlers
  handleInputValidation = () => {
    const {
      firstName, lastName, username, email, mobileNumber
    } = this.state;
    const isInvalid = !firstName || !lastName || !username || !email || !mobileNumber;
    if (isInvalid) {
      this.setState({ formError: true });
    }
    return isInvalid;
  };

  handleUserFormValidation = () => {
    const {
      userEmail, phone, roleId, outlet, userUsername
    } = this.state;
    const isFormValid = userEmail && phone && roleId && outlet && userUsername;
    !isFormValid && this.setState({ formError: true, isError: true });
    return isFormValid;
  };

  handleBusinessFormInputValidation = () => {
    const {
      legalName,
      tradingName,
      phoneNumber,
      businessEmail,
      country,
      city,
      addressLine1
    } = this.state;
    const isInvalid = !legalName
      || !tradingName
      || !phoneNumber
      || !businessEmail
      || !country
      || !city
      || !addressLine1;
    if (isInvalid) {
      this.setState({ formError: true });
    }
    return isInvalid;
  };

  handleOutletFormInputValidation = () => {
    const {
      outletName,
      outletTaxNumber,
      addressLine1,
      city,
      country,
      phoneNumber,
      dateLaunched,
      outletType,
      registerName,
      numberOfRegisters,
    } = this.state;
    let isInvalid = !outletName
      || !addressLine1
      || !city
      || !country
      || !phoneNumber
      || !dateLaunched;
    if (outletType === 'storefront') {
      isInvalid = !outletName
        || !addressLine1
        || !city
        || !country
        || !phoneNumber
        || !dateLaunched
        || !registerName
        || !numberOfRegisters;
    }
    if (isInvalid) {
      this.setState({ formError: true });
    }
    return isInvalid;
  };

  handleRegisterValidation = () => {
    const { registerName, numberOfRegisters } = this.state;
    const isInvalid = !registerName || !numberOfRegisters;
    if (isInvalid) {
      this.setState({ formError: true });
    }
    return isInvalid;
  };

  errorHandler = (error) => {
    const { formError, isError } = this.state;
    let errorMessage;
    if (formError) {
      errorMessage = 'Please provide a value for this field';
    } else if (isError) {
      errorMessage = error;
    } else {
      errorMessage = '';
    }
    return errorMessage;
  };

  serverErrorHandler = () => {
    const { serverError } = this.state;
    let errorMessage;

    if (serverError) {
      errorMessage = serverError;
    } else {
      errorMessage = '';
    }
    return errorMessage;
  };

  handleInPutChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
        isError: false,
        formError: false,
        phoneError: false,
        usernameError: false,
        emailError: false
      },
      () => this.checkForRequiredFields()
    );

    if (name === 'outletType') {
      this.setOutletKindId(value);
    }
  };

  checkForRequiredFields = () => {
    const {
      activeStep,
      isAcknowledged,
      firstName,
      lastName,
      username,
      legalName,
      email,
      mobileNumber,
      tradingName,
      addressLine1,
      phoneNumber,
      businessEmail,
      outletName,
      registerName,
      numberOfRegisters,
      outletType,
      userEmail,
      phone,
      userUsername,
    } = this.state;

    switch (activeStep) {
    // admin setup required fields check
    case 0:
      if (
        firstName === ''
          || lastName === ''
          || username === ''
          || email === ''
          || mobileNumber === ''
          || isAcknowledged === false
      ) {
        this.setState({ checked: false });
      } else {
        this.setState({ checked: true });
      }
      break;
      // business step required fields check
    case 1:
      if (
        legalName === ''
          || tradingName === ''
          || addressLine1 === ''
          || phoneNumber === ''
          || businessEmail === ''
      ) {
        this.setState({ checked: false });
      } else {
        this.setState({ checked: true });
      }
      break;
    case 2:
      if (outletName === '' || addressLine1 === '' || phoneNumber === '') {
        this.setState({ checked: false });
      } else {
        if (outletType === 'storefront'
          && (registerName === '' || numberOfRegisters === ''
            || numberOfRegisters < 1)
        ) {
          return this.setState({ checked: false });
        }
        this.setState({ checked: true });
      }
      break;
    case 3:
      if (userEmail === '' || phone === '' || userUsername === '') {
        this.setState({ checked: false });
      } else {
        this.setState({ checked: true });
      }
      break;
    default:
      return null;
    }
  };

  handlePhoneChange = (value) => {
    this.setState({
      phoneNumber: value
    });
  };

  setOutletKindId = (value) => {
    const warehouse = 1;
    const storefront = 2;
    if (value === 'storefront') {
      this.setState({ kindId: storefront });
    } else {
      this.setState({ kindId: warehouse });
    }
  };

  // Image resize handlers
  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      this.setState({
        fileName: e.target.files[0].name,
        originalImageFile: e.target.files[0]
      });

      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => this.setState({ src: reader.result, open: true }),
        false
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };

  getCroppedImg = (imageFile, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    // eslint-disable-next-line no-unused-vars
    const promise = new Promise((resolve, reject) => {
      image.onload = () => {
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
        resolve();
      };
      image.src = imageFile;
    }).then(
      () => new Promise((resolve) => {
        canvas.toBlob((blob) => {
          blob.name = fileName;
          resolve(blob);
        }, 'image/jpeg');
      })
    );
    return promise;
  };

  handleImageDrop = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', `${process.env.UPLOAD_PRESET}`);
    formData.append('api_key', `${process.env.API_KEY}`);
    formData.append('timestamp', Date.now() / 1000 || 0);

    return axios
      .post(`${process.env.CLOUDINARY_URL}`, formData, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
      .then((response) => {
        const { data } = response;
        const fileURL = data.secure_url;
        this.setState({ logo: fileURL });
      })
      .catch((err) => {
        this.setState({ serverError: err });
      });
  };

  toggleIsAcknowledged = () => {
    this.setState(
      state => ({
        isAcknowledged: !state.isAcknowledged
      }),
      () => this.checkForRequiredFields()
    );
  };

  // Resize dialog handlers
  handleSave = () => {
    const { src, fileName, crop } = this.state;

    this.getCroppedImg(src, crop, fileName).then((data) => {
      this.handleImageDrop(data);
      this.setState({ src: '', open: false });
    });
  };

  handleCheckboxChange = () => {
    this.setState(prevState => ({
      boxChecked: !prevState.boxChecked
    }));
  };

  toggleRegisterDisplay = (event) => {
    const { clickedOutlet } = this.state;
    const { id } = event.target;
    if (id === clickedOutlet) {
      this.setState({
        clickedOutlet: '',
        registerHidden: true
      });
    }
    if (id !== clickedOutlet) {
      this.setState({
        clickedOutlet: id,
        registerHidden: false
      });
    }
  };

  handleOutletEdit = ({
    id,
    name,
    addressLine1,
    addressLine2,
    lga,
    city,
    phoneNumber,
    dateLaunched,
    kind,
    registerSet,
    taxNumber,
  }) => {
    let isStorefront;
    if (registerSet === undefined || registerSet.length === 0) {
      isStorefront = false;
    } else isStorefront = true;

    this.setState({
      outletName: name,
      taxNumber,
      outletId: id,
      addressLine1,
      addressLine2,
      localGovernmentArea: lga,
      city: city.name,
      country: city.country.name,
      phoneNumber,
      dateLaunched,
      outletType: kind.name,
      registerName: isStorefront ? registerSet[0].name : '',
      numberOfRegisters: isStorefront ? registerSet[0].number : 0,
      registerId: isStorefront ? registerSet[0].id : '',
      edittingOutlet: true,
      outletsActive: false,
      unhideMainButtons: false,
    });
  };

  handleOutletDelete = ({ id }) => {
    this.removeOutlet(id);
  }

  handleAddOutletButton = () => {
    const { edittingOutlet } = this.state;
    const isValidated = this.handleOutletFormInputValidation();
    if (!isValidated) {
      this.setState({
        formError: false,
        checked: false
      });
      if (edittingOutlet) this.handleEditOutlet();
      else this.addOutlet();
    }
  };

  handleEditOutlet = () => {
    this.editOutlet();
  };

  handleAddNewOutletButton = async () => {
    await this.setState({
      outletsActive: false,
      unhideMainButtons: false,
      outletId: NaN,
      outletName: '',
      addressLine1: '',
      phoneNumber: ''
    });
  };

  handleNextButton = () => {
    const { activeStep } = this.state;
    switch (activeStep) {
    case 0:
      {
        const isValidated = this.handleInputValidation();
        if (!isValidated) {
          this.setState({ formError: false });
          this.editAdminUser();
        }
      }
      break;

    case 1:
      {
        const isFormValid = this.handleBusinessFormInputValidation();
        if (!isFormValid) {
          this.addBusiness();
        }
      }
      break;
    case 2: {
      this.finishAddOutlet();
      break;
    }
    case 3:
      {
        const { showUsers, users } = this.state;
        if (showUsers && users.length > 0) {
          return this.setState({ activeStep: activeStep + 1 });
        }
        const isUserFormValid = this.handleUserFormValidation();
        isUserFormValid && this.addUser();
      }
      break;
    default:
      break;
    }
  };

  handleClose = () => {
    const { originalImageFile } = this.state;
    this.setState({ src: '', open: false });
    this.handleImageDrop(originalImageFile);
  };

  fetchUserData = (nextProps) => {
    const {
      userData: { me, loading, error },
      countriesData: { countries },
      userRoles: { roles, loading: rolesLoading, error: rolesError },
      assignedOutlets: {
        loading: outletsLoading,
        error: outletsError
      }
    } = nextProps;

    if (loading || rolesLoading || outletsLoading) {
      return this.setState({ isLoading: true });
    }
    if (error || rolesError || outletsError) {
      return this.setState({
        serverError: error.message.slice(14),
        isError: true
      });
    }
    const { mobileNumber, email } = me;
    const { activeStep } = this.state;

    if (activeStep === 3) {
      return this.setState({
        isLoading: false,
        roles,
        email
      });
    }

    let cities = [];
    countries
      // eslint-disable-next-line array-callback-return
      && countries.map((country) => {
        if (country.name === 'Nigeria') {
          cities = country.citySet;
        }
      });
    return this.setState({
      mobileNumber,
      email,
      cities,
      countries,
      isLoading: false
    });
  };

  editAdminUser = () => {
    this.setState({ isLoading: true });
    const {
      firstName,
      lastName,
      username,
      email,
      mobileNumber,
      secondaryEmail,
      secondaryPhoneNumber,
      activeStep
    } = this.state;

    const { editAdmin } = this.props;

    editAdmin({
      variables: {
        firstName,
        lastName,
        username,
        email,
        mobileNumber,
        secondaryEmail,
        secondaryPhoneNumber
      }
    })
      .then(() => {
        notify('Admin account created successfully');
        this.setState({
          isLoading: false,
          activeStep: activeStep + 1,
          checked: false
        });
      })
      .catch((error) => {
        notify(error.message);
        this.setState({
          serverError: error.message.slice(14),
          isLoading: false,
          isError: true
        });
      });
  };

  addBusiness = () => {
    this.setState({ isLoading: true });
    const {
      legalName,
      tradingName,
      businessEmail,
      addressLine1,
      addressLine2,
      phoneNumber,
      city,
      country,
      localGovernmentArea,
      website,
      twitter,
      instagram,
      logo,
      facebook,
      activeStep,
      boxChecked
    } = this.state;

    const { createBusiness } = this.props;

    return createBusiness({
      variables: {
        legalName,
        tradingName,
        businessEmail,
        addressLine1,
        addressLine2,
        phoneNumber,
        city,
        country,
        localGovernmentArea,
        website,
        twitter,
        instagram,
        logo,
        facebook
      }
    })
      .then((results) => {
        localStorage.setItem(
          'businessId',
          results.data.createBusiness.business.id
        );
        notify(results.data.createBusiness.success[0]);

        // check whether we should jump to finish page
        const newStep = boxChecked ? steps.length : activeStep + 1;
        this.setState({
          isLoading: false,
          checked: false,
          activeStep: newStep,
          unhideMainButtons: false,
          outletsActive: false,
          businessId: results.data.createBusiness.business.id
        });
      })
      .catch((error) => {
        notify(error.message.slice(15));
        this.setState({
          isLoading: false,
          serverError: error.message.slice(14),
          isError: true
        });
      });
  };

  addOutlet = () => {
    this.setState({ outletIsLoading: true });
    const {
      outletName,
      outletTaxNumber,
      addressLine1,
      addressLine2,
      localGovernmentArea,
      businessId,
      country,
      city: cityName,
      dateLaunched,
      kindId,
      phoneNumber,
      outletType
    } = this.state;

    const { createOutlet } = this.props;
    createOutlet({
      variables: {
        addressLine1,
        addressLine2,
        businessId,
        cityName,
        country,
        dateLaunched,
        kindId,
        lga: localGovernmentArea,
        outletName,
        phoneNumber,
        taxNumber: outletTaxNumber,
      }
    })
      .then((results) => {
        notify(results.data.createOutlet.success);
        const id = Number(results.data.createOutlet.outlet.id);
        this.setState({
          outletId: id,
        });
        this.toggleIsAcknowledged();

        return results;
      })
      .then((results) => {
        if (outletType === 'warehouse') {
          const { outlet } = results.data.createOutlet;
          this.setState(PrevState => ({
            outletSet: [...PrevState.outletSet, outlet],
            outletIsLoading: false,
            unhideMainButtons: true,
            outletsActive: true
          }));
        } else {
          this.createRegister(results.data.createOutlet.outlet.id);
        }
      })
      .catch((error) => {
        notify(error.message.split(': ')[1]);
        this.setState({
          outletIsLoading: false,
          serverError: error.message.slice(14),
          sError: true
        });
      });
  };

  createRegister = (outletId) => {
    const {
      registerName, numberOfRegisters, outletSet,
    } = this.state;
    const { createRegister } = this.props;

    createRegister({
      variables: {
        name: registerName,
        number: Number(numberOfRegisters),
        outletId: Number(outletId),
      }
    })
      .then((results) => {
        const { outlet } = results.data.createRegister.registers[0];
        const newOutletSet = outletSet.filter(item => item.id !== outlet.id);
        this.setState({
          outletSet: [...newOutletSet, outlet],
          outletIsLoading: false,
          unhideMainButtons: true,
          outletsActive: true
        });
      })
      .catch((error) => {
        notify(error.message);
        this.setState({
          outletIsLoading: false
        });
      });
  };

  editOutlet = () => {
    this.setState({ outletIsLoading: true });
    const {
      outletId,
      outletName,
      addressLine1,
      addressLine2,
      localGovernmentArea,
      country,
      city: cityName,
      phoneNumber,
      dateLaunched,
      kindId,
      outletType,
      outletSet
    } = this.state;
    const { updateOutlet } = this.props;
    updateOutlet({
      variables: {
        outletId,
        outletName,
        addressLine1,
        addressLine2,
        localGovernmentArea,
        country,
        cityName,
        phoneNumber,
        dateLaunched,
        kindId
      }
    })
      .then((results) => {
        notify(results.data.updateOutlet.success);
        this.toggleIsAcknowledged();
        return results;
      })
      .then((results) => {
        if (outletType === 'warehouse') {
          const { outlet } = results.data.updateOutlet;
          const newOutletSet = outletSet.filter(item => item.id !== outlet.id);
          this.setState({
            outletSet: [...newOutletSet, outlet],
            outletIsLoading: false,
            outletsActive: true,
            unhideMainButtons: true,
            edittingOutlet: false
          });
        }
      })
      .catch((error) => {
        notify(error.message.split(': ')[1]);
        this.setState({
          outletIsLoading: false,
          serverError: error.message.slice(14),
          sError: true
        });
      });
  };

  editRegister = () => {
    const { registerId, registerName, outletSet } = this.state;
    const registerIdInt = Number(registerId);
    const { updateRegister } = this.props;
    updateRegister({
      variables: {
        registerIdInt,
        registerName
      }
    })
      .then((results) => {
        const { outlet } = results.data.updateRegister.register;
        const newOutletSet = outletSet.filter(item => item.id !== outlet.id);
        this.setState({
          outletSet: [...newOutletSet, outlet],
          outletIsLoading: false,
          outletsActive: true,
          unhideMainButtons: true,
          edittingOutlet: false
        });
      })
      .catch((error) => {
        notify(error.message);
        this.setState({
          outletIsLoading: false
        });
      });
  };

  removeOutlet = (id) => {
    const { outletSet } = this.state;
    const { deleteOutlet } = this.props;
    deleteOutlet({
      variables: { id }
    })
      .then((results) => {
        notify(results.data.deleteOutlet.success);
        const outlets = outletSet.filter(outlet => outlet.id !== id);
        this.setState({ outletSet: outlets });
      })
      .catch((error) => {
        notify(error.message);
      });
  };

  finishAddOutlet = () => {
    const { activeStep, boxChecked } = this.state;
    const { userRoles } = this.props;
    const newStep = boxChecked ? steps.length : activeStep + 1;

    this.setState({
      activeStep: newStep,
      checked: false,
      roles: userRoles.roles
    });
  };

  classifyFormErrors = (errorMessage) => {
    this.setState({ isLoading: false, isError: true });
    if (errorMessage.includes('mobile number')) {
      return this.setState({ phoneError: errorMessage });
    }
    if (errorMessage.includes('username')) {
      return this.setState({ usernameError: errorMessage });
    }
    if (errorMessage.includes('email')) {
      return this.setState({ emailError: errorMessage });
    }
    return notify(errorMessage);
  };

  addUser = () => {
    this.setState({ isLoading: true });
    const {
      fName,
      lName,
      userUsername,
      userEmail,
      phone,
      jobTitle,
      roleId,
      outlet,
      startingDate,
      userId,
      editMode
    } = this.state;

    const { addUser, adminUserUpdate } = this.props;
    if (!editMode) {
      addUser({
        variables: {
          firstName: fName,
          lastName: lName,
          userUsername,
          userEmail,
          roleId,
          outlet,
          phone,
          jobTitle,
          startingDate
        }
      })
        .then((results) => {
          const { addUser: fetchedUser } = results.data;
          if (fetchedUser.errors) {
            this.classifyFormErrors(fetchedUser.errors[0].slice(22));
          } else {
            this.setState(prevState => ({
              showUsers: true,
              isLoading: false,
              isError: false,
              formError: false,
              users: prevState.users.concat({
                firstName: fName,
                lastName: lName,
                username: userUsername,
                email: userEmail,
                roleId,
                outlet,
                phone,
                jobTitle,
                startingDate,
                isActive: false
              })
            }));
            notify('User registered successfully');
          }
        })
        .catch((error) => {
          this.classifyFormErrors(error.message.slice(15));
        });
    } else {
      adminUserUpdate({
        variables: {
          userId,
          firstName: fName,
          lastName: lName,
          userUsername,
          userEmail,
          phone,
          jobTitle,
          startingDate
        }
      })
        .then((results) => {
          this.setState({
            showUsers: true,
            isLoading: false,
            isError: false
          });
          notify(results.data.adminUpdateUser.message[1]);
        })
        .catch((error) => {
          this.classifyFormErrors(error.message.slice(15));
        });
    }
  };

  static contextType = StateContext;

  render() {
    const {
      activeStep,
      checked,
      isLoading,
      unhideMainButtons,
      showUsers,
      users,
      editMode,
      boxChecked
    } = this.state;
    const { classes } = this.props;

    return (
      <React.Fragment>
        {activeStep === steps.length ? null : <NavBar />}
        <CssBaseline />
        <main className={classes.layout}>
          {activeStep === steps.length ? (
            <Paper elevation={2}>
              <Paper elevation={2} className={classes.finalScreenPaper}>
                <FinalScreen
                  state={this.state}
                />
              </Paper>
            </Paper>
          ) : (
            <React.Fragment>
              <Stepper
                alternativeLabel
                activeStep={activeStep}
                className={classes.stepper}
                connector={<StepperConnector />}
              >
                {steps.map(label => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={StepperIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Paper elevation={2} className={classes.paper}>
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {((activeStep !== 0 && showUsers && unhideMainButtons)
                      || (showUsers && activeStep === 3 && unhideMainButtons)) && (
                      <Button
                        onClick={this.handleBackButton}
                        className={classes.backButton}
                        disabled={activeStep === 2}
                        variant="text"
                        id="back-button"
                      >
                        Back
                      </Button>
                    )}
                    {!showUsers && activeStep === 3 && (
                      <Button
                        onClick={this.handleClickAddButton}
                        className={classes.backButton}
                        variant="text"
                        id="back-button"
                      >
                        Cancel
                      </Button>
                    )}
                    {isLoading ? (
                      <Loader />
                    ) : (
                      unhideMainButtons
                      // eslint-disable-next-line no-nested-ternary
                      && (activeStep !== 3 ? (
                        <Fab
                          variant="extended"
                          color="primary"
                          disabled={!checked}
                          onClick={this.handleNextButton}
                          className={classes.button}
                          id="next-button"
                        >
                          {activeStep === steps.length - 1 || boxChecked
                            ? 'Finish'
                            : 'Next'}
                        </Fab>
                      ) // eslint-disable-next-line no-nested-ternary
                        : showUsers && users.length > 0 ? (
                          <Fab
                            variant="extended"
                            color="primary"
                            disabled={false}
                            onClick={this.handleNextButton}
                            className={classes.button}
                            id="next-button"
                          >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                          </Fab>
                        ) : editMode ? (
                          <Fab
                            variant="extended"
                            color="primary"
                            disabled={false}
                            onClick={this.handleNextButton}
                            className={classes.button}
                            id="next-button"
                          >
                            Save Changes
                          </Fab>
                        ) : (
                          <Fab
                            variant="extended"
                            color="primary"
                            disabled={!checked}
                            onClick={this.handleNextButton}
                            className={classes.button}
                            id="next-button"
                          >
                            Invite
                          </Fab>
                        ))
                    )}
                  </div>
                </React.Fragment>
              </Paper>
            </React.Fragment>
          )}
        </main>
        {activeStep !== steps.length && <Footer />}
      </React.Fragment>
    );
  }
}

StepperNav.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.instanceOf(Object).isRequired,
  createOutlet: PropTypes.instanceOf(Object).isRequired,
  createRegister: PropTypes.instanceOf(Object).isRequired,
  deleteOutlet: PropTypes.instanceOf(Object).isRequired,
  updateOutlet: PropTypes.instanceOf(Object).isRequired,
  updateRegister: PropTypes.instanceOf(Object).isRequired,
  editAdmin: PropTypes.func.isRequired,
  createBusiness: PropTypes.func.isRequired,
  addUser: PropTypes.func.isRequired,
  adminUserUpdate: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  assignedOutlets: PropTypes.instanceOf(Object).isRequired,
  userRoles: PropTypes.instanceOf(Object).isRequired
};

const UPDATE_ADMIN_USER_MUTATION = graphql(UPDATE_ADMIN_USER, {
  name: 'editAdmin'
});
const GET_USER_INFO_QUERY = graphql(GET_USER_INFO, { name: 'userData' });
const GET_COUNTRIES_QUERY = graphql(GET_ALL_COUNTRIES, {
  name: 'countriesData'
});
const ADD_BUSINESS_MUTATION = graphql(CREATE_BUSSINESS, {
  name: 'createBusiness'
});
const ADD_OUTLET_MUTATION = graphql(CREATE_OUTLET, { name: 'createOutlet' });
const ADD_REGISTER_MUTATION = graphql(CREATE_REGISTER, {
  name: 'createRegister'
});
const UPDATE_OUTLET_MUTATION = graphql(UPDATE_OUTLET, { name: 'updateOutlet' });
const DELETE_OUTLET_MUTATION = graphql(DELETE_OUTLET, { name: 'deleteOutlet' });
const UPDATE_REGISTER_MUTATION = graphql(UPDATE_REGISTER, {
  name: 'updateRegister'
});
const ADD_USER = graphql(ADD_NEW_USER, { name: 'addUser' });
const ADMIN_USER_UPDATE = graphql(ADMIN_UPDATE_USER, {
  name: 'adminUserUpdate'
});
const GET_USER_ROLES = graphql(GET_ROLES, { name: 'userRoles' });
const GET_ASSIGNED_OUTLETS = graphql(GET_OUTLETS, {
  name: 'assignedOutlets',
  options: {
    variables: {
      id: localStorage.businessId
    }
  }
});

export default compose(
  UPDATE_ADMIN_USER_MUTATION,
  GET_USER_INFO_QUERY,
  GET_COUNTRIES_QUERY,
  ADD_BUSINESS_MUTATION,
  ADD_OUTLET_MUTATION,
  ADD_REGISTER_MUTATION,
  UPDATE_OUTLET_MUTATION,
  DELETE_OUTLET_MUTATION,
  UPDATE_REGISTER_MUTATION,
  ADD_BUSINESS_MUTATION,
  ADD_USER,
  ADMIN_USER_UPDATE,
  GET_USER_ROLES,
  GET_ASSIGNED_OUTLETS
)(withAuth(withStyles(styles)(StepperNav)));
