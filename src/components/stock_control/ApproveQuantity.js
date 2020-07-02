import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

import { ApproveStockIcon } from '../../assets/images/stock/StockIcons';
import { APPROVE_QUANTITY } from '../../mutations/stockControl';
import { GET_ALL_PROPOSED_EDITS } from '../../queries/stockProducts';
import { GET_APPROVED_PRODUCTS } from '../../queries/productsQueries/productQueries';
import { ProposedProductStyles } from '../../assets/styles/stock/stock';

export const ApproveQuantity = ({
  classes, approveEdit, batchId, productId
}) => (
  <Mutation
    mutation={APPROVE_QUANTITY}
    refetchQueries={() => [
      { query: GET_APPROVED_PRODUCTS },
      { query: GET_ALL_PROPOSED_EDITS },
    ]}
  >
    {approveQuantity => (
      <Grid item container justify="flex-end" className={classes.iconWrapper}>
        <IconButton
          data-batchid={batchId}
          data-productid={productId}
          className={classes.approveButton}
          onClick={event => approveEdit(event, true, approveQuantity)}
        >
          <ApproveStockIcon className={classes.approveIcon} />
        </IconButton>
        <IconButton
          data-batchid={batchId}
          data-productid={productId}
          className={classes.clearButton}
          onClick={event => approveEdit(event, false, approveQuantity)}
        >
          <ClearIcon className={classes.clearIcon} />
        </IconButton>
      </Grid>
    )}
  </Mutation>
);

ApproveQuantity.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  batchId: PropTypes.string.isRequired,
  productId: PropTypes.string.isRequired,
  approveEdit: PropTypes.func.isRequired
};

export default withStyles(ProposedProductStyles)(ApproveQuantity);
