import React, { Fragment, useEffect, useState } from 'react';
import PropType from 'prop-types';
import {
  Grid, Typography, Tooltip, IconButton, Paper, TableBody, TableCell,
  TableRow, Table
} from '@material-ui/core';
import { compose, graphql } from 'react-apollo';
import { Edit, Delete, Add } from '@material-ui/icons';
import { tableStyles } from '../../../../assets/styles/suppliers/supplierDetail';
import notify from '../../../shared/Toaster';
import Loader from '../../../shared/Loader';
import { DELETE_REGISTER } from '../../../../mutations/setup/outlets/deleteRegister';
import CREATE_REGISTER from '../../../../mutations/createRegisterMutation';

const RegistersTemplate = ({
  classes, registers, renderTextField, outlet, createRegister,
  deleteRegister, outletRefetch
}) => {
  const [hoverId, setHover] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleOnRowHover = async (event) => {
    const value = event.currentTarget.id;
    setHover(value);
  };

  const handleMouseLeave = () => {
    if (hoverId) {
      setHover('');
    }
  };

  const handleAddRegister = () => {
    setSubmitting(true);
    const registerNameBase = outlet.outletRegister[0].name.split(' ').slice(0, -1).join(' ');
    createRegister({
      variables: {
        name: registerNameBase,
        number: 1,
        outletId: parseInt(outlet.id, 10),
      }
    })
      .then(() => {
        notify('Register added successfully');
        setSubmitting(false);
      })
      .catch((err) => {
        notify(`${err.message}`);
        setSubmitting(false);
      });
  };

  const handleDeleteRegister = (registerId) => {
    setSubmitting(true);
    deleteRegister({
      variables: {
        id: parseInt(registerId, 10)
      }
    })
      .then(() => {
        notify('Register deleted successfully');
        setSubmitting(false);
        outletRefetch();
      })
      .catch((err) => {
        notify(`${err.message}`);
        setSubmitting(true);
      });
  };

  const handleEditRegister = () => {
    notify('Not Implemented Yet');
  };
  return (
    <Fragment>
      <div className={classes.dividerDiv}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography paragraph align="left" gutterBottom className={classes.dividerHeaders}>
              Registers
            </Typography>
          </Grid>
          <Grid item>
            {submitting ? (
              <Loader />
            ) : (
              <Tooltip title="Add Register">
                <IconButton
                  className={classes.notesButton}
                  aria-owns="menu-list-grow"
                  aria-haspopup="true"
                  onClick={handleAddRegister}
                >
                  <Add />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={24} className={classes.containerGrid}>
        <Grid container spacing={8} className={classes.tableGrid} style={{ borderBottom: 'none !important', marginBottom: '15px' }}>
          {
            (registers && registers.length > 0) ? (
              <Grid item xs={12} style={tableStyles.noteHeader}>
                <Paper elevation={2} className={tableStyles.root}>
                  <Table className={tableStyles.table}>
                    <TableBody>
                      {/* eslint-disable-next-line array-callback-return */}
                      {registers.length && registers.map((register) => {
                        if (!register.deletedAt) {
                          return (
                            <TableRow
                              hover
                              id={register.id}
                              key={register.id}
                              onMouseEnter={event => handleOnRowHover(event)}
                              onMouseLeave={handleMouseLeave}
                            >
                              <TableCell style={tableStyles.cellLeft}>
                                {renderTextField(
                                  classes.descriptionFields, 'registerName ',
                                  'Register Name', register.name,
                                )}
                              </TableCell>
                              <TableCell style={tableStyles.cell}>
                                {renderTextField(
                                  classes.descriptionFields, 'registerName ',
                                  'Register ID', register.id,
                                )}
                              </TableCell>
                              <TableCell style={tableStyles.cellButtonRight}>
                                <Grid style={tableStyles.cellIcon}>
                                  {hoverId === register.id ? (
                                    <>

                                      <IconButton
                                        aria-label="Close"
                                        onClick={() => handleDeleteRegister(
                                          register.id,
                                        )}
                                      >
                                        <Delete />
                                      </IconButton>
                                    </>
                                  )
                                    : ('')
                                  }
                                </Grid>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      })}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            ) : 'No Registers added to this outlet'
          }
        </Grid>

      </Grid>
    </Fragment>
  );
};

RegistersTemplate.propTypes = {
  classes: PropType.instanceOf(Object).isRequired,
  outlet: PropType.instanceOf(Object).isRequired,
  registers: PropType.instanceOf(Array).isRequired,
  renderTextField: PropType.func.isRequired,
  createRegister: PropType.func.isRequired,
  deleteRegister: PropType.func.isRequired,
  outletRefetch: PropType.func.isRequired,
};

const CREATE_NEW_REGISTER = graphql(CREATE_REGISTER, { name: 'createRegister' });
const DELETE_EXISTING_REGISTER = graphql(DELETE_REGISTER, { name: 'deleteRegister' });

export default compose(CREATE_NEW_REGISTER, DELETE_EXISTING_REGISTER)(RegistersTemplate);
