import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { TextField, FormLabel, Grid } from '@material-ui/core';
import { ProductFormStyles } from '../../../../assets/styles/products/addProductStyles';

const ProductDescriptions = (props) => {
  const {
    productName, handleChange, productDescription, handleProductName, globalUpc
  } = props;
  const upc = globalUpc ? `${globalUpc}` : '';
  return (
    <Fragment>
      <Grid style={ProductFormStyles.upcContainer}>
        <TextField
          style={ProductFormStyles.upcStyles}
          className="name"
          type="text"
          onChange={handleProductName}
          label="Name"
          required
          name="productName"
          value={productName}
        />
        <TextField
          style={ProductFormStyles.upcStyles}
          className="globalUpc"
          type="text"
          onChange={handleChange}
          inputProps={{ maxLength: 12 }}
          onInput={(e) => { e.target.value = e.target.value.replace(/[^0-9]/g, ''); }}
          label="Global UPC"
          name="globalUpc"
          value={upc}
        />
      </Grid>
      <Grid
        style={ProductFormStyles.descriptionField}
      >
        <FormLabel
          required
          style={ProductFormStyles.textAreaLabel}
        >
          Description
        </FormLabel>
        <textarea
          className="description"
          type="text"
          onChange={handleChange}
          name="productDescription"
          value={productDescription}
          rows="6"
          cols="70"
          style={ProductFormStyles.textArea}
        />
      </Grid>
    </Fragment>
  );
};

ProductDescriptions.propTypes = {
  productName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleProductName: PropTypes.func.isRequired,
  productDescription: PropTypes.string.isRequired,
  globalUpc: PropTypes.string.isRequired
};


export default ProductDescriptions;