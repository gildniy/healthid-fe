import React, { Fragment } from 'react';
import { Grid, Typography, Paper } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import NumericInput from 'react-numeric-input';
import { saleDetailsDialog as styles } from '../../../assets/css/sellScreenStyles';
import { useStateValue } from '../../../providers/stateProvider';
import returnsActionTypes from '../../../providers/reducers/returns/returnsTypes';
import returnStyles from "../../../assets/styles/returns";

export function ReturnBatchList() {
  const [
    {
      returns: {
        toBeReturnedBatches, saleDetails
      },
    },
    dispatch
  ] = Object.values(useStateValue());
  const handleBatchInputChange = (e, saleDetailId) => {
    dispatch({
      type: returnsActionTypes.SET_SALE_DETAIL_RETURN_QUANTITY,
      payload: { quantity: e, saleDetailId }
    });
  };
  if (!saleDetails.length) {
    return (
      <Typography style={styles.center}>
        You don't have any returnable sales batch
      </Typography>
    );
  }
  return saleDetails.map((saleDetail) => {
    const quantityBought = saleDetail.quantity;
    const inputFormat = num => (
      num <= quantityBought ? num : quantityBought
    );
    const { batch, product } = saleDetail;
    const batchInCart = toBeReturnedBatches.get(`${saleDetail.id}`);
    return saleDetail
        && (
          <Fragment key={saleDetail.id}>
            <Paper elevation={0} square style={styles.saleBatchListPaper}>
              <Grid container justify="space-between">
                <Grid item container style={{ width: '33%' }}>
                  <Grid item style={returnStyles.checkboxWrapper}>
                    <Checkbox
                      color="primary"
                      checked={!!toBeReturnedBatches.get(saleDetail.id)}
                      value="checkedG"
                      disableRipple
                      style={styles.MuiIconButtonCheck}
                      onClick={() => dispatch({
                        type: returnsActionTypes.TOGGLE_SELECTED_BATCH,
                        payload: saleDetail
                      })}
                    />
                  </Grid>
                  <Grid item style={returnStyles.leftPadding}>
                    <Typography variant="caption" style={styles.captionText}>
                      Product Name
                    </Typography>
                    <Typography variant="subtitle2" style={styles.saleBatchListPaperColor}>
                      {product && product.productName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item align="left" style={{ ...styles.leftPadding, width: '18%' }}>
                  <Typography variant="caption" style={styles.captionText}>
                    Batch #
                  </Typography>
                  <Typography variant="subtitle2" style={styles.saleBatchListPaperColor}>
                    {batch.batchRef && batch.batchRef.slice(0, 14)}
                  </Typography>
                </Grid>
                <Grid item align="left" style={{ ...styles.leftPadding, width: '11%' }}>
                  <Typography variant="caption" style={styles.captionText}>
                    Expiry Date
                  </Typography>
                  <Typography variant="subtitle2" style={styles.saleBatchListPaperColor}>
                    {batch.expiryDate}
                  </Typography>
                </Grid>
                <Grid item style={{ width: '15%' }} align="right">
                  <Typography variant="caption" style={styles.captionText}>
                    Quantity Bought
                  </Typography>
                  <Typography variant="subtitle2" style={styles.saleBatchListPaperQtyLeft}>
                    {quantityBought}
                  </Typography>
                </Grid>
                <Grid item style={{ width: '16%', paddingRight: '5px' }} align="right">
                  {toBeReturnedBatches.get(`${saleDetail.id}`) ? (
                    <>
                      <Typography variant="caption" style={styles.captionText}>
                        Quantity Returned
                      </Typography>
                      <Typography variant="subtitle2" style={styles.saleBatchListPaperInput}>
                        <NumericInput
                          className="numeric-input"
                          onChange={e => handleBatchInputChange(e, saleDetail.id)}
                          value={batchInCart && batchInCart.quantityReturned}
                          format={inputFormat}
                          min={1}
                          max={quantityBought}
                          step={1}
                          size={3}
                          autoFocus
                        />
                      </Typography>
                    </>
                  ) : <div style={{ marginLeft: '100px' }}><span /></div>}
                </Grid>
              </Grid>
            </Paper>
          </Fragment>
        );
  });
}

export default ReturnBatchList;
