import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Button, InputBase, InputAdornment, Radio,
  Typography, Tooltip, List,
} from '@material-ui/core';
import {
  RadioButtonUnchecked, RadioButtonChecked
} from '@material-ui/icons';
import FormatCurrency from '../utils/formatCurrency';
import { addedItems, tableStyles } from '../../assets/css/sellScreenStyles';
import AddCustomerDialog from '../shared/customers/addCustomerDialog';
import CustomerDetailDialog from '../shared/customers/customerDetailDialog';
import SalesBatchDialog from './salesBatchDialog';
import HoldSaleDialog from './holdSaleDialog';
import AddDiscountPopper from './addDiscountPopper';
import AddProductNotePopper from './addProductNotePoppper';
import AddCustomerPopper from './addCustomerPopper';
import SalesOnHoldDialog from './salesOnHoldDialog';
import CustomerSearchField from './customerSearchField';
import {
  NotesIcon, TrashIcon, ArchieveIcon, PauseIcon
} from '../../assets/SvgIcons/sellScreenSvgs';
import ViewProducts from './viewProducts';
import CartBasket from './cartBasket';
import { useStateValue } from '../../providers/stateProvider';

export const SellScreen = ({
  state,
  approvedProducts,
  handleChange,
  handleNoteInPutChange,
  handleDiscardSaleButton,
  handleHoldSaleButton,
  handleSalesOnHoldButton,
  handleDiscountClick,
  handleAddNewCustomer,
  renderSingleCustomer,
  renderCartTotal,
  renderCartDiscount,
  renderGrandTotal,
  renderSearchBar,
  handleClickToPay,
}) => {
  const {
    buyingForValue,
  } = state;
  const [{
    sell: {
      cart, discount, currency, mainCartNote
    },
    customers: { selectedCustomer }
  }] = Object.values(useStateValue());

  return (
    <Grid container>
      <Grid container item xs={7} style={addedItems.productsWrapper}>
        <ViewProducts
          state={state}
          renderSearchBar={renderSearchBar}
          approvedProducts={approvedProducts}
        />
      </Grid>
      <Grid container item xs={5} style={addedItems.cartWrapper}>
        <Grid container item xs={12} style={addedItems.buttonsGrid}>
          <Button
            style={addedItems.buttons}
            size="large"
            onClick={handleSalesOnHoldButton}
          >
            <ArchieveIcon style={addedItems.buttonsIcons} />
            <Typography variant="subtitle1" style={addedItems.buttonsTypo}>
              Sales on Hold
            </Typography>
          </Button>
          <Button
            style={addedItems.buttons}
            size="large"
            disabled={cart.length === 0}
            onClick={handleHoldSaleButton}
          >
            <PauseIcon style={addedItems.buttonsIcons} />
            <Typography variant="subtitle1" style={addedItems.buttonsTypo}>
              Hold Sale
            </Typography>
          </Button>
          <Button
            style={addedItems.buttons}
            size="large"
            onClick={handleDiscardSaleButton}
          >
            <TrashIcon style={addedItems.buttonsIcons} />
            <Typography variant="subtitle1" style={addedItems.buttonsTypo}>
              Discard Sale
            </Typography>
          </Button>
        </Grid>
        <Paper elevation={2} style={addedItems.paper}>
          <form style={addedItems.container} noValidate autoComplete="off">
            {!selectedCustomer ? (
              <CustomerSearchField />
            ) : (
              <List style={addedItems.singleCustomerList}>
                {renderSingleCustomer(selectedCustomer, 'isSelected')}
              </List>
            )}
            <Grid container item xs={12} style={addedItems.buyingFor}>
              <Grid item xs={3} style={addedItems.buyingForTypo}>
                <Typography display="inline" variant="subtitle2" style={addedItems.buyingForTypo}>
                  Buying For:
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Radio
                  name="buyingForValue"
                  checked={buyingForValue === 'self'}
                  onChange={handleChange}
                  value="self"
                  style={addedItems.radio}
                  color="primary"
                  icon={<RadioButtonUnchecked fontSize="default" color="disabled" />}
                  checkedIcon={<RadioButtonChecked fontSize="default" />}
                />
                <Typography display="inline" variant="subtitle2" style={addedItems.radioLable}>
                  Self
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Radio
                  name="buyingForValue"
                  checked={buyingForValue === 'other'}
                  onChange={handleChange}
                  value="other"
                  style={addedItems.radio}
                  color="primary"
                  icon={<RadioButtonUnchecked fontSize="default" color="disabled" />}
                  checkedIcon={<RadioButtonChecked fontSize="default" />}
                />
                <Typography display="inline" variant="subtitle2" style={addedItems.radioLable}>
                  Someone else
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} style={addedItems.buyingFor}>
              <CartBasket />
              <Grid container item xs={12} style={tableStyles.totals}>
                <Typography display="inline" variant="h6" style={tableStyles.subtotal}>
                  SUBTOTAL:
                </Typography>
                <Typography display="inline" variant="h6" style={tableStyles.currency}>
                  <FormatCurrency
                    amount={renderCartTotal(cart)}
                    currency={currency}
                  />
                </Typography>
              </Grid>
              <Grid container item xs={12} style={tableStyles.discountWrapper}>
                <Grid item xs={1} style={tableStyles.discount}>
                  <Typography display="inline" variant="caption" style={tableStyles.discountNum}>
                    {discount}
                    %
                  </Typography>
                </Grid>
                <Grid container item xs={11} style={tableStyles.discount}>
                  <Tooltip title="Add Discount">
                    <Typography
                      id="discount-input"
                      display="inline"
                      variant="caption"
                      style={tableStyles.discountTypo}
                      onClick={handleDiscountClick}
                    >
                      DISCOUNT:
                    </Typography>
                  </Tooltip>
                  <Typography display="inline" variant="caption" style={tableStyles.discountTotal}>
                    <FormatCurrency
                      amount={renderCartDiscount(cart, discount)}
                      currency={currency}
                    />
                  </Typography>
                </Grid>
              </Grid>
              <InputBase
                name="mainCartNote"
                placeholder="Leave a note about sale..."
                style={addedItems.inputRoot}
                value={mainCartNote}
                onChange={handleNoteInPutChange}
                startAdornment={(
                  <InputAdornment position="start">
                    <NotesIcon style={addedItems.adornment} />
                  </InputAdornment>
                )}
              />
            </Grid>
            <Grid container item xs={12} style={addedItems.buyingFor}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleClickToPay}
                disabled={!cart.length}
              >
                <Grid container item xs={12} style={tableStyles.payButton}>
                  <Typography display="inline" variant="h6" style={tableStyles.buttonLabel}>
                    PAY
                  </Typography>
                  <Typography display="inline" variant="h6" style={tableStyles.buttonLabel}>
                    <FormatCurrency
                      amount={renderGrandTotal(cart, discount)}
                      currency={currency}
                    />
                  </Typography>
                </Grid>
              </Button>
            </Grid>
          </form>
        </Paper>
      </Grid>

      <AddCustomerPopper
        handleAddNewCustomer={handleAddNewCustomer}
        renderSingleCustomer={renderSingleCustomer}
      />
      <AddCustomerDialog />
      <CustomerDetailDialog />
      <SalesBatchDialog />
      <HoldSaleDialog />
      <SalesOnHoldDialog
        state={state}
      />
      <AddProductNotePopper />
      <AddDiscountPopper />
    </Grid>
  );
};

SellScreen.propTypes = {
  state: PropTypes.instanceOf(Object),
  approvedProducts: PropTypes.instanceOf(Object),
  handleChange: PropTypes.func.isRequired,
  handleNoteInPutChange: PropTypes.func.isRequired,
  handleDiscardSaleButton: PropTypes.func.isRequired,
  handleHoldSaleButton: PropTypes.func.isRequired,
  handleSalesOnHoldButton: PropTypes.func.isRequired,
  handleDiscountClick: PropTypes.func.isRequired,
  handleAddNewCustomer: PropTypes.func.isRequired,
  renderSingleCustomer: PropTypes.func.isRequired,
  renderSearchBar: PropTypes.func.isRequired,
  renderCartTotal: PropTypes.func.isRequired,
  renderCartDiscount: PropTypes.func.isRequired,
  renderGrandTotal: PropTypes.func.isRequired,
  handleClickToPay: PropTypes.func.isRequired,
};

SellScreen.defaultProps = {
  state: {},
  approvedProducts: {},
};

export default SellScreen;
