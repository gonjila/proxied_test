"use client";

import { useQuery } from "@apollo/client";

import { productQueries } from "@/gql";
import { ProductCard } from "@/components";

export default function Home() {
  const { data, loading, error } = useQuery(productQueries.GET_PRODUCTS);

  return (
    <main className="container p-8 -mt-10 mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-500">PRODUCTS</h1>
        <p className="text-gray-400">Browse our latest collection</p>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">Error: {error.message}</p>}

      {data?.getProducts?.total && (
        <h2 className="text-xl font-semibold text-gray-400 mb-4 text-center">
          Total Products: {data.getProducts.total}
        </h2>
      )}

      <section>
        {data?.getProducts?.products?.length || loading ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {(data?.getProducts?.products ?? []).map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products available</p>
        )}
      </section>
    </main>
  );
}
