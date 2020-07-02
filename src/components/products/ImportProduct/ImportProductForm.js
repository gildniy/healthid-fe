import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Button
} from '@material-ui/core';
import UploadFileComponent from '../../shared/UploadFileComponent';
import { ImportProductStyles } from '../../../assets/styles/products/ImportProductStyles';
import SubmitFile from './SubmitFile';
import FieldsTable from './FieldsTable';
import Separator from '../../shared/Separator';
import DisplayProductDuplicates from './displayProductDuplicates';
import EditDuplicateSupplier from './editProductDuplicates';


const ImportProductForm = (props) => {
  const {
    state: {
      file,
      loading,
      openProductDetailsDialog,
      openDuplicateEditDialog,
      serverResponse,
      serverDuplicateResponse,
      serverDuplicateResponseMsg
    },
    onDrop,
    handleFile,
    handleUpload,
    handleDownloadTemplate,
    handleCloseProductDuplicates,
    handleViewProductDuplicates,
    handleCloseEditDuplicates,
    handleViewEditDuplicates,
    duplicateInformation,
    onProductDuplication,
    initialData
  } = props;

  const disableDownload = !!file;

  const ButtonStyle = file ? ImportProductStyles.disabledBtn : ImportProductStyles.templateBtn;
  return (
    <Fragment>
      <Paper
        elevation={2}
        style={ImportProductStyles.paper}
      >
        <Grid
          container
          spacing={3}
          style={ImportProductStyles.importContainer}
        >
          <Grid
            item
            xs={12}
            style={ImportProductStyles.textSection}
          >
            <div>
              Import Product CSV
            </div>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <hr style={ImportProductStyles.horizontalLine} />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <div style={ImportProductStyles.templateDiv}>
              Download sample template to import products
            </div>
            <div style={ImportProductStyles.templateDivBtn}>
              <Button
                style={ButtonStyle}
                disabled={disableDownload}
                onClick={handleDownloadTemplate}
              >
                DOWNLOAD SAMPLE TEMPLATE
              </Button>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Separator />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <FieldsTable />
          </Grid>
        </Grid>
      </Paper>
      {!file ? (
        <UploadFileComponent
          onDrop={onDrop}
          handleFile={handleFile}
        />
      ) : (
        <SubmitFile
          file={file}
          loading={loading}
          openProductDetailsDialog={openProductDetailsDialog}
          openDuplicateEditDialog={openDuplicateEditDialog}
          handleUpload={handleUpload}
          handleViewProductDuplicates={handleViewProductDuplicates}
          handleCloseProductDuplicates={handleCloseProductDuplicates}
          handleCloseEditDuplicates={handleCloseEditDuplicates}
          handleViewEditDuplicates={handleViewEditDuplicates}
          serverResponse={serverResponse}
          duplications={serverDuplicateResponse}
          serverDuplicateResponse={serverDuplicateResponse}
          serverDuplicateResponseMsg={serverDuplicateResponseMsg}
        />
      )
      }
      {openProductDetailsDialog
      && (
        <DisplayProductDuplicates
          handleUpload={handleUpload}
          handleViewProductDuplicates={handleViewProductDuplicates}
          handleCloseProductDuplicates={handleCloseProductDuplicates}
          handleCloseEditDuplicates={handleCloseEditDuplicates}
          handleViewEditDuplicates={handleViewEditDuplicates}
          serverResponse={serverResponse}
          serverDuplicateResponse={serverDuplicateResponse}
          serverDuplicateResponseMsg={serverDuplicateResponseMsg}
          duplications={serverDuplicateResponse}
          onProductDuplication={onProductDuplication}
        />
      )
      }
      {openDuplicateEditDialog && duplicateInformation
      && (
        <EditDuplicateSupplier
          handleCloseEditDuplicates={handleCloseEditDuplicates}
          duplications={serverDuplicateResponse}
          duplicateInformation={duplicateInformation}
          initialData={initialData}
        />
      )
      }
    </Fragment>
  );
};

ImportProductForm.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  onDrop: PropTypes.func,
  handleFile: PropTypes.func,
  handleUpload: PropTypes.func,
  handleDownloadTemplate: PropTypes.func,
  handleViewProductDuplicates: PropTypes.func,
  handleCloseProductDuplicates: PropTypes.func,
  handleViewEditDuplicates: PropTypes.func,
  handleCloseEditDuplicates: PropTypes.func,
  onProductDuplication: PropTypes.func,
  duplicateInformation: PropTypes.func,
  initialData: PropTypes.func
};

ImportProductForm.defaultProps = {
  onDrop: () => {},
  handleFile: () => {},
  handleUpload: () => {},
  handleDownloadTemplate: () => {},
  handleViewProductDuplicates: () => {},
  handleCloseProductDuplicates: () => {},
  handleViewEditDuplicates: () => {},
  handleCloseEditDuplicates: () => {},
  onProductDuplication: () => {},
  duplicateInformation: () => {},
  initialData: () => {}
};


export default ImportProductForm;
