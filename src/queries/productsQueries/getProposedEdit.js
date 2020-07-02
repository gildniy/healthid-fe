import gql from 'graphql-tag';

const GET_PROPOSED_EDIT = gql`
query($id: Int!){
    proposedEdit(id: $id) {
    id
    globalUpc
    productName
    productCategory{
      id
      name
    }
    dispensingSize {
      id
      name
    }
    skuNumber
    description
    brand
    manufacturer
    vatStatus
    salesPrice
    reorderPoint
    reorderMax
    nearestExpiryDate
    preferredSupplier{
      id 
      name
    }
    backupSupplier{ 
      id name
    }
    tags
    isApproved
    markup
    loyaltyWeight
    batchInfo{
      id
      batchNo
      supplier { 
        id 
        name
      }
      dateReceived
      quantity
      expiryDate
      unitCost
    }
    unitCost
    createdAt
    business{
      outletSet
        {
          outletpreference{
            outletCurrency{
              symbol
            }
          }
        }
    }
    parent{
        id
        batchInfo{
        id
        batchNo
        supplier { 
          id 
          name
        }
        dateReceived
        quantity
        expiryDate
        unitCost
      }
    }
    quantityInStock
    image
    }
}
`;

export default GET_PROPOSED_EDIT;
