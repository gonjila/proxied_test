import { render, screen, fireEvent } from "@testing-library/react";

import CartItem from "@/app/cart/components/CartItem";

const mockUpdate = jest.fn();
const mockRemove = jest.fn();

const mockCartItem = {
  _id: "1",
  cartId: "cart123",
  product: {
    _id: "product123",
    title: "Test Product",
    cost: 19.99,
    availableQuantity: 10,
    isArchived: false,
  },
  quantity: 2,
  addedAt: String(Date.now()), // Valid timestamp
};

describe("CartItem Component", () => {
  test("renders cart item correctly", () => {
    render(<CartItem data={mockCartItem} onUpdate={mockUpdate} onRemove={mockRemove} />);

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByText(/\$19.99/i)).toBeInTheDocument();
    expect(screen.getByText(/Quantity: 2/i)).toBeInTheDocument();
  });

  test("calls onUpdate when quantity is changed", () => {
    render(<CartItem data={mockCartItem} onUpdate={mockUpdate} onRemove={mockRemove} />);

    const input = screen.getByRole("spinbutton"); // Finds the number input
    fireEvent.change(input, { target: { value: "3" } });

    const updateButton = screen.getByRole("button", { name: /Update quantity/i });
    fireEvent.click(updateButton);

    expect(mockUpdate).toHaveBeenCalledWith("1", 3);
  });

  test("calls onRemove when remove button is clicked", () => {
    render(<CartItem data={mockCartItem} onUpdate={mockUpdate} onRemove={mockRemove} />);

    const removeButton = screen.getByText(/Remove/i);
    fireEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalledWith("1");
  });
});
