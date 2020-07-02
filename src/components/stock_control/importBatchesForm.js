import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Button, Typography, Divider
} from '@material-ui/core';
import UploadFileComponent from '../shared/UploadFileComponent';
import { batchImportStyles } from '../../assets/styles/stock/batchImportStyles';
import SubmitFile from '../shared/SubmitFileComponent';
import FieldsTable from './FieldsTable';
import Separator from '../shared/Separator';

const styles = batchImportStyles;

const ImportBatchesForm = (props) => {
  const {
    state: {
      file, loading, serverResponse
    },
    onDrop,
    handleFile,
    handleUpload,
    handleDownloadTemplate,
    fileLoaded,
    isSubmitFileFailed,
    handleUploadFailed
  } = props;

  const disableDownload = !!file;

  const ButtonStyle = file ? styles.disabledBtn : styles.tempBtn;

  return (
    <Fragment>
      <Paper elevation={2} style={styles.paper}>
        <Grid item container xs={12} justify="center" style={styles.headerWrapper}>
          <Typography variant="h6">Import Product Batch CSV</Typography>
        </Grid>
        <Divider light />
        <Grid container style={styles.importContainer}>
          <Grid
            item
            container
            xs={12}
            alignItems="center"
            direction="column"
            style={styles.tempTitle}
          >
            <Typography variant="subtitle1" style={styles.tempTypo}>
              Download sample template to import product batches
            </Typography>
            <Button
              style={ButtonStyle}
              disabled={disableDownload}
              onClick={handleDownloadTemplate}
            >
              DOWNLOAD SAMPLE TEMPLATE
            </Button>
          </Grid>
          <Grid item xs={12}><Separator /></Grid>
          <Grid item xs={12}><FieldsTable /></Grid>
        </Grid>
      </Paper>
      {!fileLoaded ? (
        <UploadFileComponent
          onDrop={onDrop}
          handleFile={handleFile}
        />
      ) : (
        <SubmitFile
          file={file}
          loading={loading}
          handleUpload={handleUpload}
          serverResponse={serverResponse}
          isSubmitFileFailed={isSubmitFileFailed}
          handleUploadFailed={handleUploadFailed}
        />
      )
      }
    </Fragment>
  );
};

ImportBatchesForm.propTypes = {
  state: PropTypes.instanceOf(Object).isRequired,
  fileLoaded: PropTypes.bool.isRequired,
  onDrop: PropTypes.func,
  handleFile: PropTypes.func,
  handleUpload: PropTypes.func,
  handleDownloadTemplate: PropTypes.func,
  serverResponse: PropTypes.func,
  isSubmitFileFailed: PropTypes.bool.isRequired,
  handleUploadFailed: PropTypes.func.isRequired,
};

ImportBatchesForm.defaultProps = {
  onDrop: () => {},
  handleFile: () => {},
  handleUpload: () => {},
  handleDownloadTemplate: () => {},
  serverResponse: () => {}
};


export default ImportBatchesForm;
