"use client";

import { useMutation } from "@apollo/client";

import { GetProductsQuery } from "@/gql/__generated__/graphql";
import { cartMutations } from "@/gql";
import { cartAddItemSchema } from "@/validation";

import Icon from "./icons";

interface IProps {
  product: NonNullable<GetProductsQuery["getProducts"]["products"]>[number];
}

function ProductCard({ product }: IProps) {
  const [addItemToCart] = useMutation(cartMutations.ADD_ITEM);

  const handleAddToCart = async () => {
    const inputData = { productId: product._id, quantity: 1 };

    const validationResult = cartAddItemSchema.safeParse(inputData);

    if (!validationResult.success) {
      console.error("Validation Error:", validationResult.error.format());
      // TODO show error toast
      alert("Invalid product data. Please try again.");
      return;
    }

    try {
      // TODO show success toast
      await addItemToCart({ variables: { input: inputData } });
    } catch (mutationError) {
      // TODO show error toast
      console.error("GraphQL Error:", mutationError);
    }
  };

  return (
    <li className="bg-white shadow-lg rounded-2xl p-5">
      <h2 className="text-xl font-semibold text-gray-800">{product.title}</h2>
      <p className="text-gray-600 mt-2">
        Price: <span className="font-medium">${product.cost.toFixed(2)}</span>
      </p>
      <p className="text-gray-600">
        Available: <span className="font-medium">{product.availableQuantity}</span>
      </p>
      {product.isArchived ? (
        <span className="text-red-500 font-semibold mt-2 block">Archived</span>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-1"
        >
          <Icon iconName="plus" />

          <span>Add to Cart</span>
        </button>
      )}
    </li>
  );
}

export default ProductCard;
