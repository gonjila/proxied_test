import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GetCart {
    getCart {
      _id
      hash
      items {
        _id
        product {
          _id
          title
          cost
        }
        quantity
      }
    }
  }
`;
