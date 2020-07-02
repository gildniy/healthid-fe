import { Button, Grid } from '@material-ui/core';
import ReactToPrint from 'react-to-print';
import React from 'react';
import PropTypes from 'prop-types';


const ViewInvoice = (props) => {
  const {
    classes, imgInvoice, onClick, invoice, trigger, content
  } = props;
  return (
    <>
      <Grid container spacing={3} className={classes.containerGrid}>
        <div className={classes.orderNameStyles}>
          <h3 className={classes.paperTitle}>Received Order</h3>
          <hr className={classes.titleLine} />
          {imgInvoice}
        </div>
      </Grid>
      <Grid
        className={classes.buttonModalGrid}
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Grid item xs={2} style={{ marginRight: '43px' }}>
          <Button name="closeButton" variant="outlined" onClick={onClick} className={classes.closeButtons}>
            Close
          </Button>
        </Grid>
        <Grid item xs={2}>
          {invoice === null ? (
            <Button variant="contained" className={classes.printButton} color="black" disabled>
              Print
            </Button>
          ) : (
            <ReactToPrint
              trigger={trigger}
              content={content}
            />
          )
          }
        </Grid>
      </Grid>
    </>
  );
};

ViewInvoice.propTypes = {
  onClick: PropTypes.func.isRequired,
  imgInvoice: PropTypes.string.isRequired,
  invoice: PropTypes.string.isRequired,
  trigger: PropTypes.func.isRequired,
  content: PropTypes.func.isRequired,
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
    buttonModalGrid: PropTypes.string,
    containerGrid: PropTypes.string,
    orderNameStyles: PropTypes.string,
    paperTitle: PropTypes.string,
    titleLine: PropTypes.string,
    printButton: PropTypes.string,
  }).isRequired,
};

export default ViewInvoice;
