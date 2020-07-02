import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, TextField, Typography, Divider
} from '@material-ui/core';
import { ProductFormStyles } from '../../../assets/styles/products/addProductStyles';
import TagInput from './Inputs/Tags';
import ImageUpload from './Inputs/ImageUpload';
import ProductDescriptions from './Inputs/ProductDescriptions';
import RenderCustomSelectField from '../../shared/renderCustomSelectField';
import CustomSearchField from '../../shared/customSearchField';

const styles = ProductFormStyles;

const ProductForm = (props) => {
  const {
    state: {
      tags, vatName, preferredSupplier,
      backupSupplier, productName, globalUpc,
      productDescription, brand, manufacturer, loyaltyWeight, productImage,
      categoryName, dispensingSizeName, errorText, searching, active, reorderPoint, reorderMax
    },
    state, displaySelected, popperClickAway, title,
    handleChange, handleAddition, handleDelete, onSelectFile, handleDispensingSizeChange,
    handleOnCropChange, handleClose, handleSave, handleVatChange,
    handleProductName, handleCategoryChange, handleOnDrop, initialData
  } = props;

  const {
    productCategories,
    dispensingSize,
  } = initialData;

  const vatOptions = [
    { name: 'VAT', id: true },
    { name: 'No VAT', id: false }
  ];
  return (
    <Fragment>
      <Paper elevation={2} style={styles.paperForm}>
        <div style={ProductFormStyles.titleStyles}>
          <h3 style={ProductFormStyles.title}>{title}</h3>
          <Divider />
        </div>
        <Grid container spacing={3} style={ProductFormStyles.gridContainer}>
          <Grid item xs={8} style={ProductFormStyles.descriptionsGrid}>
            <ProductDescriptions
              productName={productName}
              globalUpc={globalUpc}
              handleProductName={handleProductName}
              handleChange={handleChange}
              productDescription={productDescription}
            />
          </Grid>
          <Grid item xs={4} style={ProductFormStyles.uploadGrid}>
            <ImageUpload
              state={state}
              productImage={productImage}
              handleOnDrop={handleOnDrop}
              handleOnCropChange={handleOnCropChange}
              onSelectFile={onSelectFile}
              handleClose={handleClose}
              handleSave={handleSave}
            />
          </Grid>
          <Grid item xs={4} style={styles.childGrid}>
            <TextField
              onChange={handleChange}
              type="text"
              label="Brand"
              name="brand"
              value={brand}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} style={styles.childGrid}>
            <TextField
              label="Manufacturer"
              type="text"
              fullWidth
              name="manufacturer"
              value={manufacturer}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4} style={styles.childGrid}>
            <RenderCustomSelectField
              options={dispensingSize}
              label="Dispensing Size"
              value={dispensingSizeName}
              handleOptionChange={handleDispensingSizeChange}
            />
          </Grid>
          <Grid item xs={6} style={styles.childGrid}>
            <CustomSearchField
              state={state}
              value={preferredSupplier}
              label="Preferred Supplier"
              name="preferredSupplier"
              placeholder="Search supplier..."
              errorText={errorText}
              searching={searching}
              active={active}
              handleChange={handleChange}
              displaySelected={displaySelected}
              popperClickAway={popperClickAway}
              styles={ProductFormStyles}
              large
            />
          </Grid>
          <Grid item xs={6} style={styles.childGrid}>
            <CustomSearchField
              state={state}
              value={backupSupplier}
              label="Backup Supplier"
              name="backupSupplier"
              placeholder="Search supplier..."
              errorText={errorText}
              searching={searching}
              active={active}
              handleChange={handleChange}
              displaySelected={displaySelected}
              popperClickAway={popperClickAway}
              styles={ProductFormStyles}
              large
            />
          </Grid>
          <Grid item xs={4} style={styles.childGrid}>
            <RenderCustomSelectField
              options={productCategories}
              label="Category"
              value={categoryName}
              handleOptionChange={handleCategoryChange}
            />
          </Grid>
          <Grid item xs={4} style={styles.childGrid}>
            <TextField
              label="Loyalty Weight"
              type="number"
              placeholder="Please input a number"
              fullWidth
              name="loyaltyWeight"
              onChange={handleChange}
              value={loyaltyWeight}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={4} style={styles.childGrid}>
            <RenderCustomSelectField
              options={vatOptions}
              label="VAT Status"
              value={vatName}
              handleOptionChange={handleVatChange}
            />
          </Grid>
          <Grid item xs={4} style={styles.childGrid}>
            <TextField
              label="Reorder Point"
              type="number"
              fullWidth
              name="reorderPoint"
              onChange={handleChange}
              value={reorderPoint}
              InputProps={{ inputProps: { min: 1, max: reorderMax } }}
            />
          </Grid>
          <Grid item xs={4} style={styles.childGrid}>
            <TextField
              label="Reorder Max"
              type="number"
              fullWidth
              name="reorderMax"
              onChange={handleChange}
              value={reorderMax}
              InputProps={{ inputProps: { min: reorderPoint } }}
            />
          </Grid>
          <Grid item xs={12} style={{ ...styles.childGrid, marginBottom: '3.5rem' }}>
            <Typography style={styles.textAreaLabel}>
              Tags
            </Typography>
            <TagInput
              handleAddition={handleAddition}
              handleDelete={handleDelete}
              tags={tags}
            />
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

ProductForm.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  initialData: PropTypes.shape({
    business: PropTypes.shape({
      suppliersSet: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string
        })
      )
    }),
    productCategories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        isVatApplicable: PropTypes.bool,
        loyaltyWeight: PropTypes.number,
        markup: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    dispensingSize: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      })
    ),
  }).isRequired,
  title: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddition: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleOnCropChange: PropTypes.func.isRequired,
  handleOnDrop: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  handleProductName: PropTypes.func.isRequired,
  handleCategoryChange: PropTypes.func.isRequired,
  handleDispensingSizeChange: PropTypes.func.isRequired,
  handleVatChange: PropTypes.func.isRequired,
  displaySelected: PropTypes.func.isRequired,
  popperClickAway: PropTypes.func.isRequired
};

export default ProductForm;
