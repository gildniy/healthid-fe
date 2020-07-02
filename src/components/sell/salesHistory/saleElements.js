import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Grid
} from '@material-ui/core';
import { createElementsStyles } from '../../../assets/styles/salesHistory/saleHistoryDetail';

const CreateElements = ({ inputElements }) => (
  <Table aria-label="simple table">
    <TableBody>
      {
        inputElements.map(inputElement => (
          <TableRow key={inputElement.id} style={createElementsStyles.rowStyles}>
            {
              inputElement.map(element => (
                <TableCell key={element.id} style={createElementsStyles.cellStyles} component="th" scope="row">
                  <Grid style={createElementsStyles.elementContainer}>
                    <Typography style={createElementsStyles.title}>
                      {element.title}
                    </Typography>
                    <Typography style={createElementsStyles.elementContent}>
                      {element.value}
                    </Typography>
                  </Grid>
                </TableCell>
              ))
            }
          </TableRow>
        ))}
    </TableBody>
  </Table>
);

CreateElements.propTypes = {
  inputElements: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default CreateElements;
