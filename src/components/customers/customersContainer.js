import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CUSTOMERS } from '../../queries/customersQuery';
import withAuth from '../withAuth';
import WithCountries from '../../containers/withCountries';
import DataTable from './Table/DataTable';
import DataTableLoader from '../dataTable/dataTableLoader';
import '../../assets/styles/stock/stock_products.scss';

import { StateContext } from '../../providers/stateProvider';

export class Customers extends Component {
  state = {
    offset: 0,
    data: [],
    currentPage: 1,
    currentPageCount: 50,
  }

  componentDidMount() {
    const [{ customers }, dispatch] = Object.values(this.context);
    dispatch({
      type: 'changeGrid',
      grid: 'grid7'
    });
    this.setInitialData(dispatch);
    this.setLocations(customers, dispatch);
  }

  setInitialData = (dispatch) => {
    const { countries } = this.props;
    dispatch({
      type: 'SET_COUNTRIES',
      payload: countries
    });
  };

  setLocations = (customers, dispatch) => {
    const { countries } = this.props;
    const { country } = customers;
    const defaultCountry = country || 'Nigeria';
    const newCountry = countries && countries.find(item => item.name === defaultCountry);
    dispatch({
      type: 'SET_CUSTOMER_VALUE',
      payload: {
        country: defaultCountry,
        countryId: newCountry.id,
        cities: newCountry.citySet,
      }
    });
  };

  createColumns = columns => columns.map(title => ({
    id: title.replace(/ +/g, ''),
    label: title.toUpperCase()
  }));

  displayCustomer = (rowId, customers, refetch) => {
    const customer = customers.find(value => value.id === rowId);
    this.handleDisplayCustomerDetails(customer, 'isSelected', refetch);
  }

  handleDisplayCustomerDetails = (customer, isSelected, refetch) => {
    const [, dispatch] = Object.values(this.context);
    const {
      id, firstName, lastName, email, primaryMobileNumber,
      secondaryMobileNumber, loyaltyMember, region, city, country,
      emergencyContactName, emergencyContactEmail, emergencyContactNumber,
    } = customer;
    const countryName = country ? country.name : '';
    const { countries } = this.props;
    const countrySet = countries && countries.find(item => item.name === countryName);
    const cities = countrySet ? countrySet.citySet : [];
    dispatch({
      type: 'SET_CUSTOMER_VALUE',
      payload: {
        openCustomerDetailsDialog: true,
        selectedCustomer: customer,
        customersRefetch: refetch,
        isSelected,
        id,
        firstName: firstName || '',
        lastName: lastName || '',
        email: email || '',
        primaryMobileNumber: primaryMobileNumber || '',
        secondaryMobileNumber: secondaryMobileNumber || '',
        loyaltyMember,
        region: region || '',
        country: country && country.name,
        countryId: country && country.id,
        city: city && city.name,
        cityId: city && Number(city.id),
        cities,
        emergencyContactName: emergencyContactName || '',
        emergencyContactEmail: emergencyContactEmail || '',
        emergencyContactNumber: emergencyContactNumber || ''
      }
    });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ currentPageCount: +event.target.value });
  };

  handleChangePage = (_, newPage) => {
    const { currentPageCount } = this.state;
    const offset = newPage * currentPageCount;
    this.setState({
      currentPage: newPage + 1,
      offset,
    });
  };

  paginateData = (data) => {
    const { offset, currentPageCount } = this.state;
    return data.slice(offset, offset + currentPageCount);
  }

  static contextType = StateContext;

  render() {
    const { currentPage, currentPageCount } = this.state;
    const columnHeaders = [
      'id', 'customer name', 'email', 'mobile number', 'loyalty points',
      'store credit'
    ];
    return (
      <Query query={CUSTOMERS}>
        {({
          loading, data, error, refetch
        }) => {
          if (loading) return <DataTableLoader />;
          if (error) return `Error! ${error.message}`;
          const { customers, totalCustomersCount } = data;

          const customersData = this.paginateData(customers);

          return (
            <div name="stock_products">
              <DataTable
                title="Customer(s)"
                columns={this.createColumns(columnHeaders)}
                data={customersData}
                totalCount={totalCustomersCount}
                rowsPerPage={currentPageCount}
                page={currentPage}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                customersRefetch={refetch}
                onRowClick={rowId => this.displayCustomer(rowId, customers, refetch)}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

Customers.propTypes = {
  countries: PropTypes.arrayOf(PropTypes.object),
};

Customers.defaultProps = {
  countries: []
};

export default withAuth(WithCountries(withRouter(Customers)));
