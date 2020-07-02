import {
  Button, Card, CardMedia, Grid, Typography
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import ViewSupplierInvoice from '../../../../assets/images/ViewSupplierInvoice.png';

export function PrintInvoice(props) {
  const { classes, onClick } = props;
  return (
    <Grid item xs={3} className={classes.invoiceContainer}>
      <Grid item xs={12} container>
        <Card elevation={0} className={classes.card}>
          <CardMedia className={classes.media} image={ViewSupplierInvoice} title="Invoice Image" />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.invoiceLabel} align="center">Supplier Invoice</Typography>
      </Grid>
      <Grid container item xs={12} className={classes.buttonMainGrid}>
        <Grid item xs={12} className={classes.buttonsDiv}>
          <Button name="viewButton" variant="contained" className={classes.viewButton} onClick={onClick}>
              view
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

PrintInvoice.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  onClick: PropTypes.func.isRequired,
};
export default PrintInvoice;
