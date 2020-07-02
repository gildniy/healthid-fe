import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Paper, Button, TableCell
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';
import { productDetailStyles } from '../../assets/styles/products/productDetailStyles';
import ProductHeader from './Templates/Header';
import Footer from '../shared/Footer';
import BatchInformation from './Templates/BatchInformation';
import Description from './Templates/Description';
import ProductInformation from './Templates/ProductInformation';
import StockDetails from './Templates/StockDetails';
import RenderDescriptionField from './Templates/renderDescriptionField';
import RenderTextField from './Templates/RenderTextField';

import { useStateValue } from '../../providers/stateProvider';

const moneyFormat = num => `${num.toFixed(2)}`;

const subtotal = items => items.map(
  ({ price }) => price
).reduce((sum, i) => sum + i, 0);

const quantityTotal = pricedArray => pricedArray.map(
  ({ quantity }) => quantity
).reduce((sum, i) => sum + i, 0);

const priceColumn = (quantity, unitCost) => quantity * unitCost;

const createRow = ({
  id, batchNo, dateReceived, supplier, expiryDate, quantity, unitCost, comment, serviceQuality, user
}) => {
  const price = priceColumn(quantity, unitCost);
  return {
    id,
    batchNo,
    dateReceived,
    supplier,
    expiryDate,
    quantity,
    unitCost,
    price,
    comment,
    serviceQuality,
    user
  };
};

const priceTotal = pricedArray => subtotal(pricedArray);

const AddPriceField = batchArray => batchArray.map(batch => createRow(batch));

export const ProductDetailRender = (props) => {
  const {
    product: {
      id,
      batchInfo,
      business,
      productName,
      salesPrice,
      skuNumber,
      description,
      manufacturer,
      productCategory,
      dispensingSize,
      image,
      brand,
      vatStatus,
      quantityInStock,
      reorderMax,
      reorderPoint,
      nearestExpiryDate,
      preferredSupplier,
      loyaltyWeight,
      backupSupplier,
      tags,
    },
    classes,
  } = props;
  const [, dispatch] = Object.values(useStateValue());

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
  }, []);
  const withPriceField = AddPriceField(batchInfo);
  let currency = '';
  if (business.outletSet[0]) {
    currency = business.outletSet[0].outletpreference.outletCurrency.symbol;
  }
  const renderTableCell = (align, style, name) => (
    <TableCell
      align={align || ''}
      style={style}
    >
      {name}
    </TableCell>
  );


  return (
    <React.Fragment>
      <ProductHeader classes={classes} previousPage="/products/approved" productName={productName}>
        <Link style={{ textDecoration: 'none' }} to={`/products/${id}/edit`}>
          <Button variant="contained" className={classes.editButton}>
            Edit
          </Button>
        </Link>
      </ProductHeader>
      <Paper elevation={2} className={classes.paper}>
        <Description
          classes={classes}
          productName={productName}
          renderTextField={RenderTextField}
          renderDescriptionField={RenderDescriptionField}
          productCategory={productCategory}
          description={description}
          tags={tags}
          image={image}
        />
        <ProductInformation
          classes={classes}
          renderTextField={RenderTextField}
          dispensingSize={dispensingSize}
          loyaltyWeight={loyaltyWeight}
          preferredSupplier={preferredSupplier}
          backupSupplier={backupSupplier}
          id={id}
          skuNumber={skuNumber}
          vatStatus={vatStatus}
          manufacturer={manufacturer}
          brand={brand}
        />
        <StockDetails
          classes={classes}
          renderTextField={RenderTextField}
          salesPrice={salesPrice}
          reorderMax={reorderMax}
          reorderPoint={reorderPoint}
          nearestExpiryDate={nearestExpiryDate}
          quantityInStock={quantityInStock}
        />
        <BatchInformation
          classes={classes}
          renderTableCell={renderTableCell}
          withPriceField={withPriceField}
          manufacturer={manufacturer}
          currency={currency}
          moneyFormat={moneyFormat}
          quantityTotal={quantityTotal}
          priceTotal={priceTotal}
          productName={productName}
          productId={id}
        />
      </Paper>
      <Footer />
    </React.Fragment>
  );
};

ProductDetailRender.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(productDetailStyles)(ProductDetailRender);
