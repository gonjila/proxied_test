"use client";

import { useQuery, useMutation } from "@apollo/client";

import { cartQueries, cartMutations } from "@/gql";
import { cartRemoveItemSchema, cartUpdateItemQuantitySchema } from "@/validation";

import CartItem from "./components/CartItem";

function CartPage() {
  const { data, loading, error } = useQuery(cartQueries.GET_CART);
  const [removeItem] = useMutation(cartMutations.REMOVE_ITEM, {
    refetchQueries: [{ query: cartQueries.GET_CART }],
  });
  const [updateItemQuantity] = useMutation(cartMutations.UPDATE_ITEM_QUANTITY, {
    refetchQueries: [{ query: cartQueries.GET_CART }],
  });

  const handleRemove = async (cartItemId: string) => {
    try {
      cartRemoveItemSchema.parse({ cartItemId });
      await removeItem({ variables: { input: { cartItemId } } });
    } catch (error) {
      // TODO Handle validation error
      console.error("Validation Error:", error);
    }
  };

  const handleUpdate = async (cartItemId: string, quantity: number) => {
    try {
      cartUpdateItemQuantitySchema.parse({ cartItemId, quantity });
      await updateItemQuantity({ variables: { input: { cartItemId, quantity } } });
    } catch (error) {
      console.error("Validation Error:", error);
    }
  };

  return (
    <main className="container p-3 md:p-8 mx-auto">
      <h1 className="text-3xl font-bold text-gray-500 text-center mb-6">Your Cart</h1>
      <div className="max-w-4xl mx-auto">
        {loading && <p className="text-center text-gray-500">Loading cart...</p>}
        {error && <p className="text-center text-red-500">Error: {error.message}</p>}
        {data?.getCart.items.length ? (
          <ul>
            {data.getCart.items.map(item => (
              <CartItem key={item._id} data={item} onRemove={handleRemove} onUpdate={handleUpdate} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">Your cart is empty.</p>
        )}
      </div>
    </main>
  );
}

export default CartPage;
