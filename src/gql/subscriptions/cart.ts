import { gql } from "../__generated__";

export const CART_ITEM_UPDATE = gql(`
  subscription CartItemUpdate {
    cartItemUpdate {
      event
      payload {
        _id
        quantity
      }
    }
  }
`);
