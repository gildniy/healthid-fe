import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, TableRow, TablePagination, TableCell,
  TableBody, Table
} from '@material-ui/core';
import NoteIcon from '@material-ui/icons/Note';
import CustomCheckbox from '../../../shared/customCheckbox';
import { supplyStyles } from '../../../../assets/styles/suppliers/suppliers';
import RatingStars from '../../../shared/RatingStars';
import TableHeader from '../../../stock_control/Table/TableHeader';
import TableToolBar from './TableToolBar';
import { TableStyles } from '../../../../assets/styles/stock/stock';
import { getSlicedData } from '../../../utils/filter';
import DataTableLoader from '../../../dataTable/dataTableLoader';

export const DataTable = ({
  classes,
  columns,
  data,
  title,
  onRowClick,
  isAdmin,
  status,
  handleViewProposed,
  totalCount,
  handleChangeRowsPerPage,
  handleChangePage,
  rowsPerPage,
  page,
  orderBy,
  order,
  isFiltering,
  handleTextChange,
  searchText,
  handleRequestSort,
  loading,
}) => {
  const [, setAnchorEl] = useState(null);
  const [openPopper, setOpenPopper] = useState(false);
  const [rows, setRows] = useState(data);
  const [, setHoveredItem] = useState({});
  const [selected, setSelected] = useState([]);

  React.useEffect(() => {
    setRows(data);
  }, [data]);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelections = rows.map(product => product.id);
      setSelected(newSelections);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handlePopperClick = (event) => {
    const hoverData = rows.find(value => value.name === event.currentTarget.innerText);

    setAnchorEl(event.currentTarget);
    setHoveredItem(hoverData);
    setOpenPopper(true);
  };

  const handleClickInverseSelection = () => {
    const newSelected = [];

    rows.forEach((row) => {
      if (!selected.find(selectedId => selectedId === row.id)) {
        newSelected.push(row.id);
      }
    });
    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const handleNotes = (notes) => {
    const notesCount = notes.length;
    if (notesCount >= 1) {
      return (<NoteIcon style={supplyStyles.noteStyle} />);
    }
  };

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={classes.paper}>
        <TableToolBar
          name="toolbar"
          isAdmin={isAdmin}
          title={`${status === 'all' ? '' : totalCount} ${title}`}
          numSelected={selected.length}
          handleTextChange={handleTextChange}
          searchText={searchText}
          handleClickDeselectAll={() => {
            setSelected([]);
          }}
          handleClickInverseSelection={() => handleClickInverseSelection()}
          handleViewProposed={handleViewProposed}
        />

        {
          loading ? (<DataTableLoader />)
            : (
              <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <TableHeader
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    headRows={columns}
                  />
                  <TableBody>
                    {rows.length > 0
                      ? getSlicedData(rows, isFiltering, page, rowsPerPage, order, orderBy)
                        .map((row) => {
                          const isItemSelected = isSelected(row.id);
                          const {
                            id, displayName, rating, tier, notes, commentary
                          } = row;
                          return (
                            <TableRow
                              role="checkbox"
                              aria-checked={isItemSelected}
                              tabIndex={-1}
                              key={id}
                              style={supplyStyles.tableRow}
                              selected={isItemSelected}
                              onClick={() => {
                                onRowClick(id);
                              }}
                            >
                              <TableCell padding="checkbox">
                                <CustomCheckbox
                                  style={{ marginLeft: '1.2rem' }}
                                  checked={isItemSelected}
                                  onClick={(event) => {
                                    event.stopPropagation();
                                    handleClick(event, id);
                                  }}
                                />
                              </TableCell>
                              <TableCell align="left">{id}</TableCell>
                              <TableCell align="left">
                                <span
                                  onMouseEnter={(event) => {
                                    event.stopPropagation();
                                    handlePopperClick(event);
                                  }}
                                  onMouseLeave={(event) => {
                                    event.stopPropagation();
                                    setOpenPopper(!openPopper);
                                  }}
                                  className={classes.name}
                                >
                                  {displayName}
                                </span>
                              </TableCell>
                              <TableCell align="left">{tier}</TableCell>
                              {
                                status === 'proposed' && (<TableCell align="left">{commentary === 'Null' ? 'no comment' : commentary}</TableCell>)
                              }
                              {
                                status !== 'proposed' && (<TableCell align="left"><RatingStars rating={rating} /></TableCell>)
                              }
                              {
                                status !== 'proposed' && (<TableCell align="left">{handleNotes(notes)}</TableCell>)
                              }
                            </TableRow>
                          );
                        }) : (<TableRow><TableCell align="center" colSpan={6}>No Suppliers</TableCell></TableRow>)
                    }
                  </TableBody>
                </Table>
              </div>

            )
        }
        {/* Pagination for the table */}

        <TablePagination
          rowsPerPageOptions={[50, 100, 250, 500]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Use popper here, and also view detail */}
    </div>
  );
};

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  columns: PropTypes.arrayOf(String).isRequired,
  data: PropTypes.arrayOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  handleViewProposed: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  searchText: PropTypes.string,
  isFiltering: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
};
DataTable.defaultProps = {
  searchText: ''
};

export default withStyles(TableStyles)(DataTable);
