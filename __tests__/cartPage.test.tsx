import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import swal from "sweetalert";

import CartPage from "@/app/cart/page";
import { cartMutations, cartSubscriptions } from "@/gql";
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
  items: [
    {
      _id: "item-123",
      product: { title: "Test Product" },
      quantity: 2,
    },
  ],
};

// ✅ Mock Cart Store Data
(useCartStore as unknown as jest.Mock).mockReturnValue({
  cart: mockCart,
  updateCartItemQuantety: mockUpdateCartItemQuantity,
  deleteCartItem: mockDeleteCartItem,
  updateSubscribedCartItem: mockUpdateSubscribedCartItem,
});

describe("Cart Page", () => {
  it("renders cart items correctly", async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <CartPage />
      </MockedProvider>,
    );

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
  });

  it("removes item when remove button is clicked", async () => {
    const removeMock = {
      request: { query: cartMutations.REMOVE_ITEM, variables: { input: { cartItemId: "item-123" } } },
      result: { data: { removeItem: true } },
    };

    render(
      <MockedProvider mocks={[removeMock]} addTypename={false}>
        <CartPage />
      </MockedProvider>,
    );

    // Click remove button
    fireEvent.click(screen.getByText(/remove/i));

    await waitFor(() => {
      expect(mockDeleteCartItem).toHaveBeenCalledWith("item-123");
    });
  });

  it("updates item quantity correctly", async () => {
    const updateMock = {
      request: {
        query: cartMutations.UPDATE_ITEM_QUANTITY,
        variables: { input: { cartItemId: "item-123", quantity: 3 } },
      },
      result: { data: { updateItemQuantity: true } },
    };

    render(
      <MockedProvider mocks={[updateMock]} addTypename={false}>
        <CartPage />
      </MockedProvider>,
    );

    // Click update button
    fireEvent.click(screen.getByText(/update quantity/i));

    await waitFor(() => {
      expect(mockUpdateCartItemQuantity).toHaveBeenCalledWith("item-123", 3);
    });
  });

  it("handles subscription updates", async () => {
    const subscriptionMock = {
      request: { query: cartSubscriptions.CART_ITEM_UPDATE },
      result: {
        data: {
          cartItemUpdate: {
            event: CartItemEvent.ItemOutOfStock,
            payload: {
              product: { title: "Test Product" },
            },
          },
        },
      },
    };

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
