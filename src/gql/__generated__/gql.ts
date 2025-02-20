/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Register {\n    register {\n      _id\n      token\n      cartId\n      isActive\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  mutation AddItem($input: AddItemArgs!) {\n    addItem(input: $input) {\n      _id\n      items {\n        _id\n        product {\n          _id\n          title\n        }\n        quantity\n      }\n    }\n  }\n": typeof types.AddItemDocument,
    "\n  mutation RemoveItem($input: RemoveItemArgs!) {\n    removeItem(input: $input) {\n      _id\n      items {\n        _id\n      }\n    }\n  }\n": typeof types.RemoveItemDocument,
    "\n  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {\n    updateItemQuantity(input: $input) {\n      _id\n      items {\n        _id\n        quantity\n      }\n    }\n  }\n": typeof types.UpdateItemQuantityDocument,
    "\n  query GetCart {\n    getCart {\n      _id\n      hash\n      items {\n        _id\n        product {\n          _id\n          title\n          cost\n        }\n        quantity\n      }\n    }\n  }\n": typeof types.GetCartDocument,
    "\n  query GetProducts {\n    getProducts {\n      total\n\n      products {\n        _id\n        title\n        cost\n        availableQuantity\n        isArchived\n      }\n    }\n  }\n": typeof types.GetProductsDocument,
    "\n  subscription CartItemUpdate {\n    cartItemUpdate {\n      event\n      payload {\n        _id\n        quantity\n      }\n    }\n  }\n": typeof types.CartItemUpdateDocument,
};
const documents: Documents = {
    "\n  mutation Register {\n    register {\n      _id\n      token\n      cartId\n      isActive\n    }\n  }\n": types.RegisterDocument,
    "\n  mutation AddItem($input: AddItemArgs!) {\n    addItem(input: $input) {\n      _id\n      items {\n        _id\n        product {\n          _id\n          title\n        }\n        quantity\n      }\n    }\n  }\n": types.AddItemDocument,
    "\n  mutation RemoveItem($input: RemoveItemArgs!) {\n    removeItem(input: $input) {\n      _id\n      items {\n        _id\n      }\n    }\n  }\n": types.RemoveItemDocument,
    "\n  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {\n    updateItemQuantity(input: $input) {\n      _id\n      items {\n        _id\n        quantity\n      }\n    }\n  }\n": types.UpdateItemQuantityDocument,
    "\n  query GetCart {\n    getCart {\n      _id\n      hash\n      items {\n        _id\n        product {\n          _id\n          title\n          cost\n        }\n        quantity\n      }\n    }\n  }\n": types.GetCartDocument,
    "\n  query GetProducts {\n    getProducts {\n      total\n\n      products {\n        _id\n        title\n        cost\n        availableQuantity\n        isArchived\n      }\n    }\n  }\n": types.GetProductsDocument,
    "\n  subscription CartItemUpdate {\n    cartItemUpdate {\n      event\n      payload {\n        _id\n        quantity\n      }\n    }\n  }\n": types.CartItemUpdateDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Register {\n    register {\n      _id\n      token\n      cartId\n      isActive\n    }\n  }\n"): (typeof documents)["\n  mutation Register {\n    register {\n      _id\n      token\n      cartId\n      isActive\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddItem($input: AddItemArgs!) {\n    addItem(input: $input) {\n      _id\n      items {\n        _id\n        product {\n          _id\n          title\n        }\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddItem($input: AddItemArgs!) {\n    addItem(input: $input) {\n      _id\n      items {\n        _id\n        product {\n          _id\n          title\n        }\n        quantity\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveItem($input: RemoveItemArgs!) {\n    removeItem(input: $input) {\n      _id\n      items {\n        _id\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveItem($input: RemoveItemArgs!) {\n    removeItem(input: $input) {\n      _id\n      items {\n        _id\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {\n    updateItemQuantity(input: $input) {\n      _id\n      items {\n        _id\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {\n    updateItemQuantity(input: $input) {\n      _id\n      items {\n        _id\n        quantity\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCart {\n    getCart {\n      _id\n      hash\n      items {\n        _id\n        product {\n          _id\n          title\n          cost\n        }\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCart {\n    getCart {\n      _id\n      hash\n      items {\n        _id\n        product {\n          _id\n          title\n          cost\n        }\n        quantity\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetProducts {\n    getProducts {\n      total\n\n      products {\n        _id\n        title\n        cost\n        availableQuantity\n        isArchived\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetProducts {\n    getProducts {\n      total\n\n      products {\n        _id\n        title\n        cost\n        availableQuantity\n        isArchived\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription CartItemUpdate {\n    cartItemUpdate {\n      event\n      payload {\n        _id\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription CartItemUpdate {\n    cartItemUpdate {\n      event\n      payload {\n        _id\n        quantity\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;