"use client";

import { useQuery } from "@apollo/client";

import { cartQueries } from "@/gql";

function CartPage() {
  const { data } = useQuery(cartQueries.GET_CART);

  console.log({ cartsData: data });

  return <main>CartPage</main>;
}

export default CartPage;
