import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import withAuth from '../withAuth';
import MigrateOptions from '../shared/migrateOptions';
import BackAction from '../shared/BackAction';
import verifyFile from '../../utils/products/verifyFile';
import notify from '../shared/Toaster';
import AddCsvDialog from '../shared/addCsvDialog';

import { StateContext } from '../../providers/stateProvider';

const initialState = {
  openDialog: false,
  activeChoice: '',
  title: '',
  param: '',
  file: null,
  loading: false,
  serverResponse: '',
  fileLoaded: false,
  isSubmitFileFailed: false,
  migatedFrom: ''
};
export class MigrateSuppliers extends Component {
  state = {
    ...initialState
  };

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }

  onDrop = async (acceptedFiles) => {
    this.setState({ file: acceptedFiles[0] });
    await this.handleUpload();
  };

  handleFile = (e) => {
    const { files } = e.target;
    const maxFileSize = 10000000; // bytes
    const acceptedFileType = 'text/comma-separated-values, text/csv, application/csv, application/excel, application/vnd.ms-excel, application/vnd.msexcel, text/anytext';
    if (files && files.length > 0) {
      const verified = verifyFile(files, maxFileSize, acceptedFileType);
      if (verified) {
        this.setState({ file: files[0], fileLoaded: true, isSubmitFileFailed: false });
      }
    }
  };

  handleUploadFailed = async () => {
    this.setState({ fileLoaded: false, isSubmitFileFailed: true, serverResponse: 'server says this' });
  };

  handleDownloadTemplate = async () => {
    const csvUrl = `${process.env.APP_LINK}`;
    const token = localStorage.getItem('rest_token');
    /* istanbul ignore next */
    axios.get(`${csvUrl}sample_csv_file/batch_info`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
        on_duplication: 'use the same'
      },
    })
      .then((res) => {
        const filename = 'batch_info_template.csv';
        const blob = new Blob([res.data], { type: 'text/csv' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        window.location.replace(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        notify('There was a problem downloading this file.', err);
      });
  };

  handleUpload = async () => {
    this.setState({ loading: true });

    const { file, activeChoice, migratedFrom } = this.state;
    const { history } = this.props;
    const formdata = new FormData();

    formdata.append('file', file);
    formdata.append('on_duplication', 'use the same');

    const url = `${process.env.APP_LINK}`;
    const token = localStorage.getItem('rest_token');

    try {
      const res = await axios.post(`${url}csv/${activeChoice}_suppliers`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        }
      });
      const { success, noOfSuppliersAdded } = res.data;
      notify(`${noOfSuppliersAdded} supplier(s) migrated from ${migratedFrom}`);

      this.setState({
        loading: false,
        serverResponse: success,
      }, () => history.push('/suppliers/approved'));
    } catch (err) {
      const errData = err.response.data;
      const errMsg = errData.message ? errData.message : errData.error;
      notify(errData || errMsg);
      this.setState({
        loading: false,
        isSubmitFileFailed: true,
        serverResponse: err.status === 500 ? 'Something went wrong' : errMsg,
      });
    }
  };

  handleCloseDialog = () => {
    this.setState({
      ...initialState
    });
  };

  handleOpenDialog = (name) => {
    this.migrateOptions(name);
    this.setState({
      openDialog: true,
      activeChoice: name
    });
  };

  migrateOptions = (name) => {
    if (name === 'retail_pro') {
      return this.setState({
        title: 'Upload Suppliers Data from Retail Pro',
        param: 'suppliers_retail_pro',
        migratedFrom: 'Retail Pro'
      });
    }
    return this.setState({
      title: 'Upload Suppliers Data from Quick Books',
      param: 'suppliers_quick_books',
      migratedFrom: 'Quick Books'
    });
  };

  static contextType = StateContext;

  render() {
    const { fileLoaded, isSubmitFileFailed } = this.state;
    return (
      <Fragment>
        <BackAction
          header="Back"
          link="/suppliers"
        />
        <MigrateOptions
          state={this.state}
          handleOpenDialog={this.handleOpenDialog}
          toMigrate="suppliers"
        />
        <AddCsvDialog
          state={this.state}
          handleOpenDialog={this.handleOpenDialog}
          handleCloseDialog={this.handleCloseDialog}
          fileLoaded={fileLoaded}
          onDrop={this.onDrop}
          handleFile={this.handleFile}
          handleUpload={this.handleUpload}
          isSubmitFileFailed={isSubmitFileFailed}
          handleUploadFailed={this.handleUploadFailed}
        />
      </Fragment>
    );
  }
}

MigrateSuppliers.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    push: PropTypes.func
  })
};

MigrateSuppliers.defaultProps = {
  history: PropTypes.shape({
    length: PropTypes.number,
    push: PropTypes.func
  })
};

export default withAuth(withRouter(MigrateSuppliers));
