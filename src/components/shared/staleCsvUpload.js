import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Typography, Divider
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { batchImportStyles } from '../../assets/styles/stock/batchImportStyles';


const styles = batchImportStyles;

const MigrateOptions = (props) => {
  const {
    handleOpenDialog,
    toMigrate
  } = props;

  return (
    <Fragment>
      <Paper elevation={2} style={styles.paper}>

        <Grid item container xs={12} justify="center" style={styles.headerWrapper}>
          <Typography variant="h6">{`Flag stale ${toMigrate} from CSV`}</Typography>
        </Grid>

        <Divider light />

        <Grid container style={styles.migrateContainer}>
          <Grid item container xs={12}>
            <Typography variant="body2" style={styles.typoWrapper}>
              {`Select the csv containing the stale ${toMigrate}:`}
            </Typography>
          </Grid>

          <Grid item container xs={12} style={styles.imagesWrapper}>

            <Grid item xs={12}>
              <Paper
                elevation={2}
                style={styles.paperStaleProducts}
                onClick={() => handleOpenDialog('stale_products')}
              >
                <Typography variant="h6" style={styles.csvButton}>
                  Upload csv file
                  <CloudUploadIcon />
                </Typography>
              </Paper>
            </Grid>


          </Grid>

        </Grid>

      </Paper>
    </Fragment>
  );
};

MigrateOptions.propTypes = {
  handleOpenDialog: PropTypes.func.isRequired,
  toMigrate: PropTypes.string.isRequired
};

export default MigrateOptions;
