import { gql } from "../__generated__";

export const GET_CART = gql(`
  query GetCart {
    getCart {
      _id
      hash
      items {
        _id
        cartId
        quantity
        product {
          _id
          title
          cost
          availableQuantity
          isArchived
        }
      }
    }
  }
`);
