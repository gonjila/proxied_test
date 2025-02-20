import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register {
    register {
      _id
      token
      cartId
      isActive
    }
  }
`;
