/* eslint-disable no-mixed-operators */
import React from 'react';
import PropTypes from 'prop-types';
import 'react-phone-number-input/style.css';
import flags from 'react-phone-number-input/flags';
import PhoneInput from 'react-phone-number-input';
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {
  Grid,
  TextField,
  FormControl,
  Typography,
  FormLabel,
  Radio,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Divider,
  Input,
  InputAdornment,
} from '@material-ui/core';
import initiateOrderStyles from '../../../assets/styles/orders/newOrder';

import {
  SupplierFormStyles,
  deliveryStyles
} from '../../../assets/styles/suppliers/addSupplierStyles';
import '../../../assets/styles/suppliers/sliderLabel.scss';
import ImageUpload from './Inputs/ImageUpload';
import getOutletCountryCode from './Inputs/CountryCode';
import RenderCustomSelectField from '../../shared/renderCustomSelectField';

const SupplierForm = (props) => {
  const {
    state: {
      name,
      email,
      emailError,
      emailHelperText,
      nameError,
      nameHelperText,
      lineError,
      lineHelperText,
      mobileNumber,
      mobileNumberError,
      mobileHelperText,
      addressLine1,
      addressLine2,
      lga,
      paymentTerms,
      commentary,
      commentError,
      commentHelperText,
      countryValue,
      cities,
      cityValue,
      tierValue,
      creditDays,
      logo,
    },
    state,
    handleChange,
    handleCommentChange,
    onSelectFile,
    handleOnCropChange,
    handleClose,
    handleSave,
    handleTierChange,
    handleCountryChange,
    handleCityChange,
    handleMobileChange,
    handleEmailChange,
    handleOnDrop,
    initialData,
    handleSliderChange,
    handleDragImage,
    handleRadioChange,
    type
  } = props;
  const { countries, outlet } = initialData;

  const [countryCode] = getOutletCountryCode(outlet);

  const days = [];

  for (let i = 1; i <= 10; i += 1) {
    days.push(i);
  }

  const countryList = [];
  if (countries) {
    countries.map(country => countryList.push({
      label: country.name,
      value: country.name,
      ...country
    }));
  }

  const cityList = [];
  if (cities.length > 1) {
    cities.map(city => cityList.push({
      label: city.name,
      value: city.name,
      ...city
    }));
  }

  return (
    <form>
      <Grid container spacing={3} style={SupplierFormStyles.gridContainer}>
        {/* row 4 brand, manufacturer */}
        <Grid item xs={6} style={SupplierFormStyles.childGrid}>
          <TextField
            required
            onChange={handleChange}
            type="text"
            label="Name"
            name="name"
            value={name}
            fullWidth
            error={nameError}
            helperText={nameHelperText}
          />
        </Grid>
        {/* work n tier */}
        <Grid item xs={6} style={SupplierFormStyles.tierField}>
          <RenderCustomSelectField
            options={[
              { id: 1, name: 'Manufacturer' },
              { id: 2, name: 'Importer' },
              { id: 3, name: '1T wholesaler' },
              { id: 4, name: '2T wholesaler' },
              { id: 5, name: '3T wholesaler' }
            ]}
            label="Tier *"
            value={tierValue}
            handleOptionChange={handleTierChange}
          />
        </Grid>
        {/* email */}
        <Grid item xs={6} style={SupplierFormStyles.childGrid}>
          <TextField
            required
            label="Email"
            type="text"
            fullWidth
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            helperText={emailHelperText}
          />
        </Grid>
        {/* mobile */}
        <Grid item xs={6} style={SupplierFormStyles.paymentGrid}>
          <PhoneInput
            id="phone"
            placeholder="Phone *"
            country={countryCode}
            flags={flags}
            value={mobileNumber}
            onChange={value => handleMobileChange(value)}
            style={{ fontSize: '12px' }}
            error={mobileNumberError ? mobileHelperText : ''}
          />
        </Grid>
        {/* addressline 1 */}
        <Grid item xs={12} style={SupplierFormStyles.lineGrid}>
          <TextField
            required
            label="Address Line 1"
            type="text"
            fullWidth
            name="addressLine1"
            value={addressLine1}
            onChange={handleChange}
            error={lineError}
            helperText={lineHelperText}
          />
        </Grid>
        {/* addressline 2 */}
        <Grid item xs={12} style={SupplierFormStyles.childGrid}>
          <TextField
            label="Address Line 2"
            type="text"
            fullWidth
            name="addressLine2"
            value={addressLine2}
            onChange={handleChange}
          />
        </Grid>
        {/* country */}
        <Grid variant="h6" item xs={4} style={SupplierFormStyles.childGrid}>
          <RenderCustomSelectField
            options={countryList}
            label="Country *"
            value={countryValue.value}
            handleOptionChange={handleCountryChange}
          />
        </Grid>
        {/* city */}
        <Grid item xs={4} style={SupplierFormStyles.childGrid}>
          <RenderCustomSelectField
            options={cityList}
            label="City *"
            value={cityValue.value}
            handleOptionChange={handleCityChange}
          />
        </Grid>

        {/* LGA */}
        <Grid item xs={4} style={SupplierFormStyles.childGrid}>
          <TextField
            label="Region"
            type="text"
            fullWidth
            name="lga"
            onChange={handleChange}
            value={lga}
          />
        </Grid>
        <Grid item xs={12}>
          <FormGroup row style={initiateOrderStyles.ulAddSupplier} Component="fieldset">
            <ul style={initiateOrderStyles.UlStyles}>
              <li style={deliveryStyles.formList}>
                Payment Terms:*
              </li>
              <li style={initiateOrderStyles.autofillContainer}>
                <RadioGroup
                  row
                  style={initiateOrderStyles.addSupplierRadio}
                >
                  <FormControlLabel
                    style={deliveryStyles.formLabel}
                    value="delivery"
                    onClick={handleRadioChange}
                    control={<Radio checked={paymentTerms !== 'ON_CREDIT'} />}
                    label={(
                      <span style={deliveryStyles.formLabelSpan(paymentTerms)}>
                        Cash on Delivery
                      </span>
                    )}
                  />
                  <FormControlLabel
                    style={deliveryStyles.creditFormLabel}
                    onChange={handleRadioChange}
                    value="credit"
                    control={<Radio checked={paymentTerms === 'ON_CREDIT'} />}
                    label={(
                      <span style={deliveryStyles.creditFormLabelSpan(paymentTerms)}>
                        On Credit
                      </span>
                    )}
                  />
                </RadioGroup>
              </li>
            </ul>
          </FormGroup>
        </Grid>
        {/* Payment terms */}
        {paymentTerms === 'ON_CREDIT' && (
          <>
            <Grid item xs={2} style={SupplierFormStyles.childSliderLabel}>
              <FormLabel style={SupplierFormStyles.paymentGrid}>
                # of Credit Days:*
              </FormLabel>
            </Grid>
            {/* credit days */}
            <Grid item xs={8} style={SupplierFormStyles.childSlider}>
              <FormControl fullWidth>
                <Slider
                  min={0}
                  max={45}
                  onChange={handleSliderChange}
                  value={creditDays}
                  handleLabel={creditDays}
                />
                <span className="breakpoint">
                  <span className="fbreack">|</span>
                  <span className="sbreak" style={{ marginLeft: '12.3rem' }}>|</span>
                  <span className="tbreak" style={{ marginLeft: '11rem' }}>|</span>
                  <span className="fbreak" style={{ marginLeft: '12.5rem' }}>|</span>
                </span>
                <span className="breakpoints">
                  <span className="fbreack">0</span>
                  <span className="sbreak" style={{ marginLeft: '12.1rem' }}>15</span>
                  <span className="tbreak" style={{ marginLeft: '10.4rem' }}>30</span>
                  <span className="fbreak" style={{ marginLeft: '11.8rem' }}>45</span>
                </span>
              </FormControl>
            </Grid>
            <Grid
              xs={2}
              style={deliveryStyles.textInput}
            >
              <Input
                name="price"
                value={creditDays}
                className="pricing-popper__input pricing"
                onChange={handleSliderChange}
                disableUnderline
                inputProps={{
                  style: { textAlign: 'right', padding: '7px 0', }
                }}
                endAdornment={(
                  <InputAdornment position="end" style={{ marginLeft: '4px' }}>
                    <Divider orientation="vertical" className="adornment-divider" />
                  </InputAdornment>
                )}
              />
              <span style={deliveryStyles.spanDays}>
                days
              </span>
            </Grid>
          </>
        )}

        {/* commentary */}
        {type === 'edit' ? '' : (
          <Grid item xs={6} style={SupplierFormStyles.commentaryField}>
            <Typography style={SupplierFormStyles.textAreaLabel}>Commentary</Typography>
            <TextField
              type="text"
              fullWidth
              name="commentary"
              variant="outlined"
              multiline
              rows="10"
              value={commentary}
              onChange={handleCommentChange}
              error={commentError}
              helperText={commentHelperText}
            />
          </Grid>
        )
        }
        {/* Drag and drop zone */}
        <Grid item xs={type === 'edit' ? 12 : 6} style={SupplierFormStyles.childGrid}>
          <Typography style={SupplierFormStyles.textAreaLabel}>Upload Brand logo</Typography>
          <ImageUpload
            state={state}
            logo={logo}
            handleOnDrop={handleOnDrop}
            handleOnCropChange={handleOnCropChange}
            onSelectFile={onSelectFile}
            handleClose={handleClose}
            handleSave={handleSave}
            dragImage={handleDragImage}
            type={type}
          />
        </Grid>
      </Grid>
    </form>
  );
};

SupplierForm.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  initialData: PropTypes.shape({
    cities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      })
    ),
    countries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string
      })
    ),
    outlet: PropTypes.instanceOf(Object)
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCommentChange: PropTypes.func.isRequired,
  handleOnCropChange: PropTypes.func.isRequired,
  handleOnDrop: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleTierChange: PropTypes.func.isRequired,
  handleCountryChange: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  handleMobileChange: PropTypes.func.isRequired,
  handleEmailChange: PropTypes.func.isRequired,
  handleSliderChange: PropTypes.func.isRequired,
  handleDragImage: PropTypes.func.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

SupplierForm.defaultProps = {
  type: ''
};

export default SupplierForm;
