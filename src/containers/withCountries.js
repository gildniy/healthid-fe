/* istanbul ignore file */
import React from 'react';
import { Query } from 'react-apollo';
import GET_ALL_COUNTRIES from '../queries/countryQuery';
import DataTableLoader from '../components/dataTable/dataTableLoader';

const WithCountries = Component => props => (
  <Query
    query={GET_ALL_COUNTRIES}
  >
    {({
      loading, data, error
    }) => {
      if (loading) return <DataTableLoader />;
      if (error) return null;
      const { countries } = data;
      return (
        <Component
          {...props}
          countries={countries}
        />
      );
    }}
  </Query>
);

export default WithCountries;
