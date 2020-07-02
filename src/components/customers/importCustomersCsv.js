import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import withAuth from '../withAuth';
import CustomersCsvForm from './customersCsvForm';
import BackAction from '../shared/BackAction';
import verifyFile from '../../utils/products/verifyFile';
import notify from '../shared/Toaster';

import { StateContext } from '../../providers/stateProvider';

export class CustomersCSV extends Component {
  state = {
    file: null,
    loading: false,
    serverResponse: '',
    fileLoaded: false,
    isSubmitFileFailed: false,
  };

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

  handleDownloadTemplate = async () => {
    const csvUrl = `${process.env.APP_LINK}`;
    const token = localStorage.getItem('rest_token');
    /* istanbul ignore next */
    axios.get(`${csvUrl}sample_csv_file/customers`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
      .then((res) => {
        const filename = 'customers_template.csv';
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

  handleUpload = async () => {
    this.setState({ loading: true });

    const { file } = this.state;
    const { history } = this.props;
    const formdata = new FormData();
    formdata.append('file', file);

    const url = `${process.env.APP_LINK}`;
    const token = localStorage.getItem('rest_token');

    try {
      const res = await axios.post(`${url}csv/customers`, formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,
        }
      });
      const { success } = res.data;
      this.setState({
        loading: false,
        serverResponse: success,
      });
      setTimeout(() => history.push('/customers'), 1000);
    } catch (err) {
      this.setState({
        loading: false,
        isSubmitFileFailed: true,
        serverResponse: err.status === 500 ? 'Something went wrong' : err.response.data.error,
      });
    }
  }

  static contextType = StateContext;

  render() {
    const { fileLoaded, isSubmitFileFailed } = this.state;
    return (
      <Fragment>
        <BackAction
          header="Back"
          link="/customers"
        />
        <CustomersCsvForm
          state={this.state}
          fileLoaded={fileLoaded}
          isSubmitFileFailed={isSubmitFileFailed}
          onDrop={this.onDrop}
          handleFile={this.handleFile}
          handleUpload={this.handleUpload}
          handleUploadFailed={this.handleUploadFailed}
          handleDownloadTemplate={this.handleDownloadTemplate}
        />
      </Fragment>
    );
  }
}

CustomersCSV.propTypes = {
  history: PropTypes.shape({
    length: PropTypes.number,
    push: PropTypes.func
  })
};

CustomersCSV.defaultProps = {
  history: PropTypes.shape({
    length: PropTypes.number,
    push: PropTypes.func
  })
};

export default withAuth(withRouter(CustomersCSV));
