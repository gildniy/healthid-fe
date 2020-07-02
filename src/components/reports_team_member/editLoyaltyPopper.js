import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, Divider, Paper, ClickAwayListener,
  Popper, Grow, Input, InputAdornment
} from '@material-ui/core';
import { Mutation } from 'react-apollo';
import notify from '../shared/Toaster';
import { validateInteger } from '../utils/validations';
import CustomHeader from './customHeader';
import { EDIT_LOYALTY } from '../../mutations/pricingLoyalty/pricingLoyalty';
import { useStateValue } from '../../providers/stateProvider';
import CustomIncrementDecrement from './customIncrementDecrement';

export const EditLoyaltyPopper = ({
  anchorEl,
  open,
  handleCloseLoyalty,
  handleClickDeselectAll
}) => {
  const [loyalty, setLoyalty] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const [{ pricing: { selectedRows, selected } }] = Object.values(useStateValue());

  React.useEffect(() => {
    const selectedValues = selectedRows.map(row => ({
      id: row.id,
      loyaltyValue: row.loyaltyWeight,
    }));
    setSelectedData(selectedValues);
    selectedValues.length > 0 && setLoyalty(selectedValues[0].loyaltyValue);
  }, [selectedRows]);

  const handleLoyaltyChange = (event) => {
    let { value } = event.target;
    if (!validateInteger(value)) value = '';
    setLoyalty(value);
  };

  const handleBtnChange = (action) => {
    const ceiling = 99;
    const floor = 0;
    const step = 1;
    const loyaltyNum = Number(loyalty);
    if (action === 'add' && loyaltyNum < ceiling) {
      return setLoyalty((loyaltyNum + step).toString());
    } if (action === 'remove' && loyaltyNum > floor) {
      return setLoyalty((loyaltyNum - step).toString());
    }
  };

  const handleUpdate = (event, productLoyaltyWeightUpdate) => {
    setIsLoading(true);
    const id = selectedData.map(data => data.id);
    productLoyaltyWeightUpdate({
      variables: { id, loyaltyValue: loyalty }
    })
      .then((response) => {
        setIsLoading(false);
        handleCloseLoyalty(event);
        handleClickDeselectAll();
        notify(response.data.productLoyaltyWeightUpdate.message);
      })
      .catch((error) => {
        setIsLoading(false);
        notify(error.message);
      });
  };

  const nonEmpty = () => loyalty;

  return (
    <Mutation mutation={EDIT_LOYALTY}>
      {productLoyaltyWeightUpdate => (
        <Popper
          open={open}
          placement="bottom"
          anchorEl={anchorEl}
          transition
          disablePortal
          className="pricing-popper"
          modifiers={{
            offset: {
              enabled: true,
              offset: '1vw, 1vh',
            }
          }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              id="menu-list-grow"
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper elevation={2} square className="pricing-popper__paper">
                <ClickAwayListener onClickAway={handleCloseLoyalty}>
                  <Grid container item xs={12}>
                    <CustomHeader
                      selected={selected}
                      nonEmpty={nonEmpty}
                      isLoading={isLoading}
                      handleClose={handleCloseLoyalty}
                      handleUpdate={event => handleUpdate(event, productLoyaltyWeightUpdate)}
                    />
                    <Divider className="pricing-popper__divider" />
                    <Grid item container className="pricing-popper__body-grid">
                      <Grid item className="pricing-popper__paper-grid">
                        <Paper square elevation={0} className="pricing-popper__paper2">
                          <Typography variant="caption" className="pricing-popper__text">
                            Points received by customer when buying 100 NGN of selected product(s)
                          </Typography>
                        </Paper>
                      </Grid>
                      <Typography variant="caption" className="pricing-popper__text header-2">
                        Edit loyalty weight for selected products
                      </Typography>
                      <Grid item container className="pricing-popper__loyalty">
                        <Typography variant="body2" className="pricing-popper__text--main loyalty-typo">
                          Loyalty weight
                        </Typography>
                        <Grid item>
                          <Input
                            name="quantity"
                            value={loyalty}
                            className="pricing-popper__input loyalty"
                            onChange={event => handleLoyaltyChange(event)}
                            disableUnderline
                            inputProps={{
                              style: { textAlign: 'right', padding: '7px 0' }
                            }}
                            endAdornment={(
                              <InputAdornment position="end" style={{ marginLeft: '4px' }}>
                                <Divider orientation="vertical" className="adornment-divider" />
                              </InputAdornment>
                            )}
                          />
                        </Grid>
                        <CustomIncrementDecrement
                          handleBtnChange={handleBtnChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      )}
    </Mutation>
  );
};

EditLoyaltyPopper.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  anchorEl: PropTypes.instanceOf(Object).isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseLoyalty: PropTypes.func.isRequired,
  handleMarkupChange: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
};

export default EditLoyaltyPopper;
