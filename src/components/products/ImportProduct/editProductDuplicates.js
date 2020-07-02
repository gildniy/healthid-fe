import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import {
  Paper, Grid, TextField, Select, FormControl, MenuItem, InputLabel, Typography
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import withAuth from '../../withAuth';
import UPDATE_PRODUCT from '../../../mutations/products/updateProduct';
import notify from '../../shared/Toaster';
import verifyFile from '../../../utils/products/verifyFile';
import { ProductFormStyles } from '../../../assets/styles/products/addProductStyles';
import ActionButtons from './Inputs/ActionButtons';
import TagInput from './Inputs/Tags';
import ImageUpload from './Inputs/ImageUpload';
import { ImportProductStyles } from '../../../assets/styles/products/ImportProductStyles';
import '../../../assets/styles/products/productDialog.css';

export class EditDuplicateSupplier extends Component {
  state = {
    productCategory: '',
    id: '',
    productName: '',
    productDescription: '',
    dispensingSizeVal: '',
    description: '',
    brand: '',
    manufacturer: '',
    vatStatus: '',
    preferredSupplier: '',
    backupSupplier: '',
    loyaltyWeight: '',
    image: '',
    tags: [],
    taggs: '',
    imageFile: '',
    fileName: '',
    src: null,
    crop: {
      aspect: 1 / 1
    },
    suppliers: [],
    categories: [],
    dispensingSizes: [],
  }

  componentWillMount() {
    const { duplicateInformation: { data, conflicts } } = this.props;
    const productId = conflicts.map(prodId => prodId.id);

    this.setState({
      productCategory: data['product category'],
      id: productId[0],
      productName: data['product name'],
      productDescription: data.description,
      dispensingSizeVal: data['dispensing size'],
      brand: data.brand,
      manufacturer: data.manufacturer,
      vatStatus: data['vat status'],
      preferredSupplier: data['preferred supplier'],
      backupSupplier: data['backup supplier'],
      loyaltyWeight: data['loyalty weight'],
      productImage: data.image,
      taggs: data.tags
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleEditProductDuplicate = () => {
    const { editProduct } = this.props;

    const {
      productName,
      id,
      productDescription,
      productImage,
      brand,
      manufacturer,
      preferredSupplierId,
      backupSupplierId,
      categoryId,
      dispensingSizeId,
      loyaltyWeight,
      vatStatus
    } = this.state;

    this.setState({ loading: true });

    const tagsArray = [];

    editProduct({
      variables: {
        productCategoryId: categoryId,
        productName,
        id,
        dispensingSizeId,
        description: productDescription,
        brand,
        manufacturer,
        vatStatus,
        preferredSupplierId,
        backupSupplierId,
        loyaltyWeight,
        tags: tagsArray,
        image: productImage || 'none'
      }
    })
      .then((res) => {
        const { productName: editedProduct } = res.data.updateProduct.product;
        notify(`${editedProduct} updated successfully`);
      })
      .catch((err) => {
        const { message } = err.graphQLErrors[0];
        notify(message);
      });
  };

  handleEditProduct = () => {
    this.handleEditProductDuplicate();
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
        reader.addEventListener(
          'load',
          () => {
            this.setState({
              src: reader.result,
              open: true
            });
          },
          false
        );
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
        this.setState({
          productImage: fileURL
        });
      })
      .catch(() => notify('There was an error uploading the image'));
  };

  handleSave = () => {
    const { src, fileName, crop } = this.state;

    this.getCroppedImg(src, crop, fileName).then((data) => {
      this.handleImageDrop(data);
      this.setState({
        src: '',
        open: false
      });
    });
  };

  handleClose = () => {
    const { imageFile } = this.state;
    this.setState({
      src: '',
      open: false
    });
    this.handleImageDrop(imageFile);
  };

  handleOnCropChange = (crop) => {
    this.setState({ crop });
  };

  handleDelete = (i) => {
    const { tags } = this.state;
    this.setState({
      tags: tags.filter((tag, index) => index !== i)
    });
  };

  handleAddition = (tag) => {
    this.setState(state => ({ tags: [...state.tags, tag] }));
  };

  render() {
    const { handleCloseEditDuplicates, initialData } = this.props;

    const {
      productCategory,
      productName,
      productDescription,
      dispensingSizeVal,
      brand,
      manufacturer,
      vatStatus,
      preferredSupplier,
      backupSupplier,
      loyaltyWeight,
      productImage,
      tags,
      taggs
    } = this.state;

    const {
      business,
      productCategories,
      dispensingSize,
    } = initialData;

    return (
      <Dialog
        maxWidth="lg"
        open
        style={{ backgroundColor: 'rgba(100, 100, 100, 0.6)' }}
        BackdropProps={{
          invisible: true
        }}
      >
        <ClickAwayListener onClickAway={handleCloseEditDuplicates}>
          <div className="duplicate-form">
            <form>
              <Grid
                container
                spacing={3}
                style={ProductFormStyles.gridContainer}
              >
                <Paper elevation={2} className="duplicate-title">
                  <Grid
                    item
                    xs={12}
                    style={ImportProductStyles.textSection}
                  >
                    Update Existing Product
                  </Grid>
                </Paper>
                <Grid
                  item
                  xs={12}
                >
                  <hr style={ImportProductStyles.horizontalLine} />
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={ProductFormStyles.descriptionsGrid}
                >
                  <div>
                    <TextField
                      className="name"
                      type="text"
                      onChange={this.handleChange}
                      label="Name"
                      fullWidth
                      required
                      name="productName"
                      value={productName}
                    />
                  </div>
                  <div
                    style={ProductFormStyles.descriptionField}
                  >
                    <Typography style={ProductFormStyles.textAreaLabel}>
                      Description
                    </Typography>
                    <textarea
                      className="description"
                      type="text"
                      name="productDescription"
                      value={productDescription}
                      onChange={this.handleChange}
                      rows="6"
                      cols="70"
                      style={ProductFormStyles.textArea}
                    />
                  </div>
                </Grid>
                {/* rows 1-3 image */}
                <Grid
                  item
                  xs={5}
                  style={ProductFormStyles.uploadGrid}
                >
                  <ImageUpload
                    state={this.state}
                    productImage={productImage}
                    handleOnDrop={this.handleOnDrop}
                    handleOnCropChange={this.handleOnCropChange}
                    onSelectFile={this.onSelectFile}
                    handleClose={this.handleClose}
                    handleSave={this.handleSave}
                  />
                </Grid>
                {/* row 4 brand, manufacturer */}
                <Grid
                  item
                  xs={6}
                  style={ProductFormStyles.childGrid}
                >
                  <TextField
                    type="text"
                    label="Brand"
                    name="brand"
                    onChange={this.handleChange}
                    value={brand}
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={6}
                  style={ProductFormStyles.childGrid}
                >
                  <TextField
                    label="Manufacturer"
                    type="text"
                    fullWidth
                    name="manufacturer"
                    onChange={this.handleChange}
                    value={manufacturer}
                  />

                </Grid>
                {/* suppliers */}
                <Grid
                  item
                  xs={4}
                  style={ProductFormStyles.childGrid}
                >
                  <FormControl fullWidth>
                    <InputLabel htmlFor="preferred-supplier">Preferred Supplier</InputLabel>
                    <Select
                      className="preferredSupplierId"
                      onChange={this.handleChange}
                      value={preferredSupplier}
                      name="preferredSupplier"
                      inputProps={{
                        name: 'preferredSupplier',
                        id: 'preferred-supplier',
                      }}
                    >
                      <MenuItem value={preferredSupplier} disabled>{preferredSupplier}</MenuItem>
                      {business.suppliersSet.map(supplier => (
                        <MenuItem className="preferredSupplier" key={supplier.id} value={supplier.id}>
                          {supplier.suppliersmetaSet.map(suplier => suplier.displayName)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={4}
                  style={ProductFormStyles.childGrid}
                >
                  <FormControl fullWidth>
                    <InputLabel htmlFor="backup-supplier">Backup Supplier</InputLabel>
                    <Select
                      inputProps={{
                        name: 'backupSupplier',
                        id: 'backup-supplier',
                      }}
                      onChange={this.handleChange}
                      value={backupSupplier}
                      name="backupSupplier"
                    >
                      <MenuItem value={backupSupplier} disabled>{backupSupplier}</MenuItem>
                      {business.suppliersSet.map(supplier => (
                        <MenuItem className="backupSupplier" key={supplier.id} value={supplier.id}>
                          {supplier.suppliersmetaSet.map(suplier => suplier.displayName)}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* loyalty weight */}
                <Grid
                  item
                  xs={4}
                  style={ProductFormStyles.childGrid}
                >
                  {/* is prefilled depending on the category selected */}
                  <TextField
                    label="Loyalty Weight"
                    type="number"
                    placeholder="Please input a number"
                    fullWidth
                    name="loyaltyWeight"
                    onChange={this.handleChange}
                    value={loyaltyWeight}
                  />
                </Grid>
                {/* category */}
                <Grid
                  item
                  xs={4}
                  style={ProductFormStyles.childGrid}
                >
                  <FormControl fullWidth>
                    <InputLabel htmlFor="category">Category</InputLabel>
                    <Select
                      inputProps={{
                        name: 'productCategory',
                        id: 'product-category',
                      }}
                      onChange={this.handleChange}
                      value={productCategory}
                      name="productCategory"
                    >
                      <MenuItem value={productCategory} disabled>{productCategory}</MenuItem>
                      {productCategories.map(item => (
                        <MenuItem className="category" key={item.id} value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* dispensing size */}
                <Grid
                  item
                  xs={4}
                  style={ProductFormStyles.childGrid}
                >
                  <FormControl fullWidth>
                    <InputLabel htmlFor="dispensingSizeId">Dispensing Size</InputLabel>
                    <Select
                      inputProps={{
                        name: 'dispensingSizeVal',
                        id: 'dispensingSizeVal',
                      }}
                      value={dispensingSizeVal}
                      name="dispensingSizeVal"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={dispensingSizeVal} disabled>{dispensingSizeVal}</MenuItem>
                      {dispensingSize.map(unit => (
                        <MenuItem className="dispensingSize" key={unit.id} value={unit.id}>{unit.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* VAT Status */}
                <Grid
                  item
                  xs={4}
                  style={ProductFormStyles.childGrid}
                >
                  <FormControl fullWidth>
                    <InputLabel htmlFor="vat-status">VAT Status</InputLabel>
                    <Select
                      inputProps={{
                        name: 'vatStatus',
                        id: 'vat-status',
                      }}
                      value={vatStatus}
                      name="vatStatus"
                      onChange={this.handleChange}
                    >
                      <MenuItem value={vatStatus} disabled>{vatStatus}</MenuItem>
                      <MenuItem value>VAT</MenuItem>
                      <MenuItem value={false}>No VAT</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* tags */}
                <Grid
                  item
                  xs={12}
                  style={ProductFormStyles.childGrid}
                >
                  <Typography style={ProductFormStyles.textAreaLabel}>Tags</Typography>
                  <TagInput
                    handleAddition={this.handleAddition}
                    handleDelete={this.handleDelete}
                    tags={tags || taggs}
                  />
                </Grid>
                <Grid item xs={6} />
                <Grid
                  item
                  xs={6}
                  style={ProductFormStyles.buttonGrid}
                >
                  <ActionButtons
                    handleCloseEditDuplicates={handleCloseEditDuplicates}
                    handleEditProduct={this.handleEditProduct}
                  />
                </Grid>
              </Grid>
            </form>
          </div>
        </ClickAwayListener>
      </Dialog>
    );
  }
}

EditDuplicateSupplier.propTypes = {
  handleCloseEditDuplicates: PropTypes.func.isRequired,
  duplicateInformation: PropTypes.instanceOf(Object).isRequired,
  editProduct: PropTypes.func.isRequired,
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
};

const EDIT_PRODUCT = graphql(UPDATE_PRODUCT, { name: 'editProduct' });

export default withAuth(compose(EDIT_PRODUCT)(withRouter(EditDuplicateSupplier)));
