import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import SalesHistoryDetails from '../components/sell/salesHistory/salesHistoryDetails';
import currencyFormatter from '../components/payment/utils/formatter';
import saleHistoryActionTypes from '../providers/reducers/saleHistory/saleHistoryTypes';

import { useStateValue } from '../providers/stateProvider';

export const SalesHistory = ({
  outletSalesData,
  history,
  currency,
}) => {
  const [{
    saleHistory: {
      salesData, initialData, totalNumberOfSales: totalSalesCount
    }
  }, dispatch] = Object.values(useStateValue());

  const setInitialData = (initialOutletSalesData) => {
    const { outletSalesHistory, totalNumberOfSales } = initialOutletSalesData;
    const salesInfo = outletSalesHistory.map(({
      id, createdAt, salesPerson, receipt, customer, outlet, amountToPay,
      paymentMethod, saledetailSet, splitPayments
    }) => {
      const date = new Date(createdAt);
      const timeSold = String(date).slice(16, 21);
      const dateSold = date;
      dateSold.setHours(0, 0, 0, 0);
      return ({
        id,
        dateSold,
        timeSold,
        location: `${outlet.name}, ${outlet.city.name} | Register 1`,
        soldBy: salesPerson ? `${salesPerson.firstName} ${salesPerson.lastName}` : 'No Record',
        receiptId: receipt ? receipt.receiptNo : 'No Record',
        soldTo: customer ? `${customer.firstName || ''} ${customer.lastName || ''}` : 'No Record',
        amount: amountToPay,
        paymentMethod,
        saledetailSet,
        splitPayments
      });
    });
    dispatch({
      type: saleHistoryActionTypes.SET_SALE_HISTORY_STATE,
      payload: {
        salesData: salesInfo, initialData: salesInfo, totalNumberOfSales
      }
    });
  };

  const returnTotals = mode => (
    salesData && salesData.filter(
      ({ paymentMethod }) => paymentMethod === mode
    ).map(({ amount }) => amount).reduce((sum, i) => sum + i, 0)
  );

  const returnSplitTotals = mode => (
    salesData && salesData.filter(
      ({ paymentMethod }) => paymentMethod === 'SPLIT'
    ).map(({ splitPayments }) => splitPayments)
      .flat()
      .filter(({ paymentMethod }) => paymentMethod === mode)
      .map(({ amount }) => amount)
      .reduce((sum, i) => sum + i, 0)
  );

  const getTotals = mode => (
    returnTotals(mode) + returnSplitTotals(mode)
  );
  const setTotals = () => {
    const totalSaleAmount = salesData && salesData.map(({ amount }) => amount)
      .reduce((sum, i) => sum + i, 0);

    const totalCash = getTotals('CASH');
    const totalCard = getTotals('CARD');
    const totalByBankTransfer = getTotals('BANK_TRANSFER');

    const saleDetails = [];
    salesData && salesData.map(
      ({ saledetailSet }) => saledetailSet.map(
        saleDetail => saleDetails.push(saleDetail)
      )
    );

    const totalProductsQuantity = saleDetails.map(({ quantity }) => quantity)
      .reduce((sum, i) => sum + i, 0);

    const totalProducts = saleDetails.map(
      ({ product }) => product.id
    ).filter(
      (elem, index, self) => index === self.indexOf(elem)
    ).length;

    const formatMoney = value => (
      `${currency} ${currencyFormatter(value)}`
    );

    const totalsArray = [
      {
        title: 'Total Product(s) Sold',
        value: totalProducts
      },
      {
        title: 'Total Product(s) Qty Sold',
        value: totalProductsQuantity
      },
      {
        title: 'Amount in Cash',
        value: formatMoney(totalCash)
      },
      {
        title: 'Amount in Card',
        value: formatMoney(totalCard)
      },
      {
        title: 'Amount in Bank Transfer',
        value: formatMoney(totalByBankTransfer)
      },
      {
        title: 'Sale Amount',
        value: formatMoney(totalSaleAmount)
      },
    ];

    dispatch({
      type: saleHistoryActionTypes.SET_SALE_HISTORY_STATE,
      payload: { totals: totalsArray }
    });
  };

  React.useEffect(() => {
    dispatch({
      type: 'changeGrid',
      grid: 'grid2'
    });
    setInitialData(outletSalesData);
  }, []);

  React.useEffect(() => {
    setTotals();
  }, [salesData]);

  const handleResetSales = () => {
    const today = moment().set({
      hour: 6, minute: 0, second: 0, millisecond: 0
    });
    dispatch({
      type: saleHistoryActionTypes.SET_SALE_HISTORY_STATE,
      payload: {
        startDate: today,
        endDate: moment(),
      }
    });
  };

  const handleOnRowClick = (id) => {
    history.push(`/sell/history/${id}`);
  };

  const createColumns = headers => headers.map(header => ({
    id: header.replace(/ +/g, ''),
    label: header.toUpperCase()
  }));

  const title = `${totalSalesCount} SALES`;

  return initialData && (
    <Fragment>
      <SalesHistoryDetails
        title={title}
        createColumns={createColumns}
        handleResetSales={handleResetSales}
        handleOnRowClick={handleOnRowClick}
      />
    </Fragment>
  );
};

SalesHistory.propTypes = {
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.number]),
  outletSalesData: PropTypes.objectOf(PropTypes.any),
  currency: PropTypes.string,
};

SalesHistory.defaultProps = {
  history: {},
  outletSalesData: [],
  currency: '₦',
};

export default withRouter(SalesHistory);
