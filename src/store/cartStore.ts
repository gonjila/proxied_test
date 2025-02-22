import { create } from "zustand";

import { GetCartQuery, CartItemUpdateSubscription, CartItemEvent } from "@/gql/__generated__/graphql";

interface CartState {
  cart: GetCartQuery["getCart"] | null;
  setCart: (cart: GetCartQuery["getCart"]) => void;
  updateCartItemQuantety: (cartItemId: string, quantity: number) => void;
  deleteCartItem: (cartItemId: string) => void;
  updateSubscribedCartItem: (update: CartItemUpdateSubscription["cartItemUpdate"]) => void;
}

const useCartStore = create<CartState>(set => ({
  cart: null,

  setCart: cart => set({ cart }),

  updateCartItemQuantety: (cartItemId, quantity) =>
    set(state => {
      if (!state.cart) return state;

      const updatedItems =
        state.cart.items?.map(item => (item._id === cartItemId ? { ...item, quantity } : item)) || [];

      return { cart: { ...state.cart, items: updatedItems } };
    }),

  deleteCartItem: cartItemId =>
    set(state => {
      if (!state.cart) return state;

      const updatedItems = state.cart.items?.filter(item => item._id !== cartItemId) || [];
      return { cart: { ...state.cart, items: updatedItems } };
    }),

  updateSubscribedCartItem: update =>
    set(state => {
      if (!state.cart) return state;

      const { event, payload } = update;
      let updatedItems = [...state.cart.items];

      if (event === CartItemEvent.ItemOutOfStock) {
        updatedItems = updatedItems.filter(item => item._id !== payload._id);
      } else if (event === CartItemEvent.ItemQuantityUpdated) {
        updatedItems = updatedItems.map(item =>
          item._id === payload._id ? { ...item, quantity: payload.quantity } : item,
        );
      }

      return { cart: { ...state.cart, items: updatedItems } };
    }),
}));

export default useCartStore;
