import { gql } from "../__generated__";

export const REGISTER = gql(`
  mutation Register {
    register {
      _id
      token
      cartId
      isActive
    }
  }
`);
