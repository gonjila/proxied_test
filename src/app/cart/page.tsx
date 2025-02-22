"use client";

import { useQuery, useMutation, useSubscription } from "@apollo/client";
import swal from "sweetalert";

import { cartQueries, cartMutations, cartSubscriptions } from "@/gql";
import { cartRemoveItemSchema, cartUpdateItemQuantitySchema } from "@/validation";
import { confirmAction } from "@/utils";
import { useCartStore } from "@/store";
import { CartItemEvent } from "@/gql/__generated__/graphql";

import CartItem from "./components/CartItem";

function CartPage() {
  const { cart, setCart, updateCartItemQuantety, deleteCartItem, updateSubscribedCartItem } =
    useCartStore();

  const { loading, error } = useQuery(cartQueries.GET_CART, {
    onCompleted: data => setCart(data.getCart),
  });

  const [removeItem] = useMutation(cartMutations.REMOVE_ITEM);
  const [updateItemQuantity] = useMutation(cartMutations.UPDATE_ITEM_QUANTITY);

  useSubscription(cartSubscriptions.CART_ITEM_UPDATE, {
    onData: ({ data }) => {
      if (data.data?.cartItemUpdate) {
        updateSubscribedCartItem(data.data?.cartItemUpdate);

        const text =
          data.data?.cartItemUpdate.event === CartItemEvent.ItemOutOfStock
            ? `${data.data?.cartItemUpdate.payload.product.title} has deleted from cart!`
            : `Available quantity of ${data.data?.cartItemUpdate.payload.product.title} has changed!`;

        swal({
          text: text,
          icon: "info",
          timer: 3000,
        });
      }
    },
  });

  const handleRemove = async (cartItemId: string) => {
    confirmAction({
      title: "Remove item!",
      text: "Are you sure you want to remove this item from your cart?",
      successText: "Item has been removed!",
      errorText: "Item has not been removed!",
      callback: async () => {
        cartRemoveItemSchema.parse({ cartItemId });
        await removeItem({ variables: { input: { cartItemId } } });
        deleteCartItem(cartItemId);
      },
    });
  };

  const handleUpdate = (cartItemId: string, quantity: number) => {
    confirmAction({
      title: "Update quantity!",
      text: `Are you sure you want to change the quantity to ${quantity}?`,
      successText: "cart item quantity has changed!",
      errorText: "cart item quantity has not changed!",
      callback: async () => {
        const inputValues = { cartItemId, quantity };
        cartUpdateItemQuantitySchema.parse(inputValues);
        await updateItemQuantity({ variables: { input: inputValues } });
        updateCartItemQuantety(cartItemId, quantity);
      },
    });
  };

  return (
    <main className="container p-3 md:p-8 mx-auto">
      <h1 className="text-3xl font-bold text-gray-500 text-center mb-6">Your Cart</h1>

      <div className="max-w-4xl mx-auto">
        {loading && <p className="text-center text-gray-500">Loading cart...</p>}
        {error && <p className="text-center text-red-500">Error: {error.message}</p>}

        {cart?.items.length ? (
          <ul>
            {cart?.items.map(item => (
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
