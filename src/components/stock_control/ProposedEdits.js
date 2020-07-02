import React, { useState } from 'react';
import ContentLoader from 'react-content-loader';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography, ListItemText, ListItem, List, Grid
} from '@material-ui/core';
import ApproveQuantity from './ApproveQuantity';
import { GET_ALL_PROPOSED_EDITS } from '../../queries/stockProducts';
import { ProposedProductStyles } from '../../assets/styles/stock/stock';
import notify from '../shared/Toaster';

export const ProposedEdits = ({ classes }) => {
  const [proposedEdits, setProposedEdits] = useState([]);

  const approveEdit = (event, toApprove, approveQuantity) => {
    const { batchid, productid } = event.currentTarget.dataset;
    const requestData = {
      batchIds: [batchid],
      productId: Number(productid),
      isApproved: toApprove
    };
    const approveComment = toApprove ? 'approved' : 'declined';
    approveQuantity({
      variables: { comment: approveComment, ...requestData }
    })
      .then((response) => {
        notify(response.data.approveQuantity.message.replace(/-/gi, '/'));
      })
      .catch(error => notify(error.message.split(':')[1]));
  };

  return (
    <Query query={GET_ALL_PROPOSED_EDITS} pollInterval={500}>
      {({ loading, data, networkStatus }) => {
        if (loading && networkStatus !== 6) {
          return (
            <List>
              <ListItem>
                <ListItemText
                  primary={<ContentLoader className={classes.loader} />}
                />
              </ListItem>
            </List>
          );
        }
        if (data.proposedQuantityEdits.length === 0) {
          return (
            <div className={classes.noProposedEditWrapper}>
              <span className={classes.noProposedEdit}>No changes to approve</span>
            </div>
          );
        }

        setProposedEdits(data.proposedQuantityEdits);
        return (
          <List className={clsx(classes.root, proposedEdits.length > 4 && classes.scrollWrapper)}>
            {proposedEdits.map(product => (
              <div key={product.batch.id}>
                <ListItem alignItems="flex-start" key={product.batch.id} data-batch={product.batch.id}>
                  <Grid container>
                    <Grid item xs={8}>
                      <Typography variant="body2" className={classes.primaryText} direction="row">
                        {product.batch.product.productName}
                      </Typography>
                      <div className={classes.listWrapper}>
                        <Typography variant="caption" className={classes.inline} color="textPrimary">
                          Batch ID:
                        </Typography>
                        <Typography variant="caption" className={classes.batchIds} color="textPrimary">
                          {` ${product.batch.id}`}
                        </Typography>
                        <div>
                          {`Date received: ${product.batch.dateReceived ? product.batch.dateReceived.replace(/-/gi, '/') : ''}`}
                        </div>
                        <Typography
                          component="div"
                          variant="caption"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          {`Quantity change from: ${product.batch.quantity} to `}
                          <b>{product.batch.proposedQuantity}</b>
                        </Typography>
                        <div>
                          {`Changed by: ${product.proposedBy.username}`}
                        </div>
                      </div>
                    </Grid>
                    <Grid item container xs={4}>
                      <ApproveQuantity
                        batchId={product.batch.id}
                        productId={product.batch.product.id}
                        approveEdit={approveEdit}
                      />
                    </Grid>
                  </Grid>
                </ListItem>
              </div>
            ))}
          </List>
        );
      }}
    </Query>
  );
};

ProposedEdits.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired
};

export default withStyles(ProposedProductStyles)(ProposedEdits);
