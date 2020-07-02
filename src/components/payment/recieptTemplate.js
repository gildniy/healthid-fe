import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Typography, Divider, TableRow, TableCell,
  TableBody, Table, TableHead
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import currencyFormatter from './utils/formatter';
import dateFormatter from './utils/dateFormatter';
import RecieptProductList from './recieptProductList';
import salesDialogStyles from '../../assets/css/salesDialogStyles';
import { receiptTemplateStyle } from '../../assets/css/receiptTemplateStyle';
import { OutletContactInfo } from '../../utils/receipt/OutletContactInfo';

export class RecieptTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.formattedDate = dateFormatter(new Date());
  }

  render() {
    const {
      me,
      products,
      computedSubTotal,
      computedTotal,
      computedDiscount,
      cashRecieved,
      balanceDue,
      barcodeUrl,
      receiptNo,
      registerID,
      tradingName,
      country,
      city,
      outletContactInfo,
      addressLine1,
      phoneNumber,
      currency,
      classes,
      cashCollected,
      cardCollected,
      transferCollected,
      changeDue
    } = this.props;

    const cashierToday = me.firstName ? me.firstName : me.lastName;
    return (
      <div id="main-div" style={salesDialogStyles.reciepttemplateMainDiv}>
        <Grid
          container
          style={salesDialogStyles.reciepttemplateGridContainer}
        >
          <Grid item container xs={12} direction="column">
            <Typography
              align="center"
              variant="overline"
              style={salesDialogStyles.businessName}
            >
              {tradingName}
            </Typography>
            <Typography
              align="center"
              variant="overline"
              style={salesDialogStyles.address}
            >
              {outletContactInfo.address_line1 || outletContactInfo.address_line2 || addressLine1}
            </Typography>
            <Typography
              align="center"
              variant="overline"
              style={salesDialogStyles.address}
            >
              {`${city}, ${country}`}
            </Typography>
            <Typography
              align="center"
              variant="caption"
              style={salesDialogStyles.address}
            >
              {`${'Telephone:'} ${outletContactInfo.phone_number || phoneNumber}`}
            </Typography>
          </Grid>
          <div className="table-content" style={salesDialogStyles.tableDiv}>
            <Divider variant="fullWidth" />
            <Table>
              <TableHead>
                <TableRow className={classes.receiptNoTitleRow}>
                  <TableCell
                    align="left"
                    size="small"
                    colSpan={2}
                    className={classes.receiptNoTitle}
                  >
                    {`RECEIPT ${receiptNo}`}
                  </TableCell>
                  <TableCell
                    align="right"
                    size="small"
                    colSpan={2}
                    className={classes.receiptNoTitle}
                  >
                    {this.formattedDate}
                  </TableCell>
                </TableRow>

                <TableRow className={classes.receiptTopSketcherRow}>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map(product => (
                  <RecieptProductList
                    key={product.productName}
                    product={product}
                    classes={classes}
                  />
                ))}
                <TableRow className={classes.receiptBottomSketcherRow}>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>

                <TableRow className={classes.receiptTopSketcherRow}>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>

                <TableRow className={classes.noBorderRow}>
                  <TableCell />
                  <TableCell
                    size="small"
                    colSpan={2}
                    className={classes.receiptBody}
                  >
                    SUB TOTAL
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    className={classes.receiptBody}
                  >
                    <span className={classes.currencySpan}>
                      {currency}
                      {' '}
                    </span>
                    {computedSubTotal}
                  </TableCell>
                </TableRow>

                <TableRow className={classes.noBorderRow}>
                  <TableCell />
                  <TableCell
                    size="small"
                    colSpan={2}
                    className={classes.receiptBody}
                  >
                    DISCOUNT TOTAL
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    className={classes.receiptBody}
                  >
                    <span className={classes.currencySpan}>
                      {currency}
                      {' '}
                    </span>
                    {computedDiscount}
                  </TableCell>
                </TableRow>

                <TableRow className={classes.borderedRow}>
                  <TableCell />
                  <TableCell
                    size="small"
                    colSpan={2}
                    className={classes.receiptBody}
                  >
                    PURCHASE TOTAL
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    className={classes.receiptBodyCash}
                  >
                    <span className={classes.currencySpan}>
                      {currency}
                      {' '}
                    </span>
                    {computedTotal}
                  </TableCell>
                </TableRow>

                <TableRow className={classes.borderedRow}>
                  <TableCell />
                  <TableCell
                    size="small"
                    colSpan={2}
                    className={classes.subTotalBolder}
                  >
                    AMOUNT TO PAY (inclu: VAT)
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    className={classes.subTotalBolderCash}
                  >
                    <span className={classes.currencySpan}>
                      {currency}
                      {' '}
                    </span>
                    {computedTotal}
                  </TableCell>
                </TableRow>

                {
                  cashCollected > 0 && (
                    <TableRow className={classes.noBorderRow}>
                      <TableCell />
                      <TableCell
                        size="small"
                        colSpan={2}
                        className={classes.receiptBody}
                      >
                        CASH
                      </TableCell>
                      <TableCell
                        size="small"
                        align="right"
                        className={classes.receiptBody}
                      >
                        <span className={classes.currencySpan}>
                          {currency}
                          {' '}
                        </span>
                        {currencyFormatter(cashCollected)}
                      </TableCell>
                    </TableRow>
                  )
                }

                {
                  cardCollected > 0 && (
                    <TableRow className={classes.noBorderRow}>
                      <TableCell />
                      <TableCell
                        size="small"
                        colSpan={2}
                        className={classes.receiptBody}
                      >
                        CARD (POS)
                      </TableCell>
                      <TableCell
                        size="small"
                        align="right"
                        className={classes.receiptBody}
                      >
                        <span className={classes.currencySpan}>
                          {currency}
                          {' '}
                        </span>
                        {currencyFormatter(cardCollected)}
                      </TableCell>
                    </TableRow>
                  )
                }

                {
                  transferCollected > 0 && (
                    <TableRow className={classes.noBorderRow}>
                      <TableCell />
                      <TableCell
                        size="small"
                        colSpan={2}
                        className={classes.receiptBody}
                      >
                        BANK TRANSFER
                      </TableCell>
                      <TableCell
                        size="small"
                        align="right"
                        className={classes.receiptBody}
                      >
                        <span className={classes.currencySpan}>
                          {currency}
                          {' '}
                        </span>
                        {currencyFormatter(transferCollected)}
                      </TableCell>
                    </TableRow>
                  )
                }

                <TableRow className={classes.noBorderRow}>
                  <TableCell />
                  <TableCell
                    size="small"
                    colSpan={2}
                    className={classes.subTotalBolder}
                  >
                    CHANGE DUE
                  </TableCell>
                  <TableCell
                    size="small"
                    align="right"
                    className={classes.subTotalBolderCash}
                  >
                    <span className={classes.currencySpan}>
                      {currency}
                      {' '}
                    </span>
                    {currencyFormatter(changeDue)}
                  </TableCell>
                </TableRow>

                <TableRow className={classes.receiptBottomSketcherRow}>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>

                <TableRow className={classes.receiptNoTitleRow}>
                  <TableCell
                    align="left"
                    size="small"
                    colSpan={2}
                    className={classes.receiptNoTitle}
                  >
                    {`Your Cashier Today: ${cashierToday}`}
                  </TableCell>
                  <TableCell
                    align="right"
                    size="small"
                    colSpan={2}
                    className={classes.receiptNoTitle}
                  >
                    {registerID ? `${'Register #'} ${registerID}` : ''}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <Grid item xs={12} style={salesDialogStyles.barcodeGrid}>
            <div style={salesDialogStyles.barcodeDiv}>
              <img
                src={barcodeUrl}
                alt="barcode missing"
                style={salesDialogStyles.barcodeImage}
              />
            </div>
            <Typography
              align="center"
              variant="caption"
              style={salesDialogStyles.thanksText}
            >
              Thank you for shopping with us. Please come again
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

RecieptTemplate.propTypes = {
  me: PropTypes.instanceOf(Object).isRequired,
  products: PropTypes.arrayOf(Object).isRequired,
  computedSubTotal: PropTypes.string.isRequired,
  computedTotal: PropTypes.string.isRequired,
  computedDiscount: PropTypes.string.isRequired,
  cashRecieved: PropTypes.number.isRequired,
  balanceDue: PropTypes.number.isRequired,
  barcodeUrl: PropTypes.string.isRequired,
  receiptNo: PropTypes.string.isRequired,
  registerID: PropTypes.string,
  tradingName: PropTypes.string.isRequired,
  outletContactInfo: PropTypes.instanceOf(OutletContactInfo).isRequired,
  addressLine1: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  currency: PropTypes.string,
  classes: PropTypes.instanceOf(Object),
};

RecieptTemplate.defaultProps = {
  registerID: '',
  currency: '',
  classes: {},
};


export default withStyles(receiptTemplateStyle)(RecieptTemplate);
