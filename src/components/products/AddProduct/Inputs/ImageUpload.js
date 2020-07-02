import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Dropzone from 'react-dropzone';
import ResizeDialog from '../../../profile/resizeDialogBox';
import { ImageUploadStyles } from '../../../../assets/styles/products/addProductStyles';
import ProductImagePlaceholder from '../../../../assets/images/productImage.png';

const ImageUpload = (props) => {
  const {
    state,
    profileImage,
    handleOnDrop,
    handleOnCropChange,
    handleClose,
    handleSave,
    onSelectFile
  } = props;

  const displayImage = () => {
    if (state.productImage) {
      if (state.productImage !== 'none' && state.productImage !== 'null') {
        return state.productImage;
      }
      return ProductImagePlaceholder;
    }
    return profileImage;
  };

  return (
    <div style={ImageUploadStyles.container}>
      {state.src ? (
        <ResizeDialog
          state={state}
          onCropChange={handleOnCropChange}
          handleClose={handleClose}
          handleSave={handleSave}
        />
      ) : (
        <div>
          <div style={ImageUploadStyles.uploadDiv}>
            {state.productImage || profileImage ? (
              <img
                src={displayImage()}
                className="product-image"
                alt="product"
                style={ImageUploadStyles.uploadedImg}
              />
            ) : (
              <img
                src={ProductImagePlaceholder}
                className="imgPlaceholder"
                alt="product"
                style={ImageUploadStyles.uploadedImg}
              />
            )}
            <p style={ImageUploadStyles.label}>Upload png / jpg</p>
            <Dropzone
              onDrop={handleOnDrop}
              accept="image/jpg, image/jpeg, image/JPEG, image/png, image/PNG"
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => (
                <div>
                  <input {...getInputProps()} onChange={onSelectFile} />
                  <Button {...getRootProps()} variant="contained" style={ImageUploadStyles.button}>
                  Choose image
                  </Button>
                </div>
              )}
            </Dropzone>
          </div>
        </div>
      )}
    </div>
  );
};

ImageUpload.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  profileImage: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleOnCropChange: PropTypes.func.isRequired,
  handleOnDrop: PropTypes.func,
  onSelectFile: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired
};

ImageUpload.defaultProps = {
  handleOnDrop: () => {}
};

export default ImageUpload;
