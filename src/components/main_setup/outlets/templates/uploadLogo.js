import React, { Fragment, useState } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import AddCsvDialog from '../../../shared/addCsvDialog';

const initialState = {
  openDialog: false,
  activeChoice: '',
  title: 'Upload Receipt Logo',
  param: '',
  file: null,
  loading: false,
  serverResponse: '',
  fileLoaded: false,
  isSubmitFileFailed: false,
};


const UploadLogo = () => {
  const [state, setState] = useState({ ...initialState });

  const handleUploadFailed = async () => {
    setState({
      ...state, fileLoaded: false, isSubmitFileFailed: true, serverResponse: ''
    });
  };


  const handleUpload = async () => {
    setState({ ...state, loading: true });
  };

  const handleCloseDialog = () => {
    setState({
      ...initialState
    });
  };

  const handleOpenDialog = (name) => {
    setState({
      ...state,
      openDialog: true,
      activeChoice: name
    });
  };


  return (
    <Fragment>
      <AddCsvDialog
        state={state}
        handleOpenDialog={handleOpenDialog}
        handleCloseDialog={handleCloseDialog}
        handleUpload={handleUpload}
        handleUploadFailed={handleUploadFailed}
      />
      <Tooltip title="Upload Logo">
        <IconButton onClick={handleOpenDialog}>
          <KeyboardArrowRight />
        </IconButton>
      </Tooltip>

    </Fragment>
  );
};

export default UploadLogo;
