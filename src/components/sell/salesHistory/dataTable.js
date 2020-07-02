import React from 'react';
import PropTypes from 'prop-types';
import { TablePagination } from '@material-ui/core';
import { format } from 'date-fns';
import SalesHistoryToolBar from './salesHistoryToolBar';
import TableContent from './tableContent';
import saleHistoryActionTypes from '../../../providers/reducers/saleHistory/saleHistoryTypes';

import { useStateValue } from '../../../providers/stateProvider';

export const DataTable = ({
  title, columns, handleResetSales, handleOnRowClick
}) => {
  const [{
    saleHistory: {
      salesData, totalNumberOfSales, currentPage, currentPageCount
    }
  }, dispatch] = Object.values(useStateValue());
  const data = salesData.map(({
    id, dateSold, timeSold, location, soldBy, receiptId, soldTo
  }) => (
    {
      id,
      dateSold: format(dateSold, 'dd/MM/yyyy'),
      timeSold,
      location,
      soldBy,
      receiptId,
      soldTo
    }
  ));

  const handleChangePage = (_, newPage) => {
    dispatch({
      type: saleHistoryActionTypes.SET_SALE_HISTORY_STATE,
      payload: { currentPage: newPage + 1 }
    });
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch({
      type: saleHistoryActionTypes.SET_SALE_HISTORY_STATE,
      payload: { currentPageCount: +event.target.value }
    });
  };

  const componentRef = React.createRef();

  return (
    <>
      <SalesHistoryToolBar
        title={title}
        rows={data}
        handleResetSales={handleResetSales}
        componentRef={componentRef}
      />
      <TableContent
        ref={componentRef}
        columns={columns}
        data={data}
        handleOnRowClick={handleOnRowClick}
      />
      <TablePagination
        rowsPerPageOptions={[50, 100, 200]}
        component="div"
        count={totalNumberOfSales}
        rowsPerPage={currentPageCount}
        page={currentPage - 1}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(String),
  title: PropTypes.string.isRequired,
  handleResetSales: PropTypes.func.isRequired,
  handleOnRowClick: PropTypes.func.isRequired,
};

DataTable.defaultProps = {
  columns: [],
};

export default DataTable;
