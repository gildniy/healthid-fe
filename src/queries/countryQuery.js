import gql from 'graphql-tag';

const outletId = localStorage.getItem('outletId') || 1;
export const GET_COUNTRIES_CITIES = gql`
  query {
    outlet(id:${outletId}){
      city{
        country{
          name
        }
      }
    } 
    countries {
      id
      name
      citySet {
        id
        name
      }
    }
  }
`;

const GET_ALL_COUNTRIES = gql`
  query {
    countries {
      id
      name
      citySet {
        id
        name
      }
    }
  }
`;


export default GET_ALL_COUNTRIES;
