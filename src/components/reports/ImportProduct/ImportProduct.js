import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import withAuth from '../../withAuth';
import ImportProductForm from './ImportProductForm';
import BackAction from '../BackAction';
import verifyFile from '../../../utils/products/verifyFile';
import notify from '../../shared/Toaster';
import GET_INITIAL_DATA from '../../../queries/productsSuppliersCategoriesQuery';

import { StateContext } from '../../../providers/stateProvider';

export class ImportProduct extends Component {
  state = {
    file: null,
    loading: false,
    openProductDetailsDialog: false,
    openDuplicateEditDialog: false,
    serverResponse: [],
    serverDuplicateResponse: [],
    serverDuplicateResponseMsg: '',
    onDuplicationActions: {},
    duplicateInformation: null,
    color: ''
  };

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
  }

  onDrop = async (acceptedFiles) => {
    this.setState({ file: acceptedFiles[0] });
    await this.handleUpload();
  }

  handleFile = (e) => {
    const { files } = e.target;
    const maxFileSize = 10000000; // bytes
    const acceptedFileType = 'text/csv';
    if (files && files.length > 0) {
      const verified = verifyFile(files, maxFileSize, acceptedFileType);
      if (verified) {
        this.setState({ file: files[0] });
      }
    }
  }

  handleDownloadTemplate = () => {
    const csvUrl = `${process.env.APP_LINK}`;

    const token = localStorage.getItem('rest_token');

    axios.get(`${csvUrl}sample_csv_file/products`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        const filename = 'product_template_csv';
        const blob = new Blob([res.data], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        notify('There was a problem downloading this file.', err);
      });
  }

  handleUpload = () => {
    this.setState({ loading: true });

    const { file, onDuplicationActions } = this.state;
    const { history } = this.props;
    const formdata = new FormData();

    formdata.append('file', file);
    formdata.append('on_duplication', JSON.stringify(onDuplicationActions));

    const url = `${process.env.APP_LINK}`;
    const token = localStorage.getItem('rest_token');

    axios.post(`${url}csv/products`, formdata, {
      headers: {
        Authorization: `Token ${token}`,
      }
    })
      .then((res) => {
        const { noOfProductsAdded } = res.data;
        this.setState({
          loading: false,
          serverResponse: `${noOfProductsAdded} products have been successfully uploaded for approval`,
        });
        setTimeout(() => history.push('/products'), 1200);
      })
      .catch((err) => {
        this.setState({
          loading: false,
          serverResponse: err.response.data.error,
          serverDuplicateResponse: err.response.data.duplicatedProducts,
          serverDuplicateResponseMsg: err.response.data.message,
        });
      });
  }

  handleViewProductDuplicates = () => {
    this.setState({
      openProductDetailsDialog: true,
    });
  }

  handleCloseProductDuplicates = () => {
    this.setState({
      openProductDetailsDialog: false,
    });
  }

  handleViewEditDuplicates = (duplicate) => {
    this.setState({
      openDuplicateEditDialog: true,
      openProductDetailsDialog: false,
      duplicateInformation: duplicate
    });
  }

  handleCloseEditDuplicates = () => {
    this.setState({
      openDuplicateEditDialog: false,
      openProductDetailsDialog: true
    });
  }

  onProductDuplication = (product, action) => {
    const { onDuplicationActions } = this.state;

    this.setState({
      onDuplicationActions: {
        ...onDuplicationActions,
        [product]: action
      },
    });
  };

  static contextType = StateContext;

  render() {
    const { openProductDetailsDialog, duplicateInformation } = this.state;

    return (
      <Fragment>
        <Query query={GET_INITIAL_DATA} variables={{ businessId: localStorage.businessId || 1 }}>
          {({ error, data }) => (error || null) || (
            <>
              <BackAction
                header="Back"
                link="/products"
              />
              <ImportProductForm
                state={this.state}
                onDrop={this.onDrop}
                initialData={data}
                handleFile={this.handleFile}
                handleUpload={this.handleUpload}
                handleDownloadTemplate={this.handleDownloadTemplate}
                handleViewProductDuplicates={this.handleViewProductDuplicates}
                handleCloseProductDuplicates={this.handleCloseProductDuplicates}
                handleViewEditDuplicates={this.handleViewEditDuplicates}
                handleCloseEditDuplicates={this.handleCloseEditDuplicates}
                open={openProductDetailsDialog}
                onProductDuplication={this.onProductDuplication}
                duplicateInformation={duplicateInformation && duplicateInformation}
              />
            </>
          )
          }
        </Query>
      </Fragment>
    );
  }
}

ImportProduct.propTypes = {
  history: PropTypes.objectOf(PropTypes.object),
};

ImportProduct.defaultProps = {
  history: {}
};

export default withAuth(withRouter(ImportProduct));
