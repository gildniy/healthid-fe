import gql from 'graphql-tag';
import { ProductFragment } from '../../fragments/productsFragments';

export const GET_APPROVED_PRODUCTS = gql`
  query($pageNumber: Int, $pageCount: Int) {
    approvedProducts(pageNumber: $pageNumber, pageCount: $pageCount) {
      ...ProductParts
    }
    totalProductsPagesCount
    productsTotalNumber
  }
  ${ProductFragment}
`;
export const GET_PROPOSED_PRODUCTS = gql`
  query($pageNumber: Int, $pageCount: Int) {
    proposedProducts(pageNumber: $pageNumber, pageCount: $pageCount) {
      ...ProductParts
    }
    totalProductsPagesCount
    productsTotalNumber
  }
  ${ProductFragment}
`;
export const GET_PROPOSED_EDITS = gql`
  query($pageNumber: Int, $pageCount: Int) {
    proposedEdits(pageNumber: $pageNumber, pageCount: $pageCount) {
      ...ProductParts
    }
    totalProductsPagesCount
    productsTotalNumber
  }
  ${ProductFragment}
`;
export const GET_ALL_PRODUCTS = gql`
  query($pageNumber: Int, $pageCount: Int) {
    products(pageNumber: $pageNumber, pageCount: $pageCount) {
      ...ProductParts
    }
    totalProductsPagesCount
    productsTotalNumber
  }
  ${ProductFragment}
`;
export const GET_PRODUCTS = (status) => {
  switch (status) {
  case 'approved':
    return GET_APPROVED_PRODUCTS;
  case 'proposed':
    return GET_PROPOSED_PRODUCTS;
  case 'proposed-edits':
    return GET_PROPOSED_EDITS;
  case 'all':
    return GET_ALL_PRODUCTS;
  default:
    return GET_ALL_PRODUCTS;
  }
};

export const GET_PRODUCTS_COUNT = gql`
  query($pageNumber: Int, $pageCount: Int) {
    products(pageNumber: $pageNumber, pageCount: $pageCount) {
      id
    }
    totalProductsPagesCount
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query product($id: Int) {
    product(id: $id) {
      ...ProductParts
    }
  }
  ${ProductFragment}
`;
export const SEARCH_PRODUCTS = gql`
  query($searchValue: String, $pageNumber: Int, $pageCount: Int) {
    products(
      search: $searchValue
      pageNumber: $pageNumber
      pageCount: $pageCount
    ) {
      ...ProductParts
    }
  }
  ${ProductFragment}
`;
