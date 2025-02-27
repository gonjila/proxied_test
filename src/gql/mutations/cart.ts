import { gql } from "../__generated__";

export const ADD_ITEM = gql(`
  mutation AddItem($input: AddItemArgs!) {
    addItem(input: $input) {
      _id
      hash
      items {
        _id
        cartId
        quantity
        addedAt
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

export const REMOVE_ITEM = gql(`
  mutation RemoveItem($input: RemoveItemArgs!) {
    removeItem(input: $input) {
      _id
      items {
        _id
      }
    }
  }
`);

export const UPDATE_ITEM_QUANTITY = gql(`
  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {
    updateItemQuantity(input: $input) {
      _id
      items {
        _id
        quantity
      }
    }
  }
`);
