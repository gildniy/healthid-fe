import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

const User = ({ data, role }) => (
  <Table>
    <TableBody>
      {
        data.map(
          user => (
            <TableRow key={user.email}>
              <TableCell>{user.username}</TableCell>
              <TableCell align="center">{role === 'Manager' || role === 'Master Admin' ? user.email : ''}</TableCell>
              <TableCell align="right">{user.role.name}</TableCell>
            </TableRow>
          )
        )
      }
    </TableBody>
  </Table>
);

User.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  role: PropTypes.string
};

User.defaultProps = {
  data: [],
  role: ''
};

export default User;
