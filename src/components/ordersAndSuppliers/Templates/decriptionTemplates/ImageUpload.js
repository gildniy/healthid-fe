/* eslint-disable react/prefer-stateless-function */
/* istanbul ignore file */
/* eslint-disable prefer-const */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import ResizeDialog from '../../../profile/resizeDialogBox';
import { ImageUploadStyles } from '../../../../assets/styles/suppliers/addSupplierStyles';
import SupplierImagePlaceholder from '../../../../assets/images/uploadIcon.png';

const ImageUpload = (props) => {
  const {
    state,
    handleOnCropChange,
    handleClose,
    handleSave,
    onSelectFile,
    dragImage
  } = props;
  return (
    <div style={ImageUploadStyles.main}>
      {state.src ? (
        <ResizeDialog
          state={state}
          onCropChange={handleOnCropChange}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      ) : (
        <Grid container>
          <Dropzone
            onDrop={acceptedFiles => dragImage(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <Grid item style={ImageUploadStyles.dragContainer}>
                <input name="imageInput" {...getInputProps()} onChange={onSelectFile} />
                <Grid
                  {...getRootProps()}
                  item
                  style={ImageUploadStyles.dragItem}
                >
                  {state.logo ? (
                    <img src={state.logo} className="logo" alt="brand logo" style={ImageUploadStyles.placeholder} />
                  ) : (
                    <Fragment {...getRootProps()}>
                      <img
                        src={SupplierImagePlaceholder}
                        className="imgPlaceholder"
                        alt="brand logo"
                        style={ImageUploadStyles.img}
                      />
                      <Typography style={ImageUploadStyles.label}>
                        Drag and drop png / jpg
                        <br />
                        or
                      </Typography>
                    </Fragment>
                  )}
                </Grid>
                <Grid item style={ImageUploadStyles.spacing}>
                  <Button
                    {...getRootProps()}
                    name="DialogUploadButton"
                    variant="contained"
                    style={ImageUploadStyles.chooseButton}
                  >
                    {state.logo ? 'Change File' : 'Choose Image'}
                  </Button>
                </Grid>
              </Grid>
            )}
          </Dropzone>
        </Grid>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOnCropChange: PropTypes.func.isRequired,
  onSelectFile: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
  dragImage: PropTypes.func.isRequired
};

export default ImageUpload;
