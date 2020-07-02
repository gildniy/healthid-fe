import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, Divider, Paper, ClickAwayListener,
  Popper, Grow, Input, InputAdornment, Radio
} from '@material-ui/core';
import { Mutation } from 'react-apollo';
import clsx from 'clsx';
import notify from '../shared/Toaster';
import { validateFloat, validateInteger } from '../utils/validations';
import CustomHeader from './customHeader';
import { EDIT_PRICING } from '../../mutations/pricingLoyalty/pricingLoyalty';
import CustomIncrementDecrement from './customIncrementDecrement';
import { useStateValue } from '../../providers/stateProvider';

export const EditPricingPopper = ({
  anchorEl,
  open,
  handleClosePricing,
  handleClickDeselectAll
}) => {
  const [active, setActive] = useState('markup');
  const [markup, setMarkup] = useState();
  const [price, setPrice] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  const [{ pricing: { selectedRows, selected } }] = Object.values(useStateValue());

  React.useEffect(() => {
    const selectedValues = selectedRows.map(row => ({
      id: row.id,
      markup: row.markup,
      price: row.salesPrice
    }));
    setSelectedData(selectedValues);
    selectedValues.length > 0 && setMarkup(selectedValues[0].markup);
    selectedValues.length > 0 && setPrice(selectedValues[0].price);
  }, [selectedRows]);

  const handleActive = (event) => {
    setActive(event.target.value);
  };

  const handleInputChange = (event) => {
    let { value } = event.target;
    const { name } = event.target;
    if (name === 'markup') {
      if (!validateInteger(value)) value = '';
      return setMarkup(value);
    }
    if (!validateFloat(value)) value = '';
    return setPrice(value);
  };

  const handleBtnChange = (action) => {
    const ceiling = 100;
    const floor = 0;
    const step = 1;
    const markupNum = Number(markup);
    if (action === 'add' && markupNum < ceiling) {
      return setMarkup((markupNum + step).toString());
    }
    if (action === 'remove' && markupNum > floor) {
      return setMarkup((markupNum - step).toString());
    }
  };

  const handleUpdate = (event, updatePrice) => {
    setIsLoading(true);
    const productIds = selectedData.map(data => data.id);
    const activeParam = () => {
      if (active === 'markup') return { markup };
      return { salesPrice: price };
    };
    updatePrice({
      variables: { productIds, ...activeParam() }
    })
      .then((response) => {
        setIsLoading(false);
        handleClosePricing(event);
        handleClickDeselectAll();
        notify(response.data.updatePrice.message);
      })
      .catch((error) => {
        setIsLoading(false);
        notify(error.message);
      });
  };

  const nonEmpty = () => {
    if (active === 'markup') return markup;
    return price;
  };

  return (
    <Mutation mutation={EDIT_PRICING}>
      {updatePrice => (
        <Popper
          open={open}
          placement="bottom-start"
          anchorEl={anchorEl}
          transition
          disablePortal
          className="pricing-popper"
          modifiers={{
            offset: {
              enabled: true,
              offset: '-8vw, 1vh',
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
                <ClickAwayListener onClickAway={handleClosePricing}>
                  <Grid container item xs={12}>
                    <CustomHeader
                      selected={selected}
                      nonEmpty={nonEmpty}
                      isLoading={isLoading}
                      handleClose={handleClosePricing}
                      handleUpdate={event => handleUpdate(event, updatePrice)}
                    />
                    <Divider className="pricing-popper__divider" />
                    <Grid item container className="pricing-popper__body-grid">
                      <Grid item className="pricing-popper__paper-grid">
                        <Paper square elevation={0} className="pricing-popper__paper2">
                          <Typography display="block" variant="caption" className="pricing-popper__text">
                            Pre-tax Retail price per unit = Supply cost per unit * (1 + markup %)
                          </Typography>
                          <Typography variant="caption" className="pricing-popper__text">
                            Retail price per unit = Pre-tax Retail price per unit * (1 + VAT tax rate %)
                          </Typography>
                        </Paper>
                      </Grid>
                      <Typography variant="caption" className="pricing-popper__text header-2">
                        Edit price or markup for selected products
                      </Typography>
                      <Grid
                        item
                        container
                        className={clsx('pricing-popper__edits', active !== 'markup' && 'half-opacity')}
                      >
                        <Radio
                          checked={active === 'markup'}
                          onChange={handleActive}
                          value="markup"
                          color="default"
                          name="radio-markup"
                          className="pricing-popper__radio markup-rd"
                          size="small"
                          inputProps={{
                            'aria-label': 'Active',
                          }}
                        />
                        <Typography variant="body2" className="pricing-popper__text--main markup-typo">
                          Edit markup
                        </Typography>
                        <Grid item>
                          <Input
                            name="markup"
                            value={markup}
                            className="pricing-popper__markup"
                            onChange={event => handleInputChange(event)}
                            disabled={active !== 'markup'}
                            disableUnderline
                            inputProps={{
                              style: { textAlign: 'right', padding: '7px 0' }
                            }}
                            endAdornment={(
                              <InputAdornment position="end" style={{ marginLeft: 0 }}>
                                %
                              </InputAdornment>
                            )}
                          />
                        </Grid>
                        {active === 'markup' && (
                          <CustomIncrementDecrement
                            handleBtnChange={handleBtnChange}
                          />
                        )}
                      </Grid>
                      <Grid
                        item
                        container
                        className={clsx('pricing-popper__edits', active !== 'price' && 'half-opacity')}
                      >
                        <Radio
                          checked={active === 'price'}
                          onChange={handleActive}
                          value="price"
                          color="default"
                          name="radio-price"
                          className="pricing-popper__radio"
                          size="small"
                          inputProps={{
                            'aria-label': 'Active',
                          }}
                        />
                        <Typography variant="body2" className="pricing-popper__text--main price-typo">
                          Edit price
                        </Typography>
                        <Grid item>
                          <Input
                            name="price"
                            value={price}
                            className="pricing-popper__input pricing"
                            onChange={event => handleInputChange(event)}
                            disabled={active !== 'price'}
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

EditPricingPopper.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  anchorEl: PropTypes.instanceOf(Object).isRequired,
  open: PropTypes.bool.isRequired,
  handleClosePricing: PropTypes.func.isRequired,
  handleClickDeselectAll: PropTypes.func.isRequired,
  handleMarkupChange: PropTypes.func.isRequired
};

export default EditPricingPopper;
