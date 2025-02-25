import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import swal from "sweetalert";

import CartPage from "@/app/cart/page";
import { cartSubscriptions } from "@/gql";
import { useCartStore } from "@/store";
import { CartItemEvent } from "@/gql/__generated__/graphql";

// ✅ Mock SweetAlert
jest.mock("sweetalert", () => jest.fn());

// ✅ Mock Zustand Store
jest.mock("@/store", () => ({
  useCartStore: jest.fn(),
}));

const mockUpdateCartItemQuantity = jest.fn();
const mockDeleteCartItem = jest.fn();
const mockUpdateSubscribedCartItem = jest.fn();

const mockCart = {
  _id: "67b67a59b687cedb1e29c8a0",
  hash: "178a545dda",
  items: [
    {
      _id: "67be2c498b7d38cdead7c75e",
      cartId: "67b67a59b687cedb1e29c8a0",
      quantity: 2,
      addedAt: "1740516425894",
      product: {
        _id: "67a7a4aaea6cab17b137f956",
        title: "Test Product",
        cost: 18.11,
        availableQuantity: 7,
        isArchived: false,
      },
    },
  ],
};

const subscriptionMock = {
  request: { query: cartSubscriptions.CART_ITEM_UPDATE },
  result: {
    data: {
      cartItemUpdate: {
        event: CartItemEvent.ItemOutOfStock,
        payload: {
          _id: "67be2c498b7d38cdead7c75e",
          cartId: "67b67a59b687cedb1e29c8a0",
          quantity: 0,
          product: {
            _id: "67a7a4aaea6cab17b137f956",
            title: "Test Product",
            cost: 18.11,
            availableQuantity: 7,
            isArchived: false,
          },
        },
      },
    },
  },
};

(useCartStore as unknown as jest.Mock).mockReturnValue({
  cart: mockCart,
  updateCartItemQuantety: mockUpdateCartItemQuantity, // ✅ Fixed mistyped function name
  deleteCartItem: mockDeleteCartItem,
  updateSubscribedCartItem: mockUpdateSubscribedCartItem,
});

describe("Cart Page", () => {
  it("renders cart items correctly", async () => {
    render(
      <MockedProvider mocks={[subscriptionMock]} addTypename={false}>
        <CartPage />
      </MockedProvider>,
    );

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("handles subscription updates", async () => {
    render(
      <MockedProvider mocks={[subscriptionMock]} addTypename={false}>
        <CartPage />
      </MockedProvider>,
    );

    await waitFor(() => {
      expect(mockUpdateSubscribedCartItem).toHaveBeenCalled();
      expect(swal).toHaveBeenCalledWith({
        text: "Test Product has deleted from cart!",
        icon: "info",
        timer: 5000,
      });
    });
  });
});
