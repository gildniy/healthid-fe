import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import withAuth from '../withAuth';
import MigrateOptions from '../shared/migrateOptions';
import BackAction from '../shared/BackAction';
import verifyFile from '../../utils/products/verifyFile';
import AddCsvDialog from '../shared/addCsvDialog';
import notify from '../shared/Toaster';

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
};
export class MigrateCustomers extends Component {
  state = { ...initialState }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid7'
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
        this.setState({ file: files[0], fileLoaded: true, isSubmitFileFailed: false });
      }
    }
  }

  handleUploadFailed = async () => {
    this.setState({ fileLoaded: false, isSubmitFileFailed: true, serverResponse: '' });
  }

  handleUpload = async () => {
    this.setState({ loading: true });

    const { file, activeChoice, migratedFrom } = this.state;
    const { history } = this.props;
    const formdata = new FormData();

    formdata.append('file', file);

    const url = `${process.env.APP_LINK}`;
    const token = localStorage.getItem('rest_token');

    try {
      const res = await axios.post(`${url}csv/${activeChoice}_customers`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        }
      });
      const { success, noOfCustomersAdded } = res.data;
      notify(`${noOfCustomersAdded} customer(s) migrated from ${migratedFrom}`);

      this.setState({
        loading: false,
        serverResponse: success,
      }, () => history.push('/customers'));
    } catch (err) {
      const errData = err.response.data;
      const errMsg = errData.message ? errData.message : errData.error;
      this.setState({
        loading: false,
        isSubmitFileFailed: true,
        serverResponse: err.status === 500 ? 'Something went wrong' : errMsg,
      });
    }
  }

  handleCloseDialog = () => {
    this.setState({
      ...initialState
    });
  }

  handleOpenDialog = (name) => {
    this.migrateOptions(name);
    this.setState({
      openDialog: true,
      activeChoice: name
    });
  }

  migrateOptions = (name) => {
    if (name === 'retail_pro') {
      return this.setState({
        title: 'Upload Customer Data from Retail Pro',
        param: 'customers_retail_pro',
        migratedFrom: 'Retail Pro'
      });
    }
    return this.setState({
      title: 'Upload Customer Data from Quick Books',
      param: 'customers_quick_books',
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
          link="/customers"
        />
        <MigrateOptions
          state={this.state}
          handleOpenDialog={this.handleOpenDialog}
          toMigrate="customers"
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

MigrateCustomers.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    push: PropTypes.func
  })
};

MigrateCustomers.defaultProps = {
  history: PropTypes.shape({
    length: PropTypes.number,
    push: PropTypes.func
  })
};

export default withAuth(withRouter(MigrateCustomers));
