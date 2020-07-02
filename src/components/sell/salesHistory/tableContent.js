import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableRow, TableCell, TableBody
} from '@material-ui/core';
import TableHeader from './tableHeader';
import { pointer as styles } from '../../../assets/styles/salesHistory/salesHistoryStyles';

export const TableContent = React.forwardRef(({
  classes,
  columns,
  data,
  handleOnRowClick
}, ref) => (
  <div ref={ref}>
    <Table className={classes.table} aria-labelledby="tableTitle">
      <TableHeader
        headRows={columns}
      />
      <TableBody>
        {data.map((row) => {
          const {
            id, dateSold, timeSold, location, soldBy, receiptId, soldTo,
          } = row;
          return (
            <TableRow
              hover
              role="checkbox"
              tabIndex={-1}
              key={id}
              handleOnRowClick={id}
              onClick={() => {
                handleOnRowClick(id);
              }}
              style={styles}
            >
              <TableCell align="left">{`${dateSold} at ${timeSold}`}</TableCell>
              <TableCell align="left">{location}</TableCell>
              <TableCell align="left">{soldBy}</TableCell>
              <TableCell align="left">{receiptId}</TableCell>
              <TableCell align="left">{soldTo}</TableCell>
            </TableRow>
          );
        })
        }
      </TableBody>
    </Table>
  </div>
));

TableContent.propTypes = {
  classes: PropTypes.instanceOf(Object),
  columns: PropTypes.arrayOf(String),
  data: PropTypes.arrayOf(Object),
  handleOnRowClick: PropTypes.func.isRequired,
};

TableContent.defaultProps = {
  classes: {},
  columns: [],
  data: [],
};

export default TableContent;
