import React from 'react';
import PropTypes from 'prop-types';
import {
  List, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import FormatCurrency from '../utils/formatCurrency';
import searchListStyles from '../../assets/css/searchListStyles';

const styles = searchListStyles;

const SearchList = ({
  product, currency, handleClickViewDetails
}) => {
  const {
    image, productName, salesPrice,
  } = product;
  const outOfstockBatch = product.productbatchSet.filter(data => data.batchRef === 'OUT OF STOCK');
  const outOfstockQuantity = outOfstockBatch.length && outOfstockBatch[0].quantity;
  const productUPC = product.globalUpc || 'No UPC';

  return (
    <List component="nav" style={styles.list}>
      <ListItem
        id={productName}
        button
        style={styles.listItem}
        onClick={() => handleClickViewDetails(product)}
      >
        <ListItemIcon>
          <img src={image} alt="" style={styles.productImg} />
        </ListItemIcon>
        <ListItemText primary={(
          <div style={styles.textDiv}>
            <span>{productName}</span>
            <span style={styles.productUpc}>{`[${productUPC}]`}</span>
          </div>
        )}
        />
        <ListItemText
          primary={!product.quantityInStock
            ? (<span>Out of stock</span>)
            : ''
          }
          style={styles.priceText}
        />
        <ListItemText
          primary={(
            <FormatCurrency
              amount={salesPrice}
              currency={currency}
            />
          )}
          style={styles.priceText}
        />
      </ListItem>
    </List>
  );
};

SearchList.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  handleClickViewDetails: PropTypes.func.isRequired,
  currency: PropTypes.string.isRequired,
};

export default SearchList;
