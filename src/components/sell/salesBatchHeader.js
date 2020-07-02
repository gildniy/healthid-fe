import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, IconButton, Tooltip
} from '@material-ui/core';
import ConfirmLogo from '../../assets/images/sellScreen/Confirm.png';
import CancelLogo from '../../assets/images/sellScreen/Cancel.png';
import BatchIcon from '../../assets/images/sellScreen/out-of-stock-batch.png';

import { saleDetailsDialog as styles } from '../../assets/css/sellScreenStyles';
import SimpleBadge from '../SimpleBadge';

export const SaleBatchHeader = ({
  selectedProduct,
  handleBatchDialogClose,
  handleClickToAddProduct,
  batchesForCart,
  handleSellFromOutOfStock,
  outOfstockQuantity
}) => (
  <Fragment>
    <Grid container>
      <Grid item container xs={8} direction="column">
        <Typography variant="h5" style={styles.name}>{selectedProduct.productName}</Typography>
        <Grid item container direction="row">
          <Typography variant="caption" style={styles.captionTextProdType}>{selectedProduct.productCategory.name}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={4} align="right">
        <Tooltip
          title="Sell Out-of-stock Qty"
        >
          <span>
            <IconButton
              aria-label="Edit"
              onClick={e => handleSellFromOutOfStock(e)}
              style={styles.icon}
            >
              <SimpleBadge value={outOfstockQuantity}>
                <img src={BatchIcon} style={{ width: '24px' }} alt="" />
              </SimpleBadge>
            </IconButton>
          </span>
        </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Tooltip
          title="Add to cart"
        >
          <span>
            <IconButton
              aria-label="Edit"
              onClick={() => handleClickToAddProduct()}
              disabled={!batchesForCart.length}
              style={styles.icon}
            >
              <img src={ConfirmLogo} style={{ width: '20px' }} alt="" />
            </IconButton>
          </span>
        </Tooltip>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Tooltip
          title="Close"
        >
          <span>
            <IconButton
              aria-label="Edit"
              onClick={() => handleBatchDialogClose()}
              style={styles.icon}
            >
              <img src={CancelLogo} style={{ width: '20px' }} alt="" />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
    </Grid>
  </Fragment>
);

SaleBatchHeader.propTypes = {
  selectedProduct: PropTypes.instanceOf(Object),
  handleBatchDialogClose: PropTypes.func.isRequired,
  handleClickToAddProduct: PropTypes.func.isRequired,
  batchesForCart: PropTypes.arrayOf(Object).isRequired,
  handleSellFromOutOfStock: PropTypes.func.isRequired,
  outOfstockQuantity: PropTypes.number,
};

SaleBatchHeader.defaultProps = {
  selectedProduct: {},
  outOfstockQuantity: 0,
};

export default SaleBatchHeader;
