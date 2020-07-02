import gql from 'graphql-tag';
import { CustomerFragment } from '../../fragments/customersFragments';

export const GET_INITIAL_DATA = gql`
  query {
    countries {
      id
      name
      citySet {
        id
        name
      }
    }
    customers(offline: true) {
      ...CustomerParts
    }
    totalCustomersCount
  }
  ${CustomerFragment}
`;

export default GET_INITIAL_DATA;
