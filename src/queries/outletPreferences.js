import gql from 'graphql-tag';

const GET_OUTLET_PREFERENCES = gql`
  query ($outletId: Int) {
    outletPreference (
      outletId: $outletId
    ) {
      id
      outletCurrency {
        name
        symbol
      }
      outletTimezone {
        id
        name
        timeZone
      }
      vatRate {
        rate
      }
      salesVelocity
      minimumWeeksForSalesVelocity
      reorderPoint
      reorderMax
      barcodePreference
      emailPreference
      salesHold
      paymentMethod
      alertNearExpiry
      alertLowInventory
      weeksToStartSupplyAlert
    }
  }
`;

export default GET_OUTLET_PREFERENCES;
