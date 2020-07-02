import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { graphql, compose } from 'react-apollo';
import { Link, withRouter } from 'react-router-dom';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {
  Typography, TextField, Paper, Grid, Button
} from '@material-ui/core';
import {
  MainBusinessSetUpStyles as styles,
  BusinessSetUpStyles,
  SetupHeader
} from '../../../assets/styles/setup';
import FileUpload from '../../setup/fileUpload';
import withAuth from '../../withAuth';
import { StateContext } from '../../../providers/stateProvider';
import notify from '../../shared/Toaster';
import Footer from '../../shared/Footer';
import UPDATE_BUSINESS from '../../../mutations/updateBusinessMutation';
import GET_ALL_COUNTRIES from '../../../queries/countryQuery';

export class BusinessUpdate extends Component {
  state = {
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

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid9'
    });

    const { session } = this.props;
    const { businessUser } = session.me;

    this.setState({
      businessId: businessUser.id,
      legalName: businessUser.legalName,
      tradingName: businessUser.tradingName,
      businessEmail: businessUser.businessEmail,
      addressLine1: businessUser.addressLine1,
      addressLine2: businessUser.addressLine2,
      phoneNumber: businessUser.phoneNumber,
      city: businessUser.city,
      country: businessUser.country,
      localGovernmentArea: businessUser.localGovernmentArea,
      website: businessUser.website,
      twitter: businessUser.twitter,
      instagram: businessUser.instagram,
      logo: businessUser.logo,
      facebook: businessUser.facebook
    });
  }

  componentWillReceiveProps(nextProps) {
    nextProps && this.fetchUserData(nextProps);
  }

  handleInPutChange = (event) => {
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value,
        isError: false,
        formError: false
      },
      () => this.checkForRequiredFields()
    );
  };

  checkForRequiredFields = () => {
    const {
      legalName,
      tradingName,
      addressLine1,
      phoneNumber,
      businessEmail,
      city,
      country
    } = this.state;

    if (
      legalName === ''
      || tradingName === ''
      || addressLine1 === ''
      || phoneNumber === ''
      || businessEmail === ''
      || city === ''
      || country === ''
    ) {
      this.setState({
        formError: true,
        active: true,
        saveButtonStyle: SetupHeader.disabledSaveButton
      });
    } else {
      this.setState({ active: false, saveButtonStyle: SetupHeader.saveButton });
    }
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

  handleClose = () => {
    const { originalImageFile } = this.state;
    this.setState({ src: '', open: false });
    this.handleImageDrop(originalImageFile);
  };

  getCroppedImg = (imageFile, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    const promise = new Promise((resolve) => {
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

  handleSave = () => {
    const { src, fileName, crop } = this.state;

    this.getCroppedImg(src, crop, fileName).then((data) => {
      this.handleImageDrop(data);
      this.setState({ src: '', open: false });
    });
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
    return (
      !legalName
      || !tradingName
      || !phoneNumber
      || !businessEmail
      || !country
      || !city
      || !addressLine1
    );
  };

  fetchUserData = (nextProps) => {
    const {
      countriesData: { countries }
    } = nextProps;

    let cities = [];

    countries
      && countries.map((country) => {
        if (country.name === 'Nigeria') {
          cities = country.citySet;
        }
        return null;
      });
    return this.setState({
      cities,
      countries,
      isLoading: false
    });
  };

  saveBusiness = () => {
    const { history } = this.props;
    const invalidForm = this.handleBusinessFormInputValidation();

    if (!invalidForm) {
      const {
        businessId,
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
      } = this.state;

      const { updateBusiness } = this.props;

      return updateBusiness({
        variables: {
          businessId,
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
        .then(() => {
          notify('Business Information Updated');
          setTimeout(
            () => history.push('/main_setup/business_information'),
            2000
          );
        })
        .catch((error) => {
          notify(error.message.slice(14));
        });
    }
  };

  returnTextField = (id, name, label, state) => (
    <TextField
      id={id}
      name={name}
      label={label}
      fullWidth
      value={state || ''}
      error={state ? false : this.formError}
      helperText={state ? '' : this.errorHandler()}
      onChange={this.handleInPutChange}
    />
  );

  static contextType = StateContext;

  render() {
    const {
      logo,
      addressLine1,
      businessEmail,
      facebook,
      instagram,
      legalName,
      phoneNumber,
      tradingName,
      twitter,
      website,
      addressLine2,
      city,
      country,
      localGovernmentArea,
      active,
      saveButtonStyle
    } = this.state;

    return (
      <Fragment>
        <Grid style={styles.container}>
          <Grid style={SetupHeader.adjustUpdateBackButton}>
            <Grid item xs={1} style={SetupHeader.backBox}>
              <Button style={SetupHeader.backButton}>
                <Link
                  to="/main_setup/business_information"
                  style={SetupHeader.link}
                >
                  <ArrowBack fontSize="large" />
                </Link>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={10} style={SetupHeader.wrapper}>
            <Grid style={styles.profileHeader}>
              <Typography variant="h5">Back</Typography>
              <Button
                style={saveButtonStyle}
                onClick={this.saveBusiness}
                disabled={active}
              >
                Save
              </Button>
            </Grid>
            <Paper elevation={2} style={BusinessSetUpStyles.paperEdit}>
              <form>
                <Grid item style={BusinessSetUpStyles.contentHeader}>
                  <Typography variant="h5">Business Information</Typography>
                </Grid>
                <Grid
                  container
                  spacing={24}
                  justify="center"
                  style={BusinessSetUpStyles.gridContainer}
                >
                  <Grid item xs={6}>
                    {this.returnTextField(
                      'legalname',
                      'legalName',
                      'Legal Name',
                      legalName
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    {this.returnTextField(
                      'tradingname',
                      'tradingName',
                      'Trading Name',
                      tradingName
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    {this.returnTextField(
                      'address1',
                      'addressLine1',
                      'Address line 1',
                      addressLine1
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    {this.returnTextField(
                      'address2',
                      'addressLine2',
                      'Address line 2',
                      addressLine2
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    {this.returnTextField(
                      'country',
                      'country',
                      'Country',
                      country
                    )}
                  </Grid>

                  <Grid item xs={4}>
                    {this.returnTextField('city', 'city', 'City', city)}
                  </Grid>

                  <Grid item xs={4}>
                    {this.returnTextField(
                      'lga',
                      'localGovernmentArea',
                      'Region',
                      localGovernmentArea
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    {this.returnTextField(
                      'phone',
                      'phoneNumber',
                      'Primary Phone #',
                      phoneNumber
                    )}
                  </Grid>

                  <Grid item xs={6}>
                    {this.returnTextField(
                      'email',
                      'businessEmail',
                      'Business Email',
                      businessEmail
                    )}
                  </Grid>

                  <Grid item container xs={6}>
                    <Grid item xs={12}>
                      {this.returnTextField(
                        'website',
                        'website',
                        'Website',
                        website
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {this.returnTextField(
                        'twitter',
                        'twitter',
                        'Twitter',
                        twitter
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {this.returnTextField(
                        'facebook',
                        'facebook',
                        'Facebook',
                        facebook
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      {this.returnTextField(
                        'instagram',
                        'instagram',
                        'Instagram',
                        instagram
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Paper elevation={2} style={BusinessSetUpStyles.paper}>
                      <FileUpload
                        state={this.state}
                        handleImageDrop={this.handleImageDrop}
                        logo={logo}
                        onSelectFile={this.onSelectFile}
                        onCropChange={this.onCropChange}
                        handleClose={this.handleClose}
                        handleSave={this.handleSave}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </Fragment>
    );
  }
}

BusinessUpdate.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      businessUser: PropTypes.instanceOf(Object).isRequired
    }).isRequired,
    outlets: PropTypes.array
  }).isRequired,
  updateBusiness: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

const GET_COUNTRIES_QUERY = graphql(GET_ALL_COUNTRIES, {
  name: 'countriesData'
});
const UPDATE_BUSINESS_MUTATION = graphql(UPDATE_BUSINESS, {
  name: 'updateBusiness'
});

export default compose(
  GET_COUNTRIES_QUERY,
  UPDATE_BUSINESS_MUTATION
)(withAuth(withRouter(BusinessUpdate)));
