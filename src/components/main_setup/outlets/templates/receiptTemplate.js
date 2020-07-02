import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, Paper
} from '@material-ui/core';
import FooterModal from './footerModal';
import UploadLogo from './uploadLogo';
import { MainSetupStyles as styles, ContentWrapper } from '../../../../assets/styles/setup';
import receiptTemp02 from '../../../../assets/images/receiptTemp02.png';


const ReceiptTemplate = ({ classes, renderTextField, handleReceiptTemplate }) => (
  <Fragment>
    <div className={classes.dividerDiv}>
      <Typography
        paragraph
        align="left"
        gutterBottom
        className={classes.dividerHeaders}
      >
        Receipt Template
      </Typography>
    </div>
    <Grid container spacing={24} className={classes.containerGrid} justify="space-between">
      <Grid item xs={12}>
        <Typography
          paragraph
          align="left"
          style={{ opacity: '0.7' }}
        >
          Select Receipt Template to Manage Displays
        </Typography>
        <Paper elevation={2} style={styles.paperMenu}>
          <Grid container style={{ padding: '2px' }} justify="center">
            <Grid item xs={10} style={{ marginLeft: '10px', paddingTop: '10px' }}>
              {renderTextField(
                classes.descriptionFields, 'logo ', 'Upload Receipt Logo', 'Current using default logo'
              )}
            </Grid>
            <Grid item xs={1} style={{ paddingTop: '12px' }}>
              <UploadLogo />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={2} style={styles.paperMenu}>
          <Grid container style={{ padding: '2px' }} justify="center">
            <Grid item xs={10} style={{ marginLeft: '10px', paddingTop: '10px' }}>
              {renderTextField(
                classes.descriptionFields, 'receiptFooterText ', 'Receipt Footer Text', 'Thank you for shopping with us'
              )}
            </Grid>
            <Grid item xs={1} style={{ paddingTop: '12px' }}>
              <FooterModal />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  </Fragment>
);

ReceiptTemplate.propTypes = {
  classes: PropTypes.instanceOf(Object),
  renderTextField: PropTypes.func.isRequired,
  handleReceiptTemplate: PropTypes.func.isRequired,
};

ReceiptTemplate.defaultProps = {
  classes: {}
};


export default ReceiptTemplate;
