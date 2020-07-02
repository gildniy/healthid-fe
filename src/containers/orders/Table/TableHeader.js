import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TableSortLabel, TableRow, TableHead, TableCell
} from '@material-ui/core';

import sortAscendingIcon from '../../../assets/images/stock/sort_ascending_icon.png';
import sortDescendingIcon from '../../../assets/images/stock/sort_descending_icon.png';
import stockControlStyles, { TableHeaderStyles } from '../../../assets/styles/stock/stock';
import CustomCheckbox from '../../../components/shared/customCheckbox';

export const TableHeader = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  columnHeaders,
  classes
}) => {
  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  };

  const renderSortIcon = (sortType) => {
    if (sortType === 'asc') {
      return (
        <img
          src={sortAscendingIcon}
          alt="sort"
          style={stockControlStyles.sortImage}
        />
      );
    }
    if (sortType === 'desc') {
      return (
        <img
          src={sortDescendingIcon}
          alt="sort"
          style={stockControlStyles.sortImage}
        />
      );
    }
    return <span />;
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell className={classes.headerWrapper} padding="checkbox" align="center">
          <CustomCheckbox
            className={classes.checkbox}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {columnHeaders.map(columnHeader => (
          <TableCell
            className={classes.headerWrapper}
            key={columnHeader.id}
            align="left"
            sortDirection={orderBy === columnHeader.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === columnHeader.id}
              direction={order}
              onClick={createSortHandler(columnHeader.id)}
              hideSortIcon
              IconComponent={() => renderSortIcon(order)}
            >
              {columnHeader.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columnHeaders: PropTypes.arrayOf(String).isRequired
};

export default withStyles(TableHeaderStyles)(TableHeader);
