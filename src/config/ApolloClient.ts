import { ApolloClient, createHttpLink, InMemoryCache, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getCookie } from "cookies-next";

import { AUTH_TOKEN_KEY } from "@/constants";

const httpLink = createHttpLink({
  uri: "https://" + process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie(AUTH_TOKEN_KEY);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: "wss://" + process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === "OperationDefinition" && definition.operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
