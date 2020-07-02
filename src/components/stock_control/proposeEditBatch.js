import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper } from '@material-ui/core';
import NumericInput from 'react-numeric-input';
import { saleDetailsDialog as styles } from '../../assets/css/sellScreenStyles';

export const ProposeEditBatch = ({
  batch: {
    id, expiryDate, batchQuantities
  },
  handleBatchInputChange,
}) => (
  <Paper elevation={0} square className="dialog-content-2__paper">
    <Grid container xs={12}>
      <Grid item xs={3}>
        <Typography variant="caption" className="dialog-caption">
          Batch #
        </Typography>
        <Typography variant="subtitle2" style={styles.saleBatchListPaperColor}>
          {id}
        </Typography>
      </Grid>
      <Grid item xs={3} style={{ paddingLeft: '1.3rem' }}>
        <Typography variant="caption" className="dialog-caption">
          Expiry Date
        </Typography>
        <Typography variant="subtitle2" style={styles.saleBatchListPaperColor}>
          {expiryDate}
        </Typography>
      </Grid>
      <Grid item xs={3} align="right" style={{ paddingRight: '1.2rem' }}>
        <Typography variant="caption" className="dialog-caption">
          Quantity Left
        </Typography>
        <Typography variant="subtitle2">
          {batchQuantities[0].quantityRemaining}
        </Typography>
      </Grid>
      <Grid item xs={3} align="right">
        <Typography variant="caption" className="dialog-caption">
          Change to
        </Typography>
        <Typography variant="subtitle2">
          <NumericInput
            className="numeric-input"
            onChange={e => handleBatchInputChange(id, e)}
            valueAsNumber={1}
            strict
            min={0}
            max={500}
            size={3}
          />
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

ProposeEditBatch.propTypes = {
  batch: PropTypes.instanceOf(Object),
  handleBatchInputChange: PropTypes.func.isRequired
};

ProposeEditBatch.defaultProps = {
  batch: {},
};

export default ProposeEditBatch;
