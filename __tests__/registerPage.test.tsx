import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { setCookie } from "cookies-next";

import RegisterPage from "@/app/register/page";
import { authMutations } from "@/gql";
import { AUTH_TOKEN_KEY } from "@/constants";

jest.mock("cookies-next", () => ({
  setCookie: jest.fn(),
}));

Object.defineProperty(window, "location", {
  writable: true,
  value: { reload: jest.fn() },
});

const registerMutationMock = {
  request: {
    query: authMutations.REGISTER,
    variables: {},
  },
  result: {
    data: {
      register: {
        _id: "67bd05688b7d38cdead7c2a8",
        token: "fake-token-123",
        cartId: "67bd05688b7d38cdead7c2a7",
        isActive: true,
        createdAt: "1740440936249",
        updatedAt: "1740440936249",
      },
    },
  },
};

describe("Register Page", () => {
  it("renders register button", () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RegisterPage />
      </MockedProvider>,
    );

    // ✅ Fix: Use `getByRole` to target the button instead of `getByText`
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  it("calls mutation and sets cookie on success", async () => {
    render(
      <MockedProvider mocks={[registerMutationMock]} addTypename={false}>
        <RegisterPage />
      </MockedProvider>,
    );

    const button = screen.getByRole("button", { name: /register/i });
    fireEvent.click(button);

    // Wait for loading text
    expect(await screen.findByText("Registering...")).toBeInTheDocument();

    // Wait for mutation to complete
    await waitFor(() => {
      expect(setCookie).toHaveBeenCalledWith(AUTH_TOKEN_KEY, "fake-token-123", { path: "/" });
      expect(window.location.reload).toHaveBeenCalled();
    });

    expect(await screen.findByText("Registered! Token saved in cookies.")).toBeInTheDocument();
  });

  // it("shows error message on mutation failure", async () => {
  //   const errorMock = [
  //     {
  //       request: { query: authMutations.REGISTER, variables: {} },
  //       error: new Error("Registration failed"),
  //     },
  //   ];

  //   render(
  //     <MockedProvider mocks={errorMock} addTypename={false}>
  //       <RegisterPage />
  //     </MockedProvider>,
  //   );

  //   fireEvent.click(screen.getByRole("button", { name: /register/i }));

  //   expect(await screen.findByText("Registering...")).toBeInTheDocument();

  //   await waitFor(() => {
  //     expect(screen.getByText("Error: Registration failed")).toBeInTheDocument();
  //   });
  // });
});
