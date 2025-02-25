import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";

import { productQueries } from "@/gql";

import Home from "../src/app/(main)/page";

const mockProducts = [
  {
    _id: "67a7a4aaea6cab17b137f956",
    title: "Eco-Friendly Bamboo Toothbrush",
    cost: 18.11,
    availableQuantity: 10,
    isArchived: false,
  },
];

const mocks = [
  {
    request: {
      query: productQueries.GET_PRODUCTS,
      variables: {},
    },
    result: {
      data: {
        getProducts: {
          total: 1,
          products: mockProducts,
        },
      },
    },
  },
];

describe("Home Page", () => {
  it("renders loading state initially", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    // Check that the loading message appears first
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders fetched products", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    // Wait for the products to be displayed
    await waitFor(() => {
      expect(screen.getByText("Total Products: 1")).toBeInTheDocument();
      expect(screen.getByText("Eco-Friendly Bamboo Toothbrush")).toBeInTheDocument();
    });
  });

  it("renders error state if API request fails", async () => {
    const errorMock = [
      {
        request: {
          query: productQueries.GET_PRODUCTS,
          variables: {},
        },
        error: new Error("Failed to fetch"),
      },
    ];

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument();
    });
  });

  it("renders no products message if API returns empty array", async () => {
    const emptyMock = [
      {
        request: {
          query: productQueries.GET_PRODUCTS,
          variables: {},
        },
        result: {
          data: {
            getProducts: {
              total: 0,
              products: [],
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={emptyMock} addTypename={false}>
        <Home />
      </MockedProvider>,
    );

    // Wait for "No products available" message to appear
    await waitFor(() => {
      expect(screen.getByText("No products available")).toBeInTheDocument();
    });
  });
});
