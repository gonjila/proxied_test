"use client";

import { useQuery } from "@apollo/client";

import { productQueries } from "@/gql";

export default function Home() {
  const { data, loading, error } = useQuery(productQueries.GET_PRODUCTS);

  return (
    <main className="">
      <h1>Products data</h1>

      <br />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data?.getProducts?.products?.map(product => <li key={product._id}>{product.title}</li>)}
    </main>
  );
}
