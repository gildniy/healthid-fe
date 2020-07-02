import React from 'react';
import {
  Dialog, DialogContent, DialogTitle, Slide, List, ListItem,
  ListItemText, ListItemSecondaryAction, ListItemAvatar, Avatar,
  Divider, Grid, Typography, Card, CardContent, IconButton
} from '@material-ui/core';
import { addCustomerDialog as styles } from '../../assets/css/sellScreenStyles';
import productPlaceholder from '../../assets/images/sellScreen/productPlaceholder.png';
import { RetrieveIcon, CautionIcon } from '../../assets/SvgIcons/sellScreenSvgs';
import sellActionTypes from '../../providers/reducers/sell/sellTypes';

import { useStateValue } from '../../providers/stateProvider';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const SalesOnHoldDialog = () => {
  const [{
    sell: { salesOnHold, openSalesOnHoldDialog }
  }, dispatch] = Object.values(useStateValue());

  const handleDialogClose = () => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: { openSalesOnHoldDialog: false }
    });
  };

  const handleReturnSaleToCart = (cart) => {
    dispatch({
      type: sellActionTypes.SET_SELL_STATE,
      payload: {
        cart,
        salesOnHold: []
      }
    });
    handleDialogClose();
  };

  return (
    <Dialog
      open={openSalesOnHoldDialog}
      maxWidth="sm"
      fullWidth
      TransitionComponent={Transition}
      onClose={handleDialogClose}
      aria-labelledby="add-customer-dialog"
      id="add-customer-dialog"
    >
      <DialogTitle
        id="alert-dialog-slide-title"
        style={styles.dialogTitle}
      >
        Sales on Hold
      </DialogTitle>
      <DialogContent style={styles.dialogContent}>
        {salesOnHold.length ? (
          <Grid container>
            <Grid item xs={12} style={styles.dialogContentGrid}>
              <List style={styles.list}>
                {salesOnHold.map(({ note, cart }) => (
                  <React.Fragment key={note}>
                    <ListItem
                      alignItems="flex-start"
                      button
                      onClick={() => handleReturnSaleToCart(cart)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={productPlaceholder}
                          src={cart[0].image}
                          style={styles.productAvatar}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={(
                          <React.Fragment>
                            <Grid style={styles.listedHeldItems}>
                              {cart.slice(0, 3).map(({ id, productName, quantity }) => (
                                <Typography
                                  key={id}
                                  component="span"
                                  variant="body2"
                                  color="textPrimary"
                                >
                                  {`${quantity} x ${productName}`}
                                </Typography>
                              ))}
                              {cart.length > 3 && '...'}
                            </Grid>
                          </React.Fragment>
                        )}
                        secondary={(
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              color="textPrimary"
                              inline
                            >
                              Note:
                              {' '}
                            </Typography>
                            {note}
                          </React.Fragment>
                        )}
                      />
                      <ListItemSecondaryAction>
                        <RetrieveIcon edge="end" style={styles.retrieveIcon} />
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </Grid>
        ) : (
          <Card style={styles.cardContent}>
            <CardContent>
              <IconButton
                aria-label="caution"
                disabled
                color="primary"
              >
                <CautionIcon style={styles.cautionIcon} />
              </IconButton>
              <Typography color="textSecondary">
                  Nothing on Hold
              </Typography>
            </CardContent>
          </Card>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SalesOnHoldDialog;
