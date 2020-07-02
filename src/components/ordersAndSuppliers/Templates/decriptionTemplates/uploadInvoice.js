import {
  Button,
  DialogContent, DialogTitle, Divider, Grid, Typography
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { compose, graphql } from 'react-apollo';
import ImageUpload from './ImageUpload';
import notify from '../../../shared/Toaster';
import verifyFile from '../../../../utils/products/verifyFile';
import UPLOAD_IMAGE from '../../../../mutations/uploadImage';

const UploadInvoice = (props) => {
  const {
    classes, handleCloseModal, uploadImage, supplierOrderFormId
  } = props;
  const [logo, setLogo] = React.useState({ logo: '' });
  const [DragOverImage, setDragOverImage] = React.useState({
    fileName: '', imageFile: '', src: '', open: false
  });
  const [crop, setCrop] = React.useState('');

  const handleDragOverImage = (acceptedFiles) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const binaryStr = reader.result;
      setDragOverImage({ imageFile: acceptedFiles, src: binaryStr, open: true });
    }, false);

    acceptedFiles.forEach(file => reader.readAsDataURL(file));
  };

  const handleImageDrop = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.UPLOAD_PRESET);
    formData.append('api_key', `${process.env.API_KEY}`);
    formData.append('timestamp', (Date.now() / 1000) || 0);
    return axios({
      url: process.env.CLOUDINARY_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: formData
    }).then((response) => {
      const { data: url } = response;
      const fileURL = url.secure_url;
      setLogo({ logo: fileURL });
    }).catch((err) => {
      notify('There was an error uploading the image', err);
    });
  };
  const getCroppedImg = (imageFile, pixelCrop, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');

    const image = new Image();
    const promise = new Promise((resolve) => {
      image.onload = (() => {
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
      });
      image.src = imageFile;
    }).then(() => new Promise((resolve) => {
      canvas.toBlob((blob) => {
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    }));
    return promise;
  };
  const handleSave = async () => {
    const { src, fileName } = DragOverImage;
    // eslint-disable-next-line no-shadow
    getCroppedImg(src, crop, fileName).then((data) => {
      handleImageDrop(data);
      setDragOverImage({ src: '', open: false });
    });
    try {
      await uploadImage({
        variables: {
          invoiceFile: logo.logo,
          supplierOrderId: supplierOrderFormId
        }
      });
      notify('image added successfully');
      handleCloseModal();
    } catch (e) {
      notify(e.message.slice(15));
    }
  };
  const handleClose = () => {
    setDragOverImage({
      ...DragOverImage,
      src: '',
      open: false
    });
    // eslint-disable-next-line no-console
    handleImageDrop(DragOverImage.src).then(r => console.log(r));
  };
  const onSelectFile = (e) => {
    const { files } = e.target;
    const imageFile = e.target.files[0];
    const maxFileSize = 1000000; // bytes
    const acceptedFileType = 'image/jpg, image/jpeg, image/JPEG, image/png, image/PNG';

    function imageReader() {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setDragOverImage({
          ...DragOverImage,
          fileName: files[0].name,
          imageFile,
          src: reader.result,
          open: true
        });
      }, false);
      return reader;
    }

    if (files && files.length > 0) {
      const verified = verifyFile(files, maxFileSize, acceptedFileType);
      if (verified) {
        const reader = imageReader();
        reader.readAsDataURL(imageFile);
      }
    }
  };
  const handleOnCropChange = (input) => {
    setCrop(input);
  };
  return (

    <React.Fragment>

      <DialogTitle disableTypography id="csv-title" className="dialog-title">
        <Typography variant="subtitle2">
          Upload Invoice
        </Typography>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container>
          <Grid item container>
            <ImageUpload
              state={{
                open: DragOverImage.open,
                src: DragOverImage.src,
                logo: logo.logo
              }}
              logo={logo}
              handleOnDrop={handleImageDrop}
              handleOnCropChange={handleOnCropChange}
              onSelectFile={onSelectFile}
              handleClose={handleClose}
              handleSave={handleSave}
              dragImage={handleDragOverImage}
            />
          </Grid>
          <Grid className={classes.buttonModalGrid} container direction="row" justify="center" alignItems="center">
            <Grid item xs={2} style={{ marginRight: '5rem' }}>
              <Button variant="outlined" onClick={handleCloseModal} className={classes.closeButtons}>
                Close
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" className={classes.printButton} color="black" onClick={handleSave} disabled={!logo.logo}>
                Save Invoice
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>


    </React.Fragment>
  );
};

UploadInvoice.propTypes = {
  classes: PropTypes.shape({
    containerGrid: PropTypes.string,
    orderNameStyles: PropTypes.string,
    paperTitle: PropTypes.string,
    titleLine: PropTypes.string,
    closeButtons: PropTypes.string,
    printButton: PropTypes.string,
    buttonModalGrid: PropTypes.string,
  }).isRequired,
  supplierOrderFormId: PropTypes.string.isRequired,
  uploadImage: PropTypes.func.isRequired,
  handleCloseModal: PropTypes.func.isRequired
};
const uploadImage = graphql(UPLOAD_IMAGE, { name: 'uploadImage' });
export default compose(uploadImage)(UploadInvoice);
