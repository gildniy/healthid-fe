import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Grid, Typography, Divider
} from '@material-ui/core';
import { batchImportStyles } from '../../assets/styles/stock/batchImportStyles';
import retailPro from '../../assets/images/migrate/retail_pro.png';
import quickBooks from '../../assets/images/migrate/quick_books.png';

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
          <Typography variant="h6">{`Migrate ${toMigrate} from Software`}</Typography>
        </Grid>

        <Divider light />

        <Grid container style={styles.migrateContainer}>
          <Grid item container xs={12}>
            <Typography variant="body2" style={styles.typoWrapper}>
              {`Select software to migrate ${toMigrate} from:`}
            </Typography>
          </Grid>

          <Grid item container xs={12} style={styles.imagesWrapper}>

            <Grid item xs={6}>
              <Paper
                elevation={2}
                style={styles.paperRetailPro}
                onClick={() => handleOpenDialog('retail_pro')}
              >
                <img src={retailPro} style={{ maxWidth: '90%' }} alt="search" />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper
                elevation={2}
                style={styles.paperQuickBooks}
                onClick={() => handleOpenDialog('quick_books')}
              >
                <img src={quickBooks} style={{ maxWidth: '100%' }} alt="search" />
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
