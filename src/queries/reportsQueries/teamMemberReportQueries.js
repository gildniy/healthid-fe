import gql from 'graphql-tag';

export const GET_TEAM_MEMBER_REPORTS = gql`
query ($dateFrom: DateTime!, $dateTo: DateTime!, $pageCount: Int, $pageNumber: Int) {
  teamReport(
    dateFrom: $dateFrom,
    dateTo: $dateTo,
    pageCount: $pageCount,
    pageNumber: $pageNumber
  ) {
    sale {
      salesPerson {
        email
        role {
          name
        }
      }
    }
    totalQtySold
    totalProductsSold
    totalCashAmount
    totalCardAmount
  }
}
`;