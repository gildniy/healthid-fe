import {
  Button, Card, CardMedia, Grid, Typography
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import Uploadinvoiceicon from '../../../../assets/images/Uploadinvoiceicon.png';

// eslint-disable-next-line import/prefer-default-export
export function UploadInvoiceContainer(props) {
  const { classes, onClick } = props;
  return (
    <Grid item xs={3} className={classes.invoiceContainer}>
      <Grid item xs={12} container>
        <Card elevation={0} className={classes.card}>
          <CardMedia className={classes.media} image={Uploadinvoiceicon} title="Invoice Image" />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.invoiceLabel} align="center">Assign Invoice</Typography>
      </Grid>
      <Grid container item xs={12} className={classes.buttonMainGrid}>
        <Grid item xs={12} className={classes.buttonsDiv}>
          <Button name="uploadButton" variant="contained" className={classes.viewButton} onClick={onClick}>
            UPLOAD
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

UploadInvoiceContainer.propTypes = {
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.shape({
    buttonMainGrid: PropTypes.string,
    buttonsDiv: PropTypes.string,
    viewButton: PropTypes.string,
    card: PropTypes.string,
    media: PropTypes.string,
    orderName: PropTypes.string,
    orderID: PropTypes.string,
    invoiceLabel: PropTypes.string,
    invoiceContainer: PropTypes.string,
    image: PropTypes.string,
    paper: PropTypes.string,
    closeButtons: PropTypes.string,
    buttonModalGrid: PropTypes.string
  }).isRequired,
};
