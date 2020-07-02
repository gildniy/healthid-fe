import React from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import salesDialogStyles from '../../assets/css/salesDialogStyles';
import Loader from '../shared/Loader';

const styles = salesDialogStyles;

const PaymentButton = (props) => {
  const {
    classes,
    handleSale,
    loading,
    cannotPay
  } = props;

  return (
    <div className={classes.saleButtonDiv}>
      {loading ? (
        <Loader size={30} thickness={10} variant="determinate" />
      ) : (
        <Button
          id={'complete-sale'}
          variant="contained"
          color="secondary"
          onClick={handleSale}
          disabled={cannotPay}
          className={classes.saleButton}
        >
          COMPLETE SALE
        </Button>
      )}
    </div>
  );
};

PaymentButton.propTypes = {
  sale: PropTypes.bool.isRequired,
  cashConfirmed: PropTypes.bool.isRequired,
  cardChecked: PropTypes.bool.isRequired,
  bankChecked: PropTypes.bool.isRequired,
  processing: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  handleSale: PropTypes.func.isRequired,
  handleProcessing: PropTypes.func.isRequired,
  prefferedPayMethod: PropTypes.string.isRequired,
};

export default withStyles(styles)(PaymentButton);
