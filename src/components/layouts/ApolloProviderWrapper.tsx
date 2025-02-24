"use client";

import { ApolloProvider } from "@apollo/client";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import swal from "sweetalert";

import { apolloClient } from "@/config";
import { cartQueries } from "@/gql";
import { useCartStore } from "@/store";
import client from "@/config/ApolloClient";
import { AUTH_TOKEN_KEY } from "@/constants";

export default function ApolloProviderWrapper({ children }: { children: React.ReactNode }) {
  const { setCart } = useCartStore();

  useEffect(() => {
    const authToken = getCookie(AUTH_TOKEN_KEY);

    if (!authToken) {
      return;
    }

    const fetchCart = async () => {
      try {
        const { data } = await client.query({
          query: cartQueries.GET_CART,
        });
        if (data?.getCart) {
          setCart(data.getCart);
        }
      } catch {
        swal({
          title: "Failed to fetch cart!",
          icon: "error",
          timer: 3000,
        });
      }
    };

    fetchCart();
  }, [setCart]);

  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
