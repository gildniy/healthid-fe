/* eslint-disable no-unused-expressions */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/sort-comp */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { compose, graphql, Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import {
  Paper,
  Grid,
  Typography,
  Button,
  withStyles
} from '@material-ui/core';

import {
  validateEmail, validatePhone, validateComment
} from '../../utils/validations';
import SupplierForm from './SupplierForm';
import withAuth from '../../withAuth';
import { GET_COUNTRIES_CITIES } from '../../../queries/countryQuery';
import CREATE_SUPPLIER from '../../../mutations/createSupplier';
import ProposeEditHeader from '../../products/Templates/ProposeEditHeader';
import notify from '../../shared/Toaster';
import verifyFile from '../../../utils/products/verifyFile';
import FormLoader from '../../shared/Loader/FormLoader';
import { MainBusinessSetUpStyles as styles } from '../../../assets/styles/setup';
import {
  SupplierFormStyles,
} from '../../../assets/styles/suppliers/addSupplierStyles';
import { proposeEditStyles } from '../../../assets/styles/products/products';
import initiateOrderStyles from '../../../assets/styles/orders/newOrder';

import { StateContext } from '../../../providers/stateProvider';

export class AddSupplier extends Component {
  state = {
    name: '',
    nameError: '',
    nameHelperText: '',
    email: '',
    emailError: false,
    emailHelperText: '',
    comment: '',
    commentError: '',
    commentHelperText: '',
    lineError: '',
    lineHelperText: '',
    mobileNumber: '',
    mobileNumberError: false,
    mobileHelperText: '',
    addressLine1: '',
    addressLine2: '',
    lga: '',
    commentary: '',
    countryValue: '',
    cities: '',
    cityValue: '',
    cityId: '',
    tierValue: '',
    tierId: '',
    countryId: '',
    logo: '',
    paymentTerms: 'CASH_ON_DELIVERY',
    creditDays: 0,
    loading: false,
    imageFile: '',
    fileName: '',
    src: null,
    crop: {
      aspect: 1 / 1
    },
    open: false,
    isDisabled: true,
    colorHasChanged: false,
    colorHasChangedCity: false
  };

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }

  handleSliderChange = (event) => {
    this.setState({ paymentTerms: 'ON_CREDIT' });
    if (event.target && event.target.name) {
      const value = (event.target.value && JSON.parse(event.target.value) > 45 && '45')
      || (event.target.value && JSON.parse(event.target.value) < 0 && '0');
      this.setState({ creditDays: value || event.target.value });
    } else {
      this.setState({ creditDays: event });
    }
  };

  handleRadioChange = (event) => {
    event.target.value === 'credit'
      ? this.setState({ paymentTerms: 'ON_CREDIT' })
      : this.setState({ paymentTerms: 'CASH_ON_DELIVERY' });
  };

  handleCommentChange = (event) => {
    const { value } = event.target;

    const isValid = validateComment(value);
    const [helperText, error] = isValid;
    this.setState({
      commentary: value,
      commentError: error,
      commentHelperText: helperText
    });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleCountryChange = (event) => {
    const {
      label, value, citySet, id
    } = event;
    this.setState({
      colorHasChanged: true,
      countryValue: { label, value },
      cities: citySet,
      cityValue: {
        label: citySet[0].name || '',
        value: citySet[0].name || ''
      },
      cityId: citySet[0].id,
      countryId: id
    });
  };

  handleCityChange = (event) => {
    const { label, value, id } = event;
    this.setState({
      cityValue: { label, value },
      cityId: id
    });
  };

  handlePaymentTermsChange = (event) => {
    const { value } = event.target;
    this.setState({ paymentTerms: value });
  };

  handleMobileChange = (value) => {
    const isValid = validatePhone(value);
    const [helperText, error] = isValid;
    this.setState({
      mobileNumber: value,
      mobileNumberError: error,
      mobileHelperText: helperText
    });
  };

  handleEmailChange = (event) => {
    const { value } = event.target;
    const isValid = validateEmail(value);
    const [helperText, error] = isValid;
    this.setState({
      email: value,
      emailError: error,
      emailHelperText: helperText
    });
  };

  handleColorChange = () => {
    this.setState({ colorHasChanged: true });
  };

  handleColorChangeCity = () => {
    this.setState({ colorHasChangedCity: true });
  };


  handleTierChange = (event) => {
    const { id, name } = event;
    this.setState({ tierId: id, tierValue: name });
  };

  handleProposeSupplier = (btnClicked) => {
    const { session: { me: { activeOutlet } }, addSupplier } = this.props;
    const {
      name,
      cityId,
      email,
      mobileNumber,
      addressLine1,
      addressLine2,
      lga,
      paymentTerms,
      commentary,
      tierId,
      countryId,
      creditDays,
      logo
    } = this.state;

    const outletId = activeOutlet.id;
    console.log("AddSupplier -> handleProposeSupplier -> outletId", outletId)
    this.setState({ loading: true });
    addSupplier({
      variables: {
        name,
        email,
        mobileNumber,
        addressLine1,
        addressLine2,
        lga,
        paymentTerms,
        commentary,
        cityId: parseInt(cityId, 10),
        tierId,
        countryId: parseInt(countryId, 10),
        creditDays,
        logo: logo || 'none',
        outletId,
      }
    })
      .then((res) => {
        const { history, refetch } = this.props;
        const { addSupplier: addedSupplier = {} } = res.data;
        const { name: supplierName = {}, id } = addedSupplier.supplier;
        notify(`${supplierName} with id ${id} has been added and sent for approval`);

        if (btnClicked === 'save') {
          history.push('/suppliers');
          refetch();
        }
      })
      .catch((err) => {
        const { message } = err.graphQLErrors[0];
        notify(message);
      });
  };

  handleSendForApproval = async (e) => {
    const btnClicked = e.currentTarget.id;
    await this.handleProposeSupplier(btnClicked);
  };

  handleAddAnotherSupplier = async (e) => {
    const btnClicked = e.currentTarget.id;
    await this.handleProposeSupplier(btnClicked);
    setTimeout(() => {
      this.setState({
        name: '',
        email: '',
        mobileNumber: '',
        addressLine1: '',
        addressLine2: '',
        lga: '',
        commentary: '',
        cityId: '',
        countryValue: '',
        cities: '',
        tierId: '',
        countryId: '',
        logo: '',
        paymentTerms: 'CASH_ON_DELIVERY',
        creditDays: '',
        loading: false,
        imageFile: '',
        fileName: '',
        src: null,
        crop: {
          aspect: 1 / 1
        },
        open: false,
      });
    }, 1500);
  };

  onSelectFile = (e) => {
    const { files } = e.target;
    const imageFile = e.target.files[0];
    const maxFileSize = 1000000; // bytes
    const acceptedFileType = 'image/jpg, image/jpeg, image/JPEG, image/png, image/PNG';
    if (files && files.length > 0) {
      const verified = verifyFile(files, maxFileSize, acceptedFileType);
      if (verified) {
        this.setState({
          fileName: files[0].name,
          imageFile
        });

        const reader = new FileReader();
        reader.addEventListener('load', () => {
          this.setState({
            src: reader.result,
            open: true
          });
        }, false);
        reader.readAsDataURL(imageFile);
      }
    }
  };

  getCroppedImg = (imageFile, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    const promise = new Promise((resolve) => {
      image.onload = (() => {
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
      });
      image.src = imageFile;
    }).then(() => new Promise((resolve) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    }));
    return promise;
  };

  handleImageDrop = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('api_key', `${process.env.API_KEY}`);
    formData.append('timestamp', (Date.now() / 1000) || 0);
    return axios({
      url: process.env.CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    }).then((response) => {
      const { data } = response;
      const fileURL = data.secure_url;
      this.setState({
        logo: fileURL
      });
      notify('Image uploaded successfully');
    }).catch((err) => {
      notify('There was an error uploading the image', err);
    });
  };

  handleDragOverImage = (acceptedFiles) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const binaryStr = reader.result;
      this.setState({ imageFile: acceptedFiles, src: binaryStr, open: true });
    }, false);

    acceptedFiles.forEach(file => reader.readAsDataURL(file));
  };

  handleSave = () => {
    const {
      src,
      fileName,
      crop
    } = this.state;

    this.getCroppedImg(src, crop, fileName).then((data) => {
      this.handleImageDrop(data);
      this.setState({
        src: '',
        open: false
      });
    });
  };

  handleClose = () => {
    const { src } = this.state;
    this.setState({
      src: '',
      open: false
    });
    this.handleImageDrop(src);
  };


  handleOnCropChange = (crop) => {
    this.setState({ crop });
  };

  static contextType = StateContext;

  render() {
    const {
      name,
      email,
      emailError,
      nameError,
      mobileNumber,
      mobileNumberError,
      addressLine1,
      paymentTerms,
      cityId,
      tierId,
      countryId,
      creditDays,
      isDisabled,
    } = this.state;

    const disableButton = !name
    || !email
    || !mobileNumber
    || !addressLine1
    || !paymentTerms
    || emailError
    || nameError
    || mobileNumberError
    || !cityId
    || !tierId
    || !countryId
    || (!isDisabled && !creditDays);

    const { classes } = this.props;

    return (
      <div>
        <Query
          query={GET_COUNTRIES_CITIES}
          variables={{ outletId: localStorage.outletId }}
        >
          {({ loading, error, data }) => (loading && <FormLoader />) || (error && <p>Error</p>) || (
            <div>
              <ProposeEditHeader
                type="Suppliers"
                classes={classes}
                previousPage="/suppliers/approved"
              >
                <Button
                  id="saveNew"
                  disabled={disableButton}
                  className={classes.closeBtn}
                  onClick={this.handleAddAnotherSupplier}
                >
                  SAVE & ADD NEW
                </Button>
                <Button
                  id="save"
                  disabled={disableButton}
                  className={disableButton ? `${classes.openBtn} ${classes.closeBtn}` : classes.openBtn}
                  onClick={this.handleSendForApproval}
                >
                  SAVE
                </Button>
              </ProposeEditHeader>
              <Paper elevation={2} style={SupplierFormStyles.paperForm}>
                <Grid style={styles.contentHeader}>
                  <Typography style={initiateOrderStyles.newOrderTitle} variant="h5">
                    Add Supplier
                  </Typography>
                </Grid>
                <SupplierForm
                  state={this.state}
                  initialData={data}
                  handleChange={this.handleChange}
                  handleCommentChange={this.handleCommentChange}
                  onSelectFile={this.onSelectFile}
                  handleOnDrop={this.handleImageDrop}
                  handleOnCropChange={this.handleOnCropChange}
                  handleTierChange={this.handleTierChange}
                  handleCountryChange={this.handleCountryChange}
                  handleCityChange={this.handleCityChange}
                  handleClose={this.handleClose}
                  handleSave={this.handleSave}
                  handlePaymentTermsChange={this.handlePaymentTermsChange}
                  handleMobileChange={this.handleMobileChange}
                  handleEmailChange={this.handleEmailChange}
                  handleColorChange={this.handleColorChange}
                  handleColorChangeCity={this.handleColorChangeCity}
                  handleSliderChange={this.handleSliderChange}
                  handleDragImage={this.handleDragOverImage}
                  handleRadioChange={this.handleRadioChange}
                />
              </Paper>
            </div>
          )}
        </Query>
      </div>
    );
  }
}

AddSupplier.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  addSupplier: PropTypes.func.isRequired,
  refetch: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

AddSupplier.defaultProps = {
  history: {},
  refetch: () => { }
};

const ADD_SUPPLIER = graphql(CREATE_SUPPLIER, { name: 'addSupplier' });

export default withAuth((compose(
  ADD_SUPPLIER
)(withRouter(withStyles(proposeEditStyles)(AddSupplier)))));
