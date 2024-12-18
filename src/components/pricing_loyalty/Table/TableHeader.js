import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TableSortLabel, TableRow, TableHead, TableCell
} from '@material-ui/core';
import sortAscendingIcon from '../../../assets/images/stock/sort_ascending_icon.png';
import sortDescendingIcon from '../../../assets/images/stock/sort_descending_icon.png';
import stockControlStyles, { TableHeaderStyles } from '../../../assets/styles/stock/stock';
import CustomCheckbox from '../../shared/customCheckbox';

const TableHeader = ({
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
  headRows,
  classes
}) => {
  const createSortHandler = property => (event) => {
    onRequestSort(event, property);
  };

  const renderSortIcon = (sortType) => {
    if (sortType === 'asc') {
      return (
        <img
          className="sort_icons"
          src={sortAscendingIcon}
          alt="sort"
          style={stockControlStyles.sortImage}
        />
      );
    }
    if (sortType === 'desc') {
      return (
        <img
          className="sort_icons"
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
            style={{ marginLeft: '1.2rem' }}
            checked={numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headRows.map(row => (
          <TableCell
            className={classes.headerWrapper}
            key={row.id}
            align="left"
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={createSortHandler(row.id)}
              hideSortIcon
              IconComponent={() => renderSortIcon(order)}
            >
              {row.label}
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
  headRows: PropTypes.arrayOf(String).isRequired
};

export default withStyles(TableHeaderStyles)(TableHeader);
