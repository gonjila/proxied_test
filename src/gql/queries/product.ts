import { gql } from "../__generated__";

export const GET_PRODUCTS = gql(`
  query GetProducts {
    getProducts {
      total

      products {
        _id
        title
        cost
        availableQuantity
        isArchived
      }
    }
  }
`);
