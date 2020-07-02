import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { withRouter, Link } from 'react-router-dom';
import {
  Paper, withStyles, TableCell, CircularProgress
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { productDetailStyles } from '../../../assets/styles/products/productDetailStyles';
import APPROVE_PROPOSED_EDITS from '../../../mutations/approveProposedEdits';
import withAuth from '../../withAuth';
import Footer from '../../shared/Footer';
import notify from '../../shared/Toaster';
import Description from '../Templates/Description';
import ProductInformation from '../Templates/ProductInformation';
import ProductHeader from '../Templates/Header';
import RenderDescriptionField from '../Templates/renderDescriptionField';
import RenderTextField from '../Templates/RenderTextField';
import StockDetails from '../Templates/StockDetails';
import BatchInformation from '../Templates/BatchInformation';

import { StateContext } from '../../../providers/stateProvider';

export class ApproveProposedEdits extends Component {
  state = {
    approving: false
  }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid3'
    });
  }

  renderTableCell = (align, style, name) => (
    <TableCell
      align={align}
      style={style}
    >
      {name}
    </TableCell>
  );

  handleEditApproval = async () => {
    this.setState({
      approving: true
    });
    const { approveEdits, edit, history } = this.props;
    const { id: editRequestId, parent: { id: productId } } = edit;
    try {
      await approveEdits({
        variables: { editRequestId, productId }
      });
      this.setState({
        approving: false
      });
      notify('Edits approved successfully');
      history.push('/products/proposed-edits');
    } catch (error) {
      this.setState({
        approving: false
      });
      notify(error.message);
    }
  }

  priceColumn = (quantity, unitCost) => quantity * unitCost;

  createRow = ({
    id, batchNo, dateReceived, supplier, expiryDate, quantity, unitCost
  }) => {
    const price = this.priceColumn(quantity, unitCost);
    return {
      id, batchNo, dateReceived, supplier, expiryDate, quantity, unitCost, price
    };
  };

  AddPriceField = batchArray => batchArray.map(batch => this.createRow(batch));

  subtotal = items => items.map(
    ({ price }) => price
  ).reduce((sum, i) => sum + i, 0);

  static contextType = StateContext;

  render() {
    const { approving } = this.state;
    const {
      edit,
      classes,
      session
    } = this.props;
    const { me: { role: { name } } } = session;

    const {
      id,
      productName,
      skuNumber,
      description,
      manufacturer,
      productCategory,
      dispensingSize,
      image,
      brand,
      vatStatus,
      preferredSupplier,
      loyaltyWeight,
      backupSupplier,
      tags,
      isApproved,
      business,
      salesPrice,
      quantityInStock,
      reorderMax,
      reorderPoint,
      nearestExpiryDate,
      parent: {
        batchInfo,
      }
    } = edit;
    const withPriceField = this.AddPriceField(batchInfo);
    const currency = business.outletSet[0].outletpreference.outletCurrency.symbol;
    const quantityTotal = pricedArray => pricedArray.map(
      ({ quantity }) => quantity
    ).reduce((sum, i) => sum + i, 0);
    const priceTotal = pricedArray => this.subtotal(pricedArray);
    return (
      <>
        <ProductHeader classes={classes} previousPage="/products/proposed-edits" productName={productName} title="Back to Edits">
          <Link style={{ textDecoration: 'none' }} to="/products/proposed-edits">
            <Button variant="contained" color="primary" className={classes.editProposedButton}>
              Edits
            </Button>
          </Link>
          <Button
            name="approve"
            disabled={isApproved || name !== 'Master Admin'}
            variant="contained"
            className={classes.approveEditButton}
            onClick={this.handleEditApproval}
          >
            {
              approving ? <CircularProgress size={26} /> : 'Approve'
            }
          </Button>
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
            renderTableCell={this.renderTableCell}
            withPriceField={withPriceField}
            skuNumber={skuNumber}
            manufacturer={manufacturer}
            currency={currency}
            quantityTotal={quantityTotal}
            priceTotal={priceTotal}
          />
        </Paper>
        <Footer />
      </>
    );
  }
}

ApproveProposedEdits.propTypes = {
  edit: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.function),
  approveEdits: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string),
  session: PropTypes.objectOf(PropTypes.any).isRequired,
};

ApproveProposedEdits.defaultProps = {
  classes: {},
  history: {}
};

const APPROVE_EDITS = graphql(APPROVE_PROPOSED_EDITS, { name: 'approveEdits' });

export default compose(
  APPROVE_EDITS
)(withAuth(withRouter(withStyles(productDetailStyles)(ApproveProposedEdits))));
