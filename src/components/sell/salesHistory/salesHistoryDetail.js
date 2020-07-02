import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router-dom';
import {
  Button, Grid, Paper, Tooltip, Typography, Zoom,
} from '@material-ui/core';
import {
  ArrowBack, KeyboardArrowLeft, KeyboardArrowRight,
} from '@material-ui/icons';
import {
  BusinessSetUpStyles, MainBusinessSetUpStyles, SetupHeader,
} from '../../../assets/styles/setup';
import { StateContext } from '../../../providers/stateProvider';
import Footer from '../../shared/Footer';
import CreateElements from './saleElements';
import SoldProductsTable from './soldProductsTable';
import receiptImagePlaceHolder from '../../../assets/images/ReceiptTemplate.png';
import formatCurrency from '../../utils/formatCurrency';
import {
  createElementsStyles, saleHistoryStyles,
} from '../../../assets/styles/salesHistory/saleHistoryDetail';
import { NotesIcon } from '../../../assets/SvgIcons/sellScreenSvgs';
import Notes from '../../payment/notesPopOver';
import ReprintReceipt from '../../../containers/reprintReceipt';
import ProcessReturnDialog from '../return/processReturnDialog';
import returnsActionTypes from '../../../providers/reducers/returns/returnsTypes';
import returnStyles from '../../../assets/styles/returns';

export class SalesHistoryDetail extends Component {
  state = {
    active: true,
    isNotesPopperOpen: false,
    anchorEl: {},
    placement: '',
    generateButtonStyle: SetupHeader.disabledSaveButton,
  };

  reducer = Object.values(this.context);

  componentDidMount() {
    const [, dispatch] = this.reducer;
    dispatch({
      type: 'changeGrid',
      grid: 'grid2',
    });
    const {
      saledetailSet, saleHistory: { createdAt }
    } = this.props;
    dispatch({
      type: returnsActionTypes.SET_RETURN_STATE,
      payload: {
        saleDetails: saledetailSet,
        ...this.getDateTime(createdAt),
        toBeReturnedBatches: new Map(),
        aggregatedBatches: new Map(),
        customer: null
      }
    });
  }

  processReturn = () => {
    const [, dispatch] = this.reducer;
    dispatch({
      type: 'TOGGLE_PROCESS_RETURN_DIALOG',
    });
  };

  getDateTime = (createdAt) => {
    const date = new Date(createdAt);
    const timeSold = String(date).slice(16, 21);
    const dateSold = moment(date).format('DD/MM/YYYY');
    return { dateSold, timeSold };
  };

  setInitialData = (data) => {
    const {
      createdAt, salesPerson, receipt, customer, outlet, amountToPay, saledetailSet,
    } = data;

    const newSaleDetailSet = [];
    saledetailSet.map((detail) => {
      detail.note = detail.note || '';
      detail.productName = detail.product.productName;
      newSaleDetailSet.push(detail);
      return 0;
    });
    return ({
      ...data,
      saledetailSet: newSaleDetailSet,
      ...this.getDateTime(createdAt),
      location: `${outlet.name}, ${outlet.city.name}`,
      soldBy: salesPerson
        ? `${salesPerson.firstName} ${salesPerson.lastName}`
        : 'No Record',
      receiptId: receipt ? receipt.receiptNo : 'No Receipt',
      soldTo: customer
        ? `${customer.firstName} ${customer.lastName}`
        : 'No Record',
      amount: amountToPay,
    });
  };

  newFormat = (amount, currency) => (
    <span>
      <span style={createElementsStyles.elementTitle}>{currency}</span>
      {
        formatCurrency({ amount })
      }
    </span>
  );

  totalQtySold = (detailSet) => {
    let totalItems = 0;
    detailSet.forEach((detail) => {
      totalItems += detail.quantity;
    });
    return totalItems;
  };

  handleDisplayNotesPopper = (event) => {
    const { currentTarget } = event;

    this.setState({
      isNotesPopperOpen: true,
      anchorEl: currentTarget,
      placement: 'bottom'
    });
  };

    handleClosePopOver = () => (
      this.setState({
        isNotesPopperOpen: false,
        anchorEl: {},
        placement: ''
      })
    );

    formatData = (rawData) => {
      const { saledetailSet } = rawData;
      const newArray = [];
      for (let index = 0; index < saledetailSet.length;) {
        if (index === 0) {
          newArray.push(saledetailSet[index]);
        } else {
          let elementIndex;
          const duplicateFound = [];
          newArray.map((elem, i) => {
            if (elem.product.productName === saledetailSet[index].product.productName) {
              elementIndex = i;
              duplicateFound.push(saledetailSet[index]);
            }
            return true;
          });

          if (duplicateFound && duplicateFound.length > 0) {
            duplicateFound.map((elem) => {
              newArray[elementIndex].quantity += elem.quantity;
              return true;
            });
          } else {
            newArray.push(saledetailSet[index]);
          }
        }
        index += 1;
      }
      return newArray;
    };

    static contextType = StateContext;

    render() {
      const {
        isNotesPopperOpen, anchorEl,
        placement,
      } = this.state;

      const {
        saleHistory, TotalSaleIds, currentSaleId, history,
      } = this.props;

      saleHistory.receipt = saleHistory.receipt || {
        receiptNo: 'No Receipt',
        cashier: {
          firstName: '-',
        },
      };

      const currentSaleIndex = TotalSaleIds.indexOf(`${currentSaleId}`);
      const nextSaleIndex = currentSaleIndex + 1;
      const previousSaleIndex = (currentSaleIndex - 1 < 0)
        ? 0
        : currentSaleIndex - 1;

      const {
        outlet: {
          outletpreference: {
            outletCurrency: {
              symbol: currency,
            },
          },
        },
      } = saleHistory;

      const saleDetails = this.formatData(saleHistory);
      saleHistory.saledetailSet = saleDetails;

      const salesHistory = this.setInitialData(saleHistory);
      const {
        customer, location, dateSold, timeSold, receiptId, paidAmount, receipt: {
          cashier: { firstName }, subTotal, discountTotal, amountToPay, changeDue, purchaseTotal,
        },
        notes: mainCartNote,
        paymentMethod,
      } = salesHistory;

      const { saledetailSet } = salesHistory;
      const totalQtySold = this.totalQtySold(saledetailSet);
      const elementsList = [
        [
          { title: 'Receipt #', value: receiptId },
          { title: 'Cashier', value: firstName }],
        [
          { title: 'Outlet', value: location },
          { title: 'Register', value: 'Register 1' }],
        [
          {
            title: 'Customer',
            value: customer
              ? `${customer.firstName} ${customer.lastName}`
              : 'None',
          },
          { title: 'End User', value: customer ? 'Customer' : 'other' },
        ],

      ];

      const elementsListTable2 = [
        [{ title: '# Products Sold', value: salesHistory.saledetailSet.length },
          { title: 'Total Qty Sold', value: totalQtySold },
          { title: 'Payment Method', value: paymentMethod }
        ],
        [{ title: 'Subtotal', value: this.newFormat(subTotal, currency) },
          { title: 'Discount total', value: this.newFormat(discountTotal, currency) },
          { title: 'Purchase Total', value: this.newFormat(purchaseTotal, currency) }
        ],
        [{ title: 'Amount to Pay', value: this.newFormat(amountToPay, currency) },
          { title: 'Cash Given', value: this.newFormat(paidAmount, currency) },
          { title: 'Change Due', value: this.newFormat(changeDue, currency) }
        ]

      ];
      return (
        <Fragment>
          <ProcessReturnDialog />
          <Grid style={SetupHeader.adjust}>
            <Grid item xs={1} style={SetupHeader.orderBackBox}>
              <Button name="back-button" style={SetupHeader.backButton}>
                <Link to="/sell/history" style={SetupHeader.link}>
                  <ArrowBack style={SetupHeader.arrowSize} />
                </Link>
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={10} style={SetupHeader.wrapper}>
            <Grid style={MainBusinessSetUpStyles.profileHeader}>
              <Typography variant="h5" style={SetupHeader.backText}>
                Back
              </Typography>
              <Grid style={SetupHeader.orderButtonContainer}>
                <Button style={returnStyles.processButton} onClick={this.processReturn}>
                  PROCESS RETURN
                </Button>
              </Grid>
            </Grid>
            <Paper elevation={2} style={saleHistoryStyles.paperStyles}>
              <Grid item style={BusinessSetUpStyles.contentHeader}>
                <Typography variant="h6">
                  {`${dateSold} ${timeSold} - ${receiptId}`}
                </Typography>
              </Grid>
              <Grid style={saleHistoryStyles.upperPartContainer}>
                <Grid name="left-details" style={saleHistoryStyles.upperPartDetails}>
                  <CreateElements inputElements={elementsList} />
                </Grid>

                <Grid name="receipt" style={saleHistoryStyles.receiptContainer}>
                  <img
                    src={receiptImagePlaceHolder}
                    className="imgPlaceholder"
                    alt="receipt"
                    style={saleHistoryStyles.receiptPlaceholder}
                  />
                  {saleHistory.receipt.id
                    && (<ReprintReceipt salesHistory={salesHistory} />
                    )}
                </Grid>
              </Grid>
              <Grid
                name="separator-1"
                style={saleHistoryStyles.middlePartContainer}
              >
                Item(s) Sold
                <Tooltip title="Show Notes" TransitionComponent={Zoom} id="tool-tip">
                  <NotesIcon
                    id="notesAnchor"
                    style={saleHistoryStyles.notesIcon}
                    onClick={this.handleDisplayNotesPopper}
                  />
                </Tooltip>
              </Grid>
              {
                isNotesPopperOpen && (
                  <Notes
                    anchorEl={anchorEl}
                    placement={placement}
                    products={saledetailSet}
                    mainCartNote={mainCartNote}
                    isNotesPopperOpen={isNotesPopperOpen}
                    handleClosePopOver={this.handleClosePopOver}
                  />
                )
              }
              <Grid style={saleHistoryStyles.middlePartDetails}>
                <SoldProductsTable products={salesHistory.saledetailSet} currency={currency} />
              </Grid>

              <Grid
                name="separator-2"
                style={saleHistoryStyles.lastPartTitle}
              >
                Sale Information
              </Grid>
              <Grid style={saleHistoryStyles.lastPartDetails}>
                <CreateElements inputElements={elementsListTable2} />
              </Grid>
            </Paper>
            <Grid
              className
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Button
                variant="outlined"
                size="large"
                onClick={() => history.push(`/sell/history/${TotalSaleIds[previousSaleIndex]}`)}
                disabled={currentSaleId === Math.max(...TotalSaleIds)}
              >
                <KeyboardArrowLeft style={SetupHeader.arrowSize} />
                Previous Sale
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => history.push(`/sell/history/${TotalSaleIds[nextSaleIndex]}`)}
                disabled={currentSaleId === Math.min(...TotalSaleIds)}
              >
                Next Sale
                <KeyboardArrowRight style={SetupHeader.arrowSize} />
              </Button>
            </Grid>
          </Grid>
          <Footer />
        </Fragment>
      );
    }
}

SalesHistoryDetail.propTypes = {
  saleHistory: PropTypes.objectOf(PropTypes.any).isRequired,
  TotalSaleIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  currentSaleId: PropTypes.number.isRequired,
  saledetailSet: PropTypes.arrayOf(PropTypes.object),
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
};

SalesHistoryDetail.defaultProps = {
  history: {},
};

export default (withRouter(SalesHistoryDetail));
