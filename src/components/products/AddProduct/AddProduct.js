import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { compose, graphql, Query } from 'react-apollo';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import ProductForm from './ProductForm';
import withAuth from '../../withAuth';
import { GET_SUPPLIERS_CATEGORIES } from '../../../queries/productsSuppliersCategoriesQuery';
import { FILTER_APPROVED_SUPPLIERS } from '../../../queries/getSuppliers';
import CREATE_PRODUCT from '../../../mutations/products/createProduct';
import ProposeEditHeader from '../Templates/ProposeEditHeader';
import notify from '../../shared/Toaster';
import validateProductName from '../../../utils/products/ProductNameValidation';
import verifyFile from '../../../utils/products/verifyFile';
import DataTableLoader from '../../dataTable/dataTableLoader';
import { proposeEditStyles } from '../../../assets/styles/products/products';

import { StateContext } from '../../../providers/stateProvider';

export class AddProduct extends Component {
  state = {
    suppliers: [],
    categories: [],
    dispensingSizes: [],
    isApproved: false,
    products: [],
    productName: '',
    productDescription: '',
    productImage: '',
    brand: '',
    manufacturer: '',
    preferredSupplier: '',
    preferredSupplierId: '',
    backupSupplier: '',
    backupSupplierId: '',
    searching: '',
    errorText: '',
    active: '',
    categoryId: '',
    dispensingSizeId: '',
    loyaltyWeight: '',
    vatStatus: false,
    tags: [],
    loading: false,
    imageFile: '',
    fileName: '',
    src: null,
    crop: {
      aspect: 1 / 1
    },
    open: false,
    globalUpc: null,
    reorderMax: 1,
    reorderPoint: 1
  };

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
  }

  handleProductName = (event) => {
    const { products } = this.state;
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const message = validateProductName(products, value);
    if (message !== '') {
      notify(message);
    }
  };

  handleChange = (event, client) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    client && value.length > 2
      && this.filterSuppliers(event, client);
  };

  filterSuppliers = (event, client) => {
    const { name, value } = event.target;
    this.setState({
      searching: true,
      active: name,
      errorText: '',
      anchorEl: event.target
    });
    client.query({
      query: FILTER_APPROVED_SUPPLIERS,
      variables: { isApproved: true, supplier: value }
    }).then(({ data: { filterSuppliers: { edges } } }) => {
      const suppliers = edges.map(edge => edge.node);
      this.setState({
        filteredSuppliers: suppliers,
        errorText: '',
        openPopper: true,
        searching: false
      });
    }).catch(() => {
      const err = 'Supplier matching search query does not exist!';
      this.setState({
        filteredSuppliers: [],
        errorText: err,
        openPopper: false,
        searching: false
      });
    });
  };

  handleCategoryChange = (event, productCategories) => {
    const { label, id } = event;
    this.setState({
      categoryName: label,
      categoryId: id
    });
    this.filterCategories(id, productCategories);
  };

  filterCategories = (value, productCategories) => {
    const { loyaltyWeight, isVatApplicable } = productCategories
      .find(category => category.id === value);
    const vatName = isVatApplicable ? 'VAT' : 'No VAT';
    this.setState({
      loyaltyWeight,
      vatName,
      vatStatus: !!isVatApplicable,
    });
  };

  handleDispensingSizeChange = (event) => {
    const { label, id } = event;
    this.setState({
      dispensingSizeName: label,
      dispensingSizeId: id
    });
  };

  handleVatChange = (event) => {
    const { label, id } = event;
    this.setState({
      vatName: label,
      vatStatus: id
    });
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

  handleProposeProduct = () => {
    const { addProduct } = this.props;

    const {
      productName,
      globalUpc,
      productDescription,
      productImage,
      brand,
      manufacturer,
      preferredSupplierId,
      backupSupplierId,
      categoryId,
      dispensingSizeId,
      loyaltyWeight,
      vatStatus,
      tags,
      reorderMax,
      reorderPoint
    } = this.state;

    this.setState({ loading: true });

    const tagsArray = tags.map(({ text }) => (text));

    addProduct({
      variables: {
        productCategoryId: categoryId,
        productName,
        dispensingSizeId,
        description: productDescription,
        brand,
        manufacturer,
        vatStatus,
        preferredSupplierId,
        backupSupplierId,
        loyaltyWeight,
        tags: tagsArray,
        image: productImage || 'none',
        globalUpc,
        reorderMax,
        reorderPoint
      }
    })
      .then((res) => {
        const { history } = this.props;
        const { productName: createdProduct } = res.data.createProduct.product;
        notify(`${createdProduct} has been added and sent for approval`);
        history.push('/products/proposed');
      })
      .catch((err) => {
        const { message } = err.graphQLErrors[0];
        notify(message);
      });
  };

  handleSendForApproval = () => {
    this.handleProposeProduct();
  };

  handleAddAnotherProduct = async () => {
    await this.handleProposeProduct();
    setTimeout(() => {
      this.setState({
        productName: '',
        productDescription: '',
        productImage: '',
        brand: '',
        manufacturer: '',
        preferredSupplierId: '',
        backupSupplierId: '',
        categoryId: '',
        dispensingSizeId: '',
        loyaltyWeight: 0,
        vatStatus: '',
        tags: [],
        loading: false,
        imageFile: '',
        globalUpc: null,
        reorderMax: 1,
        reorderPoint: 1,
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

  displaySelected = (active, name, id) => {
    if (active === 'preferredSupplier') {
      this.setState({
        [active]: name,
        preferredSupplierId: id,
        openPopper: false,
      });
    } else {
      this.setState({
        [active]: name,
        backupSupplierId: id,
        openPopper: false,
      });
    }
  }

  popperClickAway = () => {
    this.setState({
      openPopper: false,
    });
  }

  static contextType = StateContext;

  render() {
    const { classes } = this.props;

    const {
      productName,
      brand,
      manufacturer,
      productDescription,
      preferredSupplierId,
      backupSupplierId,
      categoryId,
      dispensingSizeId,
      globalUpc
    } = this.state;

    const disableButton = !productName || !brand || !manufacturer || !productDescription
    || !preferredSupplierId || !backupSupplierId || !categoryId
    || !dispensingSizeId;

    return (
      <div>
        <Query
          query={GET_SUPPLIERS_CATEGORIES}
          variables={{ businessId: localStorage.businessId || 1 }}
        >
          {({ loading, error, data }) => {
            if (loading) return <DataTableLoader />;
            if (error) return null;
            const { productCategories } = data;
            return (
              <div>
                <ProposeEditHeader
                  type="Products"
                  classes={classes}
                  previousPage="/products/approved"
                >
                  <Button
                    disabled={disableButton}
                    className={classes.closeBtn}
                    onClick={this.handleAddAnotherProduct}
                  >
                    ADD NEW
                  </Button>
                  <Button
                    disabled={disableButton}
                    className={disableButton ? `${classes.openBtn} ${classes.closeBtn}` : classes.openBtn}
                    onClick={this.handleSendForApproval}
                  >
                    SEND FOR APPROVAL
                  </Button>
                </ProposeEditHeader>
                <ProductForm
                  title="Add Individual Product"
                  state={this.state}
                  initialData={data}
                  handleProductName={this.handleProductName}
                  handleChange={this.handleChange}
                  handleAddition={this.handleAddition}
                  handleDelete={this.handleDelete}
                  onSelectFile={this.onSelectFile}
                  handleOnDrop={this.handleImageDrop}
                  handleOnCropChange={this.handleOnCropChange}
                  handleCategoryChange={e => this.handleCategoryChange(e, productCategories)}
                  handleDispensingSizeChange={this.handleDispensingSizeChange}
                  handleVatChange={this.handleVatChange}
                  handleClose={this.handleClose}
                  handleSave={this.handleSave}
                  displaySelected={this.displaySelected}
                  popperClickAway={this.popperClickAway}
                />
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

AddProduct.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
  addProduct: PropTypes.func.isRequired
};

AddProduct.defaultProps = {
  history: {}
};

const ADD_PRODUCT = graphql(CREATE_PRODUCT, { name: 'addProduct' });

export default withAuth(
  compose(ADD_PRODUCT)(
    withRouter(
      withStyles(proposeEditStyles)(AddProduct)
    )
  )
);
