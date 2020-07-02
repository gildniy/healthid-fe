/* istanbul ignore file */
import React from 'react';
import { Query } from 'react-apollo';
import { GET_INITIAL_DATA } from '../queries/initialDataQuery/initialDataQuery';
import DataTableLoader from '../components/dataTable/dataTableLoader';

const WithInitialData = Component => props => (
  <Query
    query={GET_INITIAL_DATA}
  >
    {({
      loading, data, error, refetch
    }) => {
      if (loading) return <DataTableLoader />;
      if (error) return null;

      const { countries, customers, totalCustomersCount } = data;

      return (
        <Component
          {...props}
          countries={countries}
          customers={customers}
          totalCustomersCount={totalCustomersCount}
          initialDataRefetch={refetch}
        />
      );
    }}
  </Query>
);

export default WithInitialData;
