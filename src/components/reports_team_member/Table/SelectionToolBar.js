import React, { useRef, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CustomIconButton } from '../../stock_control/utils/utils';
import PricingIcon from '../../../assets/images/pricing/pricing.png';
import LoyaltyIcon from '../../../assets/images/pricing/loyalty.png';
import DeleteIcon from '../../../assets/images/stock/delete.png';
import NoneIcon from '../../../assets/images/pricing/none.png';
import InverseIcon from '../../../assets/images/pricing/inverse.png';
import EditPricingPopper from '../editPricingPopper';
import EditLoyaltyPopper from '../editLoyaltyPopper';

export const SelectionToolBar = (props) => {
  const [pricingOpen, setPricingOpen] = useState(false);
  const [loyaltyOpen, setLoyaltyOpen] = useState(false);

  const pricingEl = useRef();
  const loyaltyEl = useRef();
  const {
    handleClickDeselectAll,
    isAdmin,
    handleClickInverseSelection,
  } = props;

  const handleTogglePricing = () => {
    setPricingOpen(!pricingOpen);
  };

  const handleToggleLoyalty = () => {
    setLoyaltyOpen(!loyaltyOpen);
  };

  const handleClosePricing = (event) => {
    !pricingEl.current.contains(event.target) && setPricingOpen(false);
  };

  const handleCloseLoyalty = (event) => {
    !loyaltyEl.current.contains(event.target) && setLoyaltyOpen(false);
  };

  return (
    <Fragment>
      <div>
        {isAdmin && (
        <>
          <CustomIconButton
            toolTip="Edit pricing"
            onClickHandler={handleTogglePricing}
            buttonRef={pricingEl}
          >
            <img src={PricingIcon} style={{ width: '1.5rem' }} alt="edit pricing" />
          </CustomIconButton>
          <CustomIconButton
            toolTip="Edit loyalty"
            onClickHandler={handleToggleLoyalty}
            buttonRef={loyaltyEl}
          >
            <img src={LoyaltyIcon} style={{ width: '1.5rem' }} alt="edit loyalty" />
          </CustomIconButton>
        </>
        )}
        <CustomIconButton toolTip="Delete">
          <img src={DeleteIcon} style={{ width: '1.5rem' }} alt="delete" />
        </CustomIconButton>
        <CustomIconButton
          toolTip="Deselect All"
          onClickHandler={handleClickDeselectAll}
        >
          <img src={NoneIcon} style={{ width: '1.5rem' }} alt="Deselect-all" />
        </CustomIconButton>
        <CustomIconButton
          toolTip="Inverse selection"
          onClickHandler={handleClickInverseSelection}
        >
          <img src={InverseIcon} style={{ width: '1.5rem' }} alt="inverse-selection" />
        </CustomIconButton>
      </div>
      <EditPricingPopper
        anchorEl={pricingEl.current}
        open={pricingOpen}
        handleClosePricing={handleClosePricing}
        handleClickDeselectAll={handleClickDeselectAll}
      />
      <EditLoyaltyPopper
        anchorEl={loyaltyEl.current}
        open={loyaltyOpen}
        handleCloseLoyalty={handleCloseLoyalty}
        handleClickDeselectAll={handleClickDeselectAll}
      />
    </Fragment>
  );
};

SelectionToolBar.propTypes = {
  handleClickDeselectAll: PropTypes.func.isRequired,
  handleClickInverseSelection: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default SelectionToolBar;
