import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import NumericInput from 'react-numeric-input';
import { saleDetailsDialog as styles } from '../../assets/css/sellScreenStyles';

export function SaleBatchList({
  batchesForCart,
  selectedProduct,
  handleSelectedCheckBox,
  handleBatchInputChange,
  isBatchSelected,
  filtrationTechnique
}) {
  const filteredBatches = selectedProduct.productbatchSet.filter(filtrationTechnique);
  if (!filteredBatches.length) {
    return (
      <Typography style={styles.center}>
        You have no batch in stock
      </Typography>
    );
  }
  return filteredBatches.map((batch) => {
    const selectedBatch = batchesForCart.find(
      value => value.batchId === batch.id
    );
    const batchValue = () => {
      const foundBatch = batchesForCart.find(
        ({ batchId }) => batchId === batch.id
      );
      return foundBatch.quantity;
    };
    const quantityLeft = batch.quantity;
    const inputFormat = num => (
      num <= quantityLeft ? num : quantityLeft
    );

    return batch.quantity > 0
        && (
          <Fragment key={batch.id}>
            <Paper elevation={0} square style={styles.saleBatchListPaper}>
              <Grid container justify="space-between">
                <Grid item container xs={4}>
                  <Grid item style={styles.checkboxWrapper}>
                    <Checkbox
                      color="primary"
                      checked={!!selectedBatch}
                      value="checkedG"
                      disableRipple
                      style={styles.MuiIconButtonCheck}
                      onClick={() => handleSelectedCheckBox(batch, selectedProduct)}
                    />
                  </Grid>
                  <Grid item style={styles.leftPadding}>
                    <Typography variant="caption" style={styles.captionText}>
                      Batch #
                    </Typography>
                    <Typography variant="subtitle2" style={styles.saleBatchListPaperColor}>
                      {batch.batchRef && batch.batchRef.slice(0, 14)}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={3} align="left" style={styles.leftPadding}>
                  <Typography variant="caption" style={styles.captionText}>
                    Expiry Date
                  </Typography>
                  <Typography variant="subtitle2" style={styles.saleBatchListPaperColor}>
                    {batch.expiryDate}
                  </Typography>
                </Grid>
                <Grid item xs={2} align="right">
                  <Typography variant="caption" style={styles.captionText}>
                    Quantity Left
                  </Typography>
                  <Typography variant="subtitle2" style={styles.saleBatchListPaperQtyLeft}>
                    {quantityLeft}
                  </Typography>
                </Grid>
                <Grid item xs={3} align="right">
                  {isBatchSelected(batch) ? (
                    <>
                      <Typography variant="caption" style={styles.captionText}>
                        Quantity Required
                      </Typography>
                      <Typography variant="subtitle2" style={styles.saleBatchListPaperInput}>
                        <NumericInput
                          className="numeric-input"
                          onChange={e => handleBatchInputChange(e, batch)}
                          value={batchValue()}
                          format={inputFormat}
                          min={1}
                          max={quantityLeft}
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

SaleBatchList.propTypes = {
  handleSelectedCheckBox: PropTypes.func.isRequired,
  handleBatchInputChange: PropTypes.func.isRequired,
  isBatchSelected: PropTypes.func.isRequired,
  inputRef: PropTypes.instanceOf(Object),
  filtrationTechnique: PropTypes.func.isRequired
};

export default SaleBatchList;
