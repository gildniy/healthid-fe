import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogContent, DialogTitle, Slide, Grid, CircularProgress,
  Button, Divider, Typography
} from '@material-ui/core';
import Dropzone from 'react-dropzone';
import UploadImage from '../../assets/images/uploadIcon.png';
import '../../assets/styles/shared/uploadFile/addCsvDialog.scss';


const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const AddCsvDialog = ({
  state: {
    openDialog, title, param, file, loading, serverResponse
  },
  handleCloseDialog,
  fileLoaded,
  onDrop,
  handleFile,
  handleUpload,
  isSubmitFileFailed,
  handleUploadFailed
}) => (
  <Dialog
    open={openDialog}
    onClose={handleCloseDialog}
    maxWidth="sm"
    fullWidth
    TransitionComponent={Transition}
    aria-labelledby="customer-csv-dialog"
    id="customer-csv-dialog"
  >
    <DialogTitle disableTypography id="csv-title" className="dialog-title">
      <Typography variant="subtitle2">
        {title}
      </Typography>
    </DialogTitle>
    <Divider />
    <DialogContent className="dialog-content">
      <Grid container>
        {!fileLoaded ? (
          <Grid item container>
            <Dropzone
              accept="text/csv"
              multiple={false}
              minSize={0}
              maxSize={5242880}
              onDrop={onDrop}
            >
              {({
                getRootProps, getInputProps, isDragActive, isDragReject
              }) => (
                <Grid
                  item
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <input {...getInputProps()} onChange={handleFile} />
                  <img {...getRootProps()} src={UploadImage} alt="dropZone" style={{ maxWidth: '10%' }} />
                  {!isDragActive && <h3 className="text">Drag and drop .csv</h3>}
                  {isDragReject && <h3 className="text">File type not accepted</h3>}
                  <span className="text_or">or</span>
                  <Button
                    {...getRootProps()}
                    className="file-button"
                    disabled={!param}
                  >
                    Choose file
                  </Button>
                </Grid>
              )}
            </Dropzone>
          </Grid>
        ) : (
          <Grid
            item
            container
            direction="column"
            justify="center"
            alignItems="center"
            className="file-item"
          >
            <h3 className="file-text">
              <span className="file-name">
                      &apos;
                {file.name}
                      &apos;
              </span>
                    &nbsp;is ready to upload
            </h3>
            {serverResponse && (
              <span className="file-span">
                {serverResponse}
              </span>
            )}
            <Grid item className="file-submit">
              {loading ? (
                <CircularProgress color="secondary" className="loader" />
              ) : (
                <Button
                  className="submit-button"
                  color="primary"
                  variant="contained"
                  onClick={isSubmitFileFailed ? handleUploadFailed : handleUpload}
                >
                  {isSubmitFileFailed ? 'Choose new file' : 'Submit'}
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </Grid>
    </DialogContent>
  </Dialog>
);

AddCsvDialog.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  fileLoaded: PropTypes.bool.isRequired,
  handleCloseDialog: PropTypes.func,
  onDrop: PropTypes.func,
  handleFile: PropTypes.func,
  handleUpload: PropTypes.func,
  serverResponse: PropTypes.func,
  isSubmitFileFailed: PropTypes.bool.isRequired,
  handleUploadFailed: PropTypes.func.isRequired,
};

AddCsvDialog.defaultProps = {
  handleCloseDialog: () => {},
  onDrop: () => {},
  handleFile: () => {},
  handleUpload: () => {},
  serverResponse: () => {}
};

export default AddCsvDialog;
