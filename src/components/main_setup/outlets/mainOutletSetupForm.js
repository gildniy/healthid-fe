import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import PageHeader from '../../shared/PageDetails/pageHeader';
import notify from '../../shared/Toaster';
import {
  ContentWrapper,
  RadioGroupStyles,
  SetupHeader,
} from '../../../assets/styles/setup';
import { batchDetailsStyles } from '../../../assets/styles/stock/batch/batchDetailsStyles';
import withAuth from '../../withAuth';
import CREATE_OUTLET from '../../../mutations/outletSetupMutation';
import UPDATE_OUTLET from '../../../mutations/updateOutletMutation';
import { DELETE_MULTIPLE_REGISTERS } from '../../../mutations/setup/outlets/deleteRegister';
import GET_ALL_COUNTRIES from '../../../queries/countryQuery';
import GET_ALL_CITIES from '../../../queries/citiesQuery';
import Loader from '../../shared/Loader';
import ProductLoader from '../../products/shared/productLoader';

import { StateContext } from '../../../providers/stateProvider';
import CREATE_REGISTER from '../../../mutations/createRegisterMutation';

export class MainOutletSetupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      cities: [],
      outletName: '',
      outletTaxNumber: '',
      addressLine1: '',
      addressLine2: '',
      selectedCountry: '',
      selectedCity: '',
      localGovernmentArea: '',
      phoneNumber: '',
      dateLaunched: '',
      outletType: '',
      edit: false,
      submitting: false,
      outlet: {},
      loadingData: false,
      registerName: '',
      numberOfRegisters: 0,
      initialRegisterNumber: 0
    };
  }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid9'
    });
  }

  static getDerivedStateFromProps(props, state) {
    const { getAllCities, getAllCountries, location = { } } = props;

    const { state: { outlet } = '' } = location;
    const { loading: loadingCities } = getAllCities;
    const { loading: loadingCountries } = getAllCountries;
    const loading = loadingCities || loadingCountries;
    const contactDict = (outlet) ? outlet.outletcontactsSet.reduce((previous, current) => {
      previous[current.dataKey] = current.dataValue;
      return previous;
    }, {}) : {};
    if (loading) {
      return {
        loadingData: true
      };
    }
    if (
      !loading
      && getAllCountries.countries.length !== state.countries.length
    ) {
      const { countries } = getAllCountries;
      const { cities } = getAllCities;
      const outletString = outlet && outlet.kind.name;

      const nonDeletedRegisters = (outlet) ? outlet.outletRegister.filter(singleOutlet => (
        singleOutlet.deletedAt === null
      )) : [];
      const numberOfRegisters = nonDeletedRegisters.length;
      const registerName = nonDeletedRegisters[0] && nonDeletedRegisters[0].name.split(' ')[0];
      return {
        countries,
        cities,
        registerName,
        numberOfRegisters,
        initialRegisterNumber: numberOfRegisters,
        outletName: outlet && outlet.name,
        outletTaxNumber: outlet && outlet.taxNumber,
        addressLine1: outlet && contactDict.address_line1,
        addressLine2: outlet && contactDict.address_line2,
        selectedCity: outlet && outlet.city.name,
        selectedCountry: outlet && outlet.city.country.name,
        dateLaunched: outlet && (outlet.outletmetaSet[0] && outlet.outletmetaSet[0].dataValue),
        phoneNumber: outlet && outlet.business.phoneNumber,
        edit: outlet && true,
        outlet: outlet && outlet,
        loadingData: false,
        outletType: (outletString === 'warehouse') ? '1' : '2'
      };
    }
    return null;
  }

  handleInputChange = name => event => this.setState({ [name]: event.target.value });

  handleSubmit = () => {
    const { createOutlet, history, createRegister } = this.props;
    const {
      outletName,
      outletTaxNumber,
      addressLine1,
      addressLine2,
      localGovernmentArea,
      selectedCity,
      selectedCountry,
      dateLaunched,
      outletType,
      phoneNumber,
      registerName,
      numberOfRegisters,
    } = this.state;

    const businessId = localStorage.getItem('businessId');

    this.setState({ submitting: true });
    createOutlet({
      variables: {
        outletName,
        taxNumber: outletTaxNumber,
        addressLine1,
        addressLine2,
        lga: localGovernmentArea,
        businessId,
        country: selectedCountry,
        cityName: selectedCity,
        dateLaunched,
        kindId: outletType,
        phoneNumber,
      }
    }).then((results) => {
      notify('Outlet Saved successfully');
      if (outletType === '2') {
        createRegister({
          variables: {
            name: registerName,
            number: Number(numberOfRegisters),
            outletId: Number(results.data.createOutlet.outlet.id),
          },
        }).then(() => {
          this.setState({ submitting: false });
          history.push('/main_setup/outlets_registers');
        }).catch((error) => {
          this.setState({ submitting: false });
          notify(error.message);
        });
      } else {
        this.setState({ submitting: false });
        history.push('/main_setup/outlets_registers');
      }
    })
      .catch((error) => {
        this.setState({ submitting: false });
        notify(error.message.slice(14));
      });
  };

  handleUpdateOutlet = () => {
    const {
      updateOutlet, history, createRegister, deleteRegisters
    } = this.props;
    const {
      outletName,
      outletTaxNumber,
      selectedCountry,
      selectedCity,
      dateLaunched,
      addressLine1,
      addressLine2,
      localGovernmentArea,
      phoneNumber,
      outlet,
      registerName,
      numberOfRegisters,
      outletType,
      initialRegisterNumber
    } = this.state;

    const nonDeletedRegisterids = outlet.outletRegister.filter(singleOutlet => (
      singleOutlet.deletedAt === null
    )).sort((previous, current) => current.id - previous.id)
      .map(({ id }) => Number(id));

    this.setState({ submitting: true });
    updateOutlet({
      variables: {
        id: outlet.id,
        country: selectedCountry,
        cityName: selectedCity,
        dateLaunched,
        name: outletName,
        addressLine1,
        addressLine2,
        lga: localGovernmentArea,
        phoneNumber,
        kindId: outletType,
        taxNumber: outletTaxNumber,
      }
    })
      .then(({ data }) => {
        notify('Outlet updated successfully');
        this.setState({ submitting: false });
        const newRegistersNumber = Number(numberOfRegisters) - Number(initialRegisterNumber);
        const increase = numberOfRegisters > initialRegisterNumber;
        const decrease = numberOfRegisters < initialRegisterNumber;
        if (!!registerName && !!numberOfRegisters && increase) {
          createRegister({
            variables: {
              name: registerName,
              number: newRegistersNumber,
              outletId: Number(outlet.id),
            },
          }).then(() => {
            this.setState({ submitting: false });
            history.push({
              pathname: `/main_setup/outlets/${outlet.id}`,
              state: { outlet: data.updateOutlet.outlet },
            });
          }).catch((error) => {
            this.setState({ submitting: false });
            notify(error.message);
          });
        } else if (!!registerName && !!numberOfRegisters && decrease) {
          deleteRegisters({
            variables: {
              ids: nonDeletedRegisterids.slice(0, Math.abs(newRegistersNumber)),
            },
          }).then(() => {
            this.setState({ submitting: false });
            history.push({
              pathname: `/main_setup/outlets/${outlet.id}`,
              state: { outlet: data.updateOutlet.outlet },
            });
          }).catch((error) => {
            this.setState({ submitting: false });
            notify(error.message);
          });
        } else {
          this.setState({ submitting: false });
          history.push({
            pathname: `/main_setup/outlets/${outlet.id}`,
            state: { outlet: data.updateOutlet.outlet },
          });
        }
      })
      .catch((error) => {
        notify(error.message.slice(14));
        this.setState({ submitting: false });
      });
  };


  HeaderButtons = (someMissing) => {
    const {
      edit, outlet, outletType, registerName, numberOfRegisters,
    } = this.state;
    const { history, classes } = this.props;
    return (
      <>
        {!edit ? (
          <Button
            onClick={this.handleSubmit}
            variant="contained"
            color="primary"
            disabled={someMissing}
            name="saveOutlet"
          >
            Save Changes
          </Button>
        )
          : (
            <>
              <Button
                variant="outlined"
                className={classes.editButton}
                onClick={() => history.push({
                  pathname: `/main_setup/outlets/${outlet.id}`,
                  state: { outlet }
                })}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                className={classes.preferenceBtn}
                style={{ width: '130px' }}
                disabled={outletType === '2'
                && (registerName === '' || numberOfRegisters === ''
                  || numberOfRegisters < 1)}
                onClick={this.handleUpdateOutlet}
              >
                Save
              </Button>
            </>
          )}
      </>
    );
  }

  static contextType = StateContext;

  render() {
    const {
      countries,
      cities,
      outletName,
      outletTaxNumber,
      addressLine1,
      addressLine2,
      selectedCountry,
      selectedCity,
      localGovernmentArea,
      phoneNumber,
      dateLaunched,
      outletType,
      submitting,
      outlet,
      edit,
      loadingData,
      registerName,
      numberOfRegisters,
    } = this.state;
    const { classes } = this.props;

    const allValues = [
      selectedCity,
      selectedCountry,
      phoneNumber,
      dateLaunched,
      outletType,
      outletName,
    ];

    if (outletType === '2') {
      const numberOfRegisters$ = numberOfRegisters === '0'
        ? ''
        : numberOfRegisters;
      allValues.push(...[registerName, numberOfRegisters$]);
    }

    const someMissing = allValues.some(val => !val || val === '');
    const prevLink = (edit
      ? `/main_setup/outlets/${outlet.id}`
      : '/main_setup/outlets_registers');

    return (
      <div style={{ paddingBottom: '40px' }}>
        {loadingData ? (
          <ProductLoader />
        ) : (
          <>
            <PageHeader
              title="Back to Outlets"
              previousPage={prevLink}
              state={{ outlet }}
            >
              {submitting ? (
                <Loader name="submitLoader" size={30} />
              ) : (
                this.HeaderButtons(someMissing)
              )
              }
            </PageHeader>
            <Paper elevation={2} className={classes.paper}>
              <Grid container spacing={3} justify="center">
                <Typography variant="h6" style={SetupHeader.formTitle}>
                  {edit ? 'Edit Outlet' : 'Create New Outlet'}
                </Typography>
                <Grid item container justify="center" spacing={3}>
                  <Grid item container spacing={3} xs={11} style={ContentWrapper.wrapper}>
                    <Grid item xs={6}>
                      <TextField
                        id="outletname"
                        required
                        name="outletName"
                        label="Outlet Name"
                        fullWidth
                        value={outletName}
                        autoComplete="first name"
                        onChange={this.handleInputChange('outletName')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="taxNumber"
                        name="outletTaxNumber"
                        label="Outlet tax #"
                        fullWidth
                        value={outletTaxNumber}
                        autoComplete="outlet tax number"
                        onChange={this.handleInputChange('outletTaxNumber')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="addressline1"
                        required
                        name="addressLine1"
                        label="Address Line 1"
                        fullWidth
                        value={addressLine1}
                        autoComplete="last name"
                        onChange={this.handleInputChange('addressLine1')}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        id="addressline2"
                        name="addressLine2"
                        label="Address Line 2"
                        fullWidth
                        value={addressLine2}
                        autoComplete="Address Line 2"
                        onChange={this.handleInputChange('addressLine2')}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="country"
                        margin="normal"
                        style={ContentWrapper.pickers}
                        label="Country"
                        name="selectedCountry"
                        select
                        value={selectedCountry}
                        onChange={this.handleInputChange('selectedCountry')}
                        SelectProps={{
                          MenuProps: {
                            PopoverClasses: {
                              paper: classes.popperPaper,
                            },
                          },
                        }}
                      >
                        {countries && countries.map(option => (
                          <MenuItem
                            key={option.name}
                            value={option.name}
                            dense
                          >
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        margin="normal"
                        style={ContentWrapper.pickers}
                        label="City/Town"
                        name="selectedCity"
                        select
                        value={selectedCity}
                        onChange={this.handleInputChange('selectedCity')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      >
                        {cities && cities.filter(
                          option => option.country.name === selectedCountry,
                        ).map(option => (
                          <MenuItem key={option.id} value={option.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        id="lga"
                        name="localGovernmentArea"
                        label="Region"
                        fullWidth
                        autoComplete="local Government Area"
                        value={localGovernmentArea}
                        onChange={this.handleInputChange('localGovernmentArea')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="phoneno"
                        required
                        name="phoneNumber"
                        label="Phone #"
                        fullWidth
                        autoComplete="Phone #"
                        value={phoneNumber}
                        onChange={this.handleInputChange('phoneNumber')}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        id="datelaunched"
                        required
                        name="dateLaunched"
                        label="Date Launched"
                        type="date"
                        style={ContentWrapper.pickers}
                        defaultValue={dateLaunched}
                        onChange={this.handleInputChange('dateLaunched')}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  </Grid>
                  <Grid item container xs={11} style={ContentWrapper.headers}>
                    <Typography variant="h6">Outlet Type</Typography>
                  </Grid>
                  <Grid item xs={11} style={ContentWrapper.wrapper}>
                    <RadioGroup
                      name="outletType"
                      aria-label="outlet"
                      value={outletType}
                      style={RadioGroupStyles.radioGroup}
                      onChange={this.handleInputChange('outletType')}
                      row
                    >
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Storefront"
                      />
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Warehouse"
                      />
                      <div />
                    </RadioGroup>
                  </Grid>
                  {outletType === '2' && (
                    <Fragment>
                      <Grid item xs={11} style={ContentWrapper.headers}>
                        <Typography variant="h6">Set up Register</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={11}
                        container
                        spacing={3}
                        style={ContentWrapper.wrapper}
                      >
                        <Grid item xs={6}>
                          <TextField
                            id="registername"
                            required
                            name="registerName"
                            label="Register Name"
                            fullWidth
                            value={registerName}
                            autoComplete="register name"
                            onChange={this.handleInputChange('registerName')}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            type="number"
                            id="numberofregister"
                            required
                            name="numberOfRegisters"
                            label="Number Of Registers"
                            fullWidth
                            value={numberOfRegisters}
                            inputProps={{ min: 0 }}
                            autoComplete="number of registers"
                            onChange={this.handleInputChange('numberOfRegisters')}
                          />
                        </Grid>
                      </Grid>
                    </Fragment>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </div>
    );
  }
}

MainOutletSetupForm.propTypes = {
  session: PropTypes.shape({}).isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  classes: PropTypes.instanceOf(Object).isRequired,
  createOutlet: PropTypes.func.isRequired,
  createRegister: PropTypes.func.isRequired,
  deleteRegisters: PropTypes.func.isRequired,
  updateOutlet: PropTypes.func.isRequired,
};

export default withAuth(
  compose(
    graphql(CREATE_OUTLET, { name: 'createOutlet' }),
    graphql(CREATE_REGISTER, { name: 'createRegister' }),
    graphql(UPDATE_OUTLET, { name: 'updateOutlet' }),
    graphql(GET_ALL_COUNTRIES, { name: 'getAllCountries' }),
    graphql(GET_ALL_CITIES, { name: 'getAllCities' }),
    graphql(DELETE_MULTIPLE_REGISTERS, { name: 'deleteRegisters' }),
  )(withRouter(withStyles(batchDetailsStyles)(MainOutletSetupForm)))
);
