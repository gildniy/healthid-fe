import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TableRow,
  TablePagination,
  TableCell,
  TableBody,
  Table,
  TableHead,
  IconButton
} from '@material-ui/core';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { TableStyles } from '../../../assets/styles/stock/stock';
import versionStyles, { VersionsTableStyles } from '../../../assets/styles/suppliers/versionStyles';
import DataTableLoader from '../../dataTable/dataTableLoader';

export const DataTable = ({
  classes,
  toggleDialogView,
  loading,
  data,
  numberOfVersions,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage
}) => {
  if (loading) return (<DataTableLoader />);
  return (
    <>
      <div className={classes.tableWrapper}>
        <Table className={classes.table} aria-labelledby="tableTitle">
          <TableHead>
            <TableRow>
              <TableCell className={classes.iconHeader} />
              <TableCell className={classes.header} style={{ paddingLeft: 0 }}>
                SUPPLIER VERSION
              </TableCell>
              <TableCell className={classes.header}>
                STATUS
              </TableCell>
              <TableCell className={classes.header}>
                EDITED BY
              </TableCell>
              <TableCell className={classes.header}>
                APPROVED BY
              </TableCell>
              <TableCell className={classes.iconHeader} />
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((edit, index) => (
              <TableRow
                className={classes.versionRow}
              >
                <TableCell className={classes.iconCell}>
                  <div style={versionStyles[edit.isActive ? 'green' : 'red']} />
                </TableCell>
                <TableCell className={classes.cell} style={{ paddingLeft: 0 }}>
                  {edit.submitTime}
                </TableCell>
                <TableCell className={classes.cell} style={versionStyles.maroon}>
                  {edit.status}
                </TableCell>
                <TableCell className={classes.cell}>
                  {edit.proposedBy}
                </TableCell>
                <TableCell className={classes.cell} style={versionStyles.maroon}>
                  {edit.approvedBy}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton onClick={() => toggleDialogView(index)}>
                    <KeyboardArrowRight fontSize="large" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        component="div"
        count={numberOfVersions}
        rowsPerPage={rowsPerPage}
        page={page - 1}
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
  classes: PropTypes.instanceOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  toggleDialogView: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  numberOfVersions: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export default withStyles({ ...TableStyles, ...VersionsTableStyles })(DataTable);
