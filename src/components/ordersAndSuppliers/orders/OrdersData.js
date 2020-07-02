import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Paper,
  TablePagination,
} from '@material-ui/core';
import TableToolBar from '../../products/Templates/Table/OrderToolBar';
import { TableStyles } from '../../../assets/styles/stock/stock';
import DataTableLoader from '../../dataTable/dataTableLoader';
import OrdersTable from '../../dataTable';

export class DataTable extends Component {
  state = {
    selected: [],
    data: [],
    rows: [],
    isSearching: false,
    order: 'asc',
    orderBy: 'date',
  }

  static getDerivedStateFromProps(props, state) {
    if (state.isSearching) {
      return null;
    }
    return { data: props.data, rows: props.data };
  }

  isSelected = (name) => {
    const { selected } = this.state;
    return selected.indexOf(name) !== -1;
  };

  handleRowSeleted = (_, id) => {
    const { selected } = this.state;
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
    this.setState({ selected: newSelected });
  };

  handleHideSearch = () => {
    this.setState({ isSearchActive: false });
  }

  handleClickSearch = () => {
    const { isSearchActive } = this.state;
    this.setState({ isSearchActive: !isSearchActive });
  }

  handleRequestSort = (_, property) => {
    const { order, orderBy } = this.state;
    const isDesc = orderBy === property && order === 'desc';
    this.setState({ order: isDesc ? 'asc' : 'desc', orderBy: property });
  };

  handleSelectAllClick = (event) => {
    const { rows } = this.state;
    if (event.target.checked) {
      const newSelections = rows.map(product => product.id);
      this.setState({ selected: newSelections });
      return;
    }
    this.setState({ selected: [] });
  };

  render() {
    const {
      classes,
      title,
      onRowClick,
      isAdmin,
      status,
      handleViewOrders,
      currentPath,
      handleChangeRowsPerPage,
      totalCount,
      client,
      handleChangePage,
      pageNumber,
      rowsCount,
      handleSearch,
      loading,
      session,
      history,
      orderStatuses
    } = this.props;
    const {
      selected,
      rows,
      order,
      orderBy
    } = this.state;

    const componentRef = React.createRef();
    return (
      <div>
        <Paper elevation={2} className={classes.paper}>
          <TableToolBar
            name="toolbar"
            history={history}
            isAdmin={isAdmin}
            title={`${title}`}
            status={status}
            popperHeader={title}
            numSelected={selected.length}
            client={client}
            handleSearchTextChange={e => handleSearch(e, client)}
            handleViewOrders={handleViewOrders}
            currentPath={currentPath}
            session={session}
            orderStatuses={orderStatuses}
            componentRef={componentRef}
          />
          {
            loading ? (<DataTableLoader />)
              : (
                <OrdersTable
                  handleRequestSort={this.handleRequestSort}
                  classes={classes}
                  orderBy={orderBy}
                  selected={selected}
                  handleSelectAllClick={this.handleSelectAllClick}
                  rows={rows}
                  order={order}
                  status={status}
                  handleRowSeleted={this.handleRowSeleted}
                  ref={componentRef}
                  isSelected={this.isSelected}
                  onRowClick={onRowClick}
                />
              )
          }

          <TablePagination
            rowsPerPageOptions={[50, 100, 250, 500]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsCount}
            page={pageNumber - 1}
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
      </div>
    );
  }
}

DataTable.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  title: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  onRowClick: PropTypes.func.isRequired,
  handleViewOrders: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  totalCount: PropTypes.number.isRequired,
  pageNumber: PropTypes.number.isRequired,
  rowsCount: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  client: PropTypes.instanceOf(Object).isRequired,
  session: PropTypes.objectOf(PropTypes.object).isRequired,
  currentPath: PropTypes.string.isRequired,
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
  orderStatuses: PropTypes.instanceOf(Object).isRequired
};

DataTable.defaultProps = {
  history: {},
};

export default withStyles(TableStyles)(DataTable);
