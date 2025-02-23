"use client";

import { ApolloProvider } from "@apollo/client";
import { useEffect } from "react";

import { apolloClient } from "@/config";
import { cartQueries } from "@/gql";
import { useCartStore } from "@/store";
import client from "@/config/ApolloClient";

export default function ApolloProviderWrapper({ children }: { children: React.ReactNode }) {
  const { setCart } = useCartStore();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await client.query({
          query: cartQueries.GET_CART,
        });
        if (data?.getCart) {
          setCart(data.getCart);
        }
      } catch (error) {
        // TODO error handling
        console.error("Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, [setCart]);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
