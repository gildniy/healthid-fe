import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Grid,
  Paper,
  Button,
  Typography,
  FormControl,
  Radio,
  FormControlLabel,
  FormGroup,
  RadioGroup,
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { compose, graphql, Query } from 'react-apollo';
import PropTypes from 'prop-types';
import DateFnsUtils from '@date-io/date-fns';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import withAuth from '../../withAuth';
import GET_USER_INFO from '../../../queries/userDataQuery';
import INITIATE_ORDER from '../../../mutations/initiateOrderMutation';
import OutletsList from './outletsList';
import notify from '../../shared/Toaster';
import { MainBusinessSetUpStyles as styles, SetupHeader } from '../../../assets/styles/setup';
import initiateOrderStyles from '../../../assets/styles/orders/newOrder';
import { StateContext } from '../../../providers/stateProvider';
import Loader from '../../shared/Loader';
import Footer from '../../shared/Footer';

export class NewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      populateOrder: 'true',
      destinationOutlet: undefined,
      submitting: false,
      deliveryDate: new Date().toISOString().split('T')[0]
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    const [, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid4'
    });
  }

  handleDateChange = (event) => {
    const name = 'deliveryDate';
    const value = new Date(event).toISOString().split('T')[0];
    this.setState({ [name]: value });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleDateFocus = ({ target }) => {
    target.type = 'date';
  };

  handleSubmit = () => {
    const { initiateOrder } = this.props;
    const business = localStorage.getItem('businessId');
    const {
      deliveryDate,
      destinationOutlet,
      populateOrder
    } = this.state;

    this.setState({ submitting: true });
    initiateOrder({
      variables: {
        business,
        deliveryDate,
        destinationOutlet,
        productAutofill: populateOrder === 'true' ? Boolean('true') : false,
        supplierAutofill: populateOrder === 'true' ? Boolean('true') : false,
      }
    })
      .then((res) => {
        const { history } = this.props;
        this.setState({ submitting: false });
        history.push(`/orders/list/${res.data.initiateOrder.order.id}`);
        notify('Order initiated successfully');
      })
      .catch(() => {
        notify('Error Initiating the order');
        this.setState({ submitting: false });
      });
  };

  getOutlets = ({ loading, error, data }) => {
    const { destinationOutlet } = this.state;

    if (loading) {
      return <Loader size={30} />;
    }

    if (error) {
      return (
        <OutletsList
          destinationOutlet={destinationOutlet}
          handleChange={this.handleChange}
          outlets={[{ name: 'Lifestores', id: 0 }]}
        />
      );
    }
    return (
      <OutletsList
        destinationOutlet={destinationOutlet}
        handleChange={this.handleChange}
        outlets={data.me.outlets}
      />
    );
  };

  formatDate = (date) => {
    const d = new Date(date);
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = d.getFullYear();

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;

    return [year, month, day].join('-');
  };

  static contextType = StateContext;

  render() {
    const {
      deliveryDate,
      destinationOutlet, populateOrder, submitting
    } = this.state;
    const allValues = [deliveryDate,
      destinationOutlet];
    const someMissing = allValues.some(val => (!val || val === ''));
    return (
      <Fragment>
        <Grid container style={styles.container}>
          <Grid item xs={1} style={SetupHeader.backBox}>
            <Button style={SetupHeader.backButton}>
              <Link to="/orders/open" style={SetupHeader.link}>
                <ArrowBack fontSize="large" />
              </Link>
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Grid style={styles.profileHeader}>
              <Typography variant="h5">
                Back
              </Typography>
            </Grid>
            <Paper elevation={2} style={{ ...styles.paper, marginBottom: '60px' }}>
              <Grid>
                <Grid style={{ ...styles.contentHeader }}>
                  <Typography style={initiateOrderStyles.newOrderTitle} variant="h5">
                    New Order
                  </Typography>
                </Grid>
                <Grid
                  container
                  style={{ ...styles.contentHeader, ...initiateOrderStyles.orderBody }}
                >

                  <Grid container>
                    <Grid container>
                      <Grid container style={initiateOrderStyles.generalPadding}>
                        <Query
                          query={GET_USER_INFO}
                        >
                          {
                            ({ loading, error, data }) => this.getOutlets({ loading, error, data })
                          }
                        </Query>

                        <Grid container style={{ width: '55%' }}>
                          <FormControl style={initiateOrderStyles.deliveryDue}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <InlineDatePicker
                                id="date-due"
                                onlyCalendar
                                keyboard
                                clearable
                                fullWidth
                                disablePast
                                label="Delivery Due"
                                name="deliveryDate"
                                value={deliveryDate}
                                onChange={this.handleDateChange}
                                format="dd/MM/yyyy"
                              />
                            </MuiPickersUtilsProvider>
                          </FormControl>
                        </Grid>

                        <FormGroup row style={{ ...initiateOrderStyles.ulContainer, marginTop: '3rem' }} Component="fieldset">
                          <ul style={initiateOrderStyles.UlStyles}>
                            <li style={{ ...initiateOrderStyles.autofillContainer, marginRight: '2rem', marginTop: '0.2rem' }}>
                              Order List:
                            </li>
                            <li style={{ ...initiateOrderStyles.autofillContainer, width: '50%' }}>
                              <RadioGroup
                                row
                                name="populateOrder"
                                value={populateOrder}
                                onChange={this.handleChange}
                                style={initiateOrderStyles.autofillStyles}
                              >
                                <FormControlLabel
                                  style={{ display: 'inline-flex', margin: '0px', padding: '0px' }}
                                  value="true"
                                  control={<Radio />}
                                  label={(
                                    <span style={{
                                      display: 'flex', float: 'right', fontSize: '18px', color: populateOrder === 'true' ? '#424242' : '#A3A3A3'
                                    }}
                                    >
                                      Autofill
                                    </span>
                                  )}
                                />
                                <FormControlLabel
                                  style={{ display: 'inline-flex', margin: '0px', padding: '0px' }}
                                  value="false"
                                  control={<Radio />}
                                  label={(
                                    <span style={{
                                      display: 'flex', float: 'right', fontSize: '18px', color: populateOrder === 'false' ? '#424242' : '#A3A3A3'
                                    }}
                                    >
                                      Don&apos;t Autofill
                                    </span>
                                  )}
                                />
                              </RadioGroup>
                            </li>
                          </ul>
                        </FormGroup>
                      </Grid>

                      <Grid
                        container
                        style={initiateOrderStyles.submitContainer}
                      >
                        { submitting ? <Loader name="submitLoader" size={30} />
                          : (
                            <Button
                              onClick={this.handleSubmit}
                              size="medium"
                              style={initiateOrderStyles.initiateOrderButton}
                              variant="contained"
                              color="secondary"
                              disabled={someMissing}
                              name="submit"
                            >
                              CREATE ORDER
                            </Button>
                          )
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Footer />
      </Fragment>
    );
  }
}

NewOrder.propTypes = {
  initiateOrder: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired
};

const NEW_ORDER = graphql(INITIATE_ORDER, { name: 'initiateOrder' });
export default withAuth(compose(NEW_ORDER)(withRouter(NewOrder)));
