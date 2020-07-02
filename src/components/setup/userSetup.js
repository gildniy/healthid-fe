import React from 'react';
import {
  Grid, MenuItem, TextField, InputLabel, Select
} from '@material-ui/core';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { AddUserStyles, ContentWrapper } from '../../assets/styles/setup';
import InvitedUsers from './invitedUsers';

const UserSetup = (props) => {
  const {
    state,
    handleInPutChange,
    errorHandler,
  } = props;

  const {
    showUsers,
    fName,
    lName,
    userUsername,
    userEmail,
    phone,
    jobTitle,
    roleId,
    outlet: outletId,
    startingDate,
    target,
    formError,
    outletSet,
    roles,
    users,
    phoneError,
    isError,
    usernameError,
    emailError,
  } = state;
  return (
    (users.length > 0 && showUsers)
      ? (
        <InvitedUsers {...props} />
      ) : (
        <React.Fragment>
          <form style={AddUserStyles.form}>
            <TextField
              autoComplete="First Name"
              fullWidth
              defaultValue={fName}
              name="fName"
              label="First Name"
              onChange={handleInPutChange}
              style={AddUserStyles.textFields}
            />
            <TextField
              autoComplete="Last Name"
              fullWidth
              defaultValue={lName}
              name="lName"
              onChange={handleInPutChange}
              label="Last Name"
              style={AddUserStyles.textFields}
            />
            <TextField
              autoComplete="Username"
              fullWidth
              defaultValue={userUsername}
              label="Username"
              name="userUsername"
              onChange={handleInPutChange}
              error={userUsername && !usernameError ? false : isError}
              helperText={userUsername && !usernameError ? '' : errorHandler(usernameError)}
              required
              style={AddUserStyles.textFields}
            />
            <TextField
              autoComplete="Email"
              fullWidth
              name="userEmail"
              defaultValue={userEmail}
              onChange={handleInPutChange}
              label="Email"
              required
              error={userEmail && !emailError ? false : isError}
              helperText={userEmail && !emailError ? '' : errorHandler(emailError)}
              style={AddUserStyles.textFields}
            />
            <Grid container spacing={3} justify="center">
              <Grid item xs={6}>
                <TextField
                  autoComplete="Phone"
                  fullWidth
                  name="phone"
                  defaultValue={phone}
                  onChange={handleInPutChange}
                  label="Phone #"
                  required
                  error={phone && !phoneError ? false : isError}
                  helperText={phone && !phoneError ? '' : errorHandler(phoneError)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  label="Role"
                  name="roleId"
                  className="role"
                  id="role"
                  fullWidth
                  style={ContentWrapper.pickers}
                  select
                  SelectProps={{ native: true }}
                  value={roleId}
                  onChange={handleInPutChange}
                  error={roleId ? false : formError}
                  helperText={roleId ? '' : errorHandler()}
                >
                  <>
                    <option />
                    {roles && roles.map(role => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </>
                </TextField>
              </Grid>
              <Grid item xs={6} style={{ paddingTop: '.15rem' }}>
                <InputLabel id="outlet-label" style={AddUserStyles.label}>
                  Assigned Outlet(s)
                </InputLabel>
                <Select
                  labelId="outlet-label"
                  id="outlet-label-id"
                  name="outlet"
                  value={outletId}
                  onChange={handleInPutChange}
                  style={AddUserStyles.select}
                >
                  {!_.isEmpty(outletSet) && outletSet.map(outlet => (
                    <MenuItem
                      key={outlet.id}
                      value={outlet.id}
                      style={AddUserStyles.menu}
                    >
                      <Grid container justify="space-between">
                        <Grid item style={AddUserStyles.outletName}>
                          {outlet.name}
                        </Grid>
                        <Grid item style={AddUserStyles.outletKind}>
                          {outlet.kind.name}
                        </Grid>
                      </Grid>
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="Target"
                  fullWidth
                  name="target"
                  defaultValue={target}
                  onChange={handleInPutChange}
                  label="Target"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="Job Title"
                  fullWidth
                  name="jobTitle"
                  defaultValue={jobTitle}
                  onChange={handleInPutChange}
                  label="Job Title"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  autoComplete="Starting Date"
                  fullWidth
                  name="startingDate"
                  type="date"
                  defaultValue={startingDate}
                  onChange={handleInPutChange}
                  label="Starting Date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </React.Fragment>
      )
  );
};

UserSetup.propTypes = {
  handleInPutChange: PropTypes.func.isRequired,
  handleClickAddButton: PropTypes.func.isRequired,
  errorHandler: PropTypes.func.isRequired,
  sendEditInfo: PropTypes.func.isRequired,
  state: PropTypes.instanceOf(Object).isRequired,
};

export default UserSetup;
