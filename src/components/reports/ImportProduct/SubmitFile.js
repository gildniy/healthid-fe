import React from 'react';
import PropTypes from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';
import '../../../assets/styles/shared/submitFile/SubmitFile.scss';
import SubmitFileStyles from '../../../assets/styles/shared/submitFile/submitFile';


const SubmitFile = (props) => {
  const {
    file, handleUpload, loading, serverResponse, isSubmitFileFailed, serverDuplicateResponseMsg,
    handleUploadFailed, serverDuplicateResponse, handleViewProductDuplicates, duplications
  } = props;
  const serverDuplicatedResponse = (serverDuplicateResponse || []).map(
    duplicate => duplicate.message
  );
  const handleToggleButton = serverDuplicatedResponse.length > 0 ? 'Resolve' : 'Submit';
  const handleDuplicateUpload = handleToggleButton === 'Resolve' ? handleViewProductDuplicates : handleUpload;

  return (
    <div className="container">
      <div className="file-item">
        <h3 className="file-text">
          <span className="file-name">
            &apos;
            {file.name}
            &apos;
          </span>
            &nbsp;is ready to upload
        </h3>
        {serverResponse || serverDuplicateResponseMsg ? (
          <span className="file-span">
            {serverResponse || `${duplications.length} products were not added because they already exist`}
          </span>
        ) : ''}
        <div className="file-submit">
          {loading ? (<CircularProgress color="secondary" className="loader" />)
            : (
              <Button
                className="file-submit-btn"
                color="secondary"
                variant="contained"
                style={SubmitFileStyles.submitButton}
                onClick={isSubmitFileFailed ? handleUploadFailed : handleDuplicateUpload}
              >
                {
                  isSubmitFileFailed ? 'Choose new file' : handleToggleButton
                }
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};

SubmitFile.propTypes = {
  file: PropTypes.instanceOf(Object).isRequired,
  handleUpload: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  serverResponse: PropTypes.string.isRequired,
  serverDuplicateResponse: PropTypes.string.isRequired,
  serverDuplicateResponseMsg: PropTypes.string.isRequired,
  handleViewProductDuplicates: PropTypes.func.isRequired,
  duplications: PropTypes.func.isRequired,
  isSubmitFileFailed: PropTypes.bool.isRequired,
  handleUploadFailed: PropTypes.func.isRequired,
};

export default SubmitFile;
