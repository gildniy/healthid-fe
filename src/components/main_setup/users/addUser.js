import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { graphql, compose } from 'react-apollo';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {
  Typography, TextField, Paper, Grid, Button
} from '@material-ui/core';
import withAuth from '../../withAuth';
import { StateContext } from '../../../providers/stateProvider';
import notify from '../../shared/Toaster';
import {
  MainBusinessSetUpStyles,
  BusinessSetUpStyles,
  SetupHeader,
  AddUserStyles,
  ContentWrapper
} from '../../../assets/styles/setup';
import { GET_ROLES } from '../../../queries/addUsersSetupQuery';
import { ADD_NEW_USER } from '../../../mutations/addUsersSetupMutation';
import Footer from '../../shared/Footer';

export class AddUser extends Component {
  state = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    role: '',
    outlet: '',
    target: '',
    jobTitle: '',
    startingDate: '2020-01-01',
    roles: '',
    outlets: '',
    formError: false,
    active: false,
    saveButtonStyle: SetupHeader.saveButton,
    addButtonStyle: SetupHeader.addButton
  };

  componentDidMount() {
    const { session } = this.props;
    const { outlets } = session.me;
    this.setState({ outlets });

    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid9'
    });
  }

  componentWillReceiveProps(nextProps) {
    nextProps && this.fetchUserData(nextProps);
  }

  fetchUserData = (nextProps) => {
    const {
      userRoles: { roles }
    } = nextProps;

    return this.setState({
      roles
    });
  };

  handleInPutChange = (event) => {
    const { name, value } = event.target;

    this.setState(
      {
        [name]: value,
        isError: false,
        formError: false
      },
      () => this.checkForRequiredFields()
    );
  };

  checkForRequiredFields = () => {
    const {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      role,
      outlet,
      jobTitle
    } = this.state;

    if (
      firstName === ''
      || lastName === ''
      || userName === ''
      || email === ''
      || phoneNumber === ''
      || role === ''
      || outlet === ''
      || jobTitle === ''
    ) {
      this.setState({
        formError: true,
        active: true,
        saveButtonStyle: SetupHeader.disabledSaveButton,
        addButtonStyle: SetupHeader.disabledAddButton
      });
    } else {
      this.setState({
        active: false,
        saveButtonStyle: SetupHeader.saveButton,
        addButtonStyle: SetupHeader.addButton
      });
    }
  };

  errorHandler = (error) => {
    const { formError, isError } = this.state;
    let errorMessage;
    if (formError) {
      errorMessage = 'Please provide a value for this field';
    } else if (isError) {
      errorMessage = error;
    } else {
      errorMessage = '';
    }
    return errorMessage;
  };

  handleUserFormInputValidation = () => {
    const {
      firstName,
      lastName,
      userName,
      email,
      phoneNumber,
      role,
      outlet,
      jobTitle
    } = this.state;
    return (
      firstName === ''
      || lastName === ''
      || userName === ''
      || email === ''
      || phoneNumber === ''
      || role === ''
      || outlet === ''
      || jobTitle === ''
    );
  };

  addOrSaveUser = (result) => {
    const { history } = this.props;
    const invalidForm = this.handleUserFormInputValidation();

    if (!invalidForm) {
      const {
        firstName,
        lastName,
        userName,
        email,
        phoneNumber,
        role,
        outlet,
        jobTitle,
        startingDate
      } = this.state;

      const { addNewUser } = this.props;

      addNewUser({
        variables: {
          firstName,
          lastName,
          userUsername: userName,
          userEmail: email,
          roleId: role,
          outlet,
          phone: phoneNumber,
          jobTitle,
          startingDate
        }
      })
        .then((data) => {
          const { addUser } = data.data;
          const { errors, success } = addUser;

          if (errors && errors.length) {
            notify(errors[0].slice(21));
          } else {
            notify(success[0]);
            setTimeout(() => {
              switch (result) {
              case 'reload':
                window.location.reload();
                break;

              case 'redirect':
                history.push('/main_setup/users');
                break;

              default:
                return null;
              }
            }, 4000);
          }
        })
        .catch((error) => {
          notify(error.message.slice(14));
        });
    } else {
      notify('Fill Up The Form');
    }
  };

  saveUser = () => {
    this.addOrSaveUser('redirect');
  };

  addNew = () => {
    this.addOrSaveUser('reload');
  };

  static contextType = StateContext;

  render() {
    const {
      roles,
      outlets,
      startingDate,
      saveButtonStyle,
      addButtonStyle,
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      outlet,
      jobTitle,
      userName,
      active
    } = this.state;

    return (
      <Fragment>
        <Grid style={MainBusinessSetUpStyles.container}>
          <Grid style={SetupHeader.adjust}>
            <Grid item xs={1} style={SetupHeader.backBox}>
              <Button style={SetupHeader.backButton}>
                <Link to="/main_setup/users" style={SetupHeader.link}>
                  <ArrowBack fontSize="large" />
                </Link>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} style={SetupHeader.wrapper}>
          <Grid style={MainBusinessSetUpStyles.profileHeader}>
            <Typography variant="h5">Back</Typography>
            <Grid tyle={SetupHeader.buttonContainer}>
              <Button
                style={addButtonStyle}
                onClick={this.addNew}
                disabled={active}
              >
                Add New
              </Button>
              <Button
                style={saveButtonStyle}
                onClick={this.saveUser}
                disabled={active}
              >
                Save
              </Button>
            </Grid>
          </Grid>
          <Paper elevation={2}>
            <form>
              <Grid item style={BusinessSetUpStyles.contentHeader}>
                <Typography variant="h5">Add User</Typography>
              </Grid>
              <Grid
                container
                spacing={24}
                justify="center"
                style={BusinessSetUpStyles.gridContainer}
              >
                <Grid item xs={6}>
                  <TextField
                    required
                    autoComplete="First Name"
                    fullWidth
                    name="firstName"
                    label="First Name"
                    error={firstName ? false : this.formError}
                    helperText={firstName ? '' : this.errorHandler()}
                    onChange={this.handleInPutChange}
                    style={AddUserStyles.textFields}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="lastname"
                    name="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="Lastname"
                    error={lastName ? false : this.formError}
                    helperText={lastName ? '' : this.errorHandler()}
                    onChange={this.handleInPutChange}
                    style={AddUserStyles.textFields}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="username"
                    name="userName"
                    label="Username"
                    fullWidth
                    autoComplete="Username"
                    error={userName ? false : this.formError}
                    helperText={userName ? '' : this.errorHandler()}
                    onChange={this.handleInPutChange}
                    style={AddUserStyles.textFields}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="Email"
                    error={email ? false : this.formError}
                    helperText={email ? '' : this.errorHandler()}
                    onChange={this.handleInPutChange}
                    style={AddUserStyles.textFields}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="phone"
                    name="phoneNumber"
                    label="Phone #"
                    fullWidth
                    autoComplete="Phone"
                    error={phoneNumber ? false : this.formError}
                    helperText={phoneNumber ? '' : this.errorHandler()}
                    onChange={this.handleInPutChange}
                    style={AddUserStyles.textFields}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    margin="normal"
                    label="Role"
                    name="role"
                    className="role"
                    fullWidth
                    error={role ? false : this.formError}
                    helperText={role ? '' : this.errorHandler()}
                    onChange={this.handleInPutChange}
                    style={ContentWrapper.pickers}
                    select
                    SelectProps={{ native: true }}
                  >
                    <>
                      <option />
                      {roles
                        && roles.map(rolee => (
                          <option key={rolee.id} value={rolee.id}>
                            {rolee.name}
                          </option>
                        ))}
                    </>
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    margin="normal"
                    label="Assigned Outlet"
                    name="outlet"
                    fullWidth
                    error={outlet ? false : this.formError}
                    helperText={outlet ? '' : this.errorHandler()}
                    onChange={this.handleInPutChange}
                    style={ContentWrapper.pickers}
                    select
                    SelectProps={{ native: true }}
                  >
                    <>
                      <option />
                      {outlets
                        && outlets.map(outlett => (
                          <option key={outlett.id} value={outlett.id}>
                            {outlett.name}
                          </option>
                        ))}
                    </>
                  </TextField>
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    id="target"
                    name="target"
                    label="Target"
                    fullWidth
                    autoComplete="Target"
                    style={AddUserStyles.textFields}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    id="job_title"
                    name="jobTitle"
                    label="Job Title"
                    fullWidth
                    autoComplete="Job Title"
                    error={jobTitle ? false : this.formError}
                    helperText={jobTitle ? '' : this.errorHandler()}
                    onChange={this.handleInPutChange}
                    style={AddUserStyles.textFields}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextField
                    required
                    autoComplete="Starting Date"
                    fullWidth
                    name="startingDate"
                    type="date"
                    defaultValue={startingDate}
                    label="Starting Date"
                    InputLabelProps={{
                      shrink: true
                    }}
                    error={startingDate ? false : this.formError}
                    helperText={startingDate ? '' : this.errorHandler()}
                    onChange={this.handleInPutChange}
                    style={AddUserStyles.textFields}
                  />
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
        <Footer />
      </Fragment>
    );
  }
}

AddUser.propTypes = {
  session: PropTypes.shape({
    me: PropTypes.shape({
      businessUser: PropTypes.instanceOf(Object).isRequired,
      outlets: PropTypes.array
    })
  }).isRequired,
  addNewUser: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};


const ADD_USER = graphql(ADD_NEW_USER, { name: 'addNewUser' });
const GET_USER_ROLES = graphql(GET_ROLES, { name: 'userRoles' });

export default compose(GET_USER_ROLES, ADD_USER)(withAuth(withRouter(AddUser)));
