import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { cartMutations } from "@/gql";
import ProductCard from "@/components/ProductCard";
import { GetProductsQuery } from "@/gql/__generated__/graphql";

const setCartMock = jest.fn();

jest.mock("@/store", () => ({
  useCartStore: jest.fn(() => ({ setCart: setCartMock })),
}));

jest.mock("@/utils", () => ({
  confirmAction: jest.fn(({ callback }) => callback()),
}));

jest.mock("sweetalert", () => jest.fn(() => Promise.resolve(true)));

const mockProduct: NonNullable<GetProductsQuery["getProducts"]["products"]>[number] = {
  _id: "65e2fbc5e6b3f7a9a1234567",
  title: "Test Product",
  cost: 19.99,
  availableQuantity: 5,
  isArchived: false,
};

const archivedProduct = { ...mockProduct, isArchived: true };

const mocks = [
  {
    request: {
      query: cartMutations.ADD_ITEM,
      variables: { input: { productId: "65e2fbc5e6b3f7a9a1234567", quantity: 1 } },
    },
    result: {
      data: {
        addItem: {
          _id: "67b67a59b687cedb1e29c8a0",
          hash: "178a545dda",
          items: [
            {
              _id: "67be2c498b7d38cdead7c75e",
              cartId: "67b67a59b687cedb1e29c8a0",
              quantity: 1,
              product: {
                _id: "65e2fbc5e6b3f7a9a1234567",
                title: "Eco-Friendly Bamboo Toothbrush",
                cost: 18.11,
                availableQuantity: 1,
                isArchived: false,
                __typename: "Product",
              },
              addedAt: "1740516425894",
              __typename: "CartItem",
            },
          ],
          __typename: "Cart",
        },
      },
    },
  },
];

describe("ProductCard Component", () => {
  it("renders product details correctly", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductCard product={mockProduct} />
      </MockedProvider>,
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$19.99/i)).toBeInTheDocument();

    const availableText = screen.getByText(/Available:/i);
    expect(within(availableText).getByText("5")).toBeInTheDocument();
  });

  it("shows 'Archived' label for archived products", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <ProductCard product={archivedProduct} />
      </MockedProvider>,
    );

    expect(screen.getByText(/Archived/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Add to Cart/i })).not.toBeInTheDocument();
  });

  it("calls addItemToCart mutation when 'Add to Cart' is clicked", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductCard product={mockProduct} />
      </MockedProvider>,
    );

    const addButton = screen.getByRole("button", { name: /Add to Cart/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(setCartMock).toHaveBeenCalledTimes(1);
    });
  });
});
