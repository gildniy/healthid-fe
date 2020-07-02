import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Paper, Button, InputBase, InputAdornment, Radio,
  Typography, Tooltip, List,
} from '@material-ui/core';
import {
  RadioButtonUnchecked, RadioButtonChecked
} from '@material-ui/icons';

import {
  NotesIcon, TrashIcon, ArchieveIcon, PauseIcon
} from '../../../assets/SvgIcons/sellScreenSvgs';
import { useStateValue } from '../../../providers/stateProvider';
import { addedItems, tableStyles } from '../../../assets/css/sellScreenStyles';
import FormatCurrency from '../../utils/formatCurrency';
import AddCustomerPopper from '../addCustomerPopper';
import { AddCustomerDialog } from '../../shared/customers/addCustomerDialog';
import SalesOnHoldDialog from '../salesOnHoldDialog';
import SalesBatchDialog from '../salesBatchDialog';
import HoldSaleDialog from '../holdSaleDialog';
import CustomerDetailDialog from '../../shared/customers/customerDetailDialog';
import CustomerSearchField from '../customerSearchField';
import { ViewProducts } from '../viewProducts';
import ReturnBasket from './returnBasket';
import AddReturnProductNotePopper from './addReturnProductNotePopper';
import returnsActionTypes from '../../../providers/reducers/returns/returnsTypes';
import ProcessReturnDialog from './processReturnDialog';
import returnStyles from "../../../assets/styles/returns";

export const ReturnScreen = ({
  state,
  approvedProducts,
  handleAddNewCustomer,
  renderSingleCustomer,
  updateCustomers,
  renderSearchBar,
  handleClickToPay,
}) => {
  const [{
    returns: {
      currency, mainReturnNote, aggregatedBatches, returnTotal, returningForValue
    },
    customers: { selectedCustomer }
  }, dispatch] = Object.values(useStateValue());

  const handleChange = (event) => {
    const { value, name } = event.target;
    dispatch({
      type: returnsActionTypes.SET_RETURN_STATE,
      payload: { [name]: value }
    });
  };
  const handleDiscardReturnButton = () => {
    dispatch({
      type: returnsActionTypes.DISCARD_RETURN
    });
  };
  const handleHoldReturnButton = () => {
    dispatch({
      type: returnsActionTypes.HOLD_RETURN
    });
  };
  const handleReturnOnHoldButton = () => {

  };
  return (
    <Grid container>
      <ProcessReturnDialog
        dateSold="dateSold"
        timeSold="timeSold"
      />
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
            onClick={handleReturnOnHoldButton}
          >
            <ArchieveIcon style={addedItems.buttonsIcons} />
            <Typography variant="subtitle1" style={addedItems.buttonsTypo}>
              Return on Hold
            </Typography>
          </Button>
          <Button
            style={addedItems.buttons}
            size="large"
            disabled={aggregatedBatches.size === 0}
            onClick={handleHoldReturnButton}
          >
            <PauseIcon style={addedItems.buttonsIcons} />
            <Typography variant="subtitle1" style={addedItems.buttonsTypo}>
              Hold Return
            </Typography>
          </Button>
          <Button
            style={addedItems.buttons}
            size="large"
            onClick={handleDiscardReturnButton}
          >
            <TrashIcon style={addedItems.buttonsIcons} />
            <Typography variant="subtitle1" style={addedItems.buttonsTypo}>
              Discard
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
                  Returning For:
                </Typography>
              </Grid>
              <Grid item xs={4} style={returnStyles.center}>
                <Radio
                  name="returningForValue"
                  checked={returningForValue === 'self'}
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
                  name="returningForValue"
                  checked={returningForValue === 'other'}
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
              <ReturnBasket />
              <InputBase
                name="mainReturnNote"
                placeholder="Leave a note about return..."
                style={addedItems.inputRoot}
                value={mainReturnNote}
                onChange={handleChange}
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
                disabled={!aggregatedBatches.size}
              >
                <Grid container item xs={12} style={tableStyles.payButton}>
                  <Typography display="inline" variant="h6" style={tableStyles.buttonLabel}>
                    RETURN
                  </Typography>
                  <Typography display="inline" variant="h6" style={tableStyles.buttonLabel}>
                    <FormatCurrency
                      amount={`-${returnTotal}`}
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
      <AddCustomerDialog
        updateCustomers={updateCustomers}
      />
      <CustomerDetailDialog />
      <SalesBatchDialog />
      <HoldSaleDialog />
      <SalesOnHoldDialog
        state={state}
      />
      <AddReturnProductNotePopper />
    </Grid>
  );
};

ReturnScreen.propTypes = {
  state: PropTypes.instanceOf(Object),
  approvedProducts: PropTypes.instanceOf(Object),
  handleAddNewCustomer: PropTypes.func.isRequired,
  renderSingleCustomer: PropTypes.func.isRequired,
  renderSearchBar: PropTypes.func.isRequired,
  updateCustomers: PropTypes.func.isRequired,
  handleClickToPay: PropTypes.func.isRequired,
};

ReturnScreen.defaultProps = {
  state: {},
  approvedProducts: {},
};

export default ReturnScreen;
