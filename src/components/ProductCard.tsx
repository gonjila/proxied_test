import { GetProductsQuery } from "@/gql/__generated__/graphql";

import Icon from "./icons";

interface IProps {
  product: NonNullable<GetProductsQuery["getProducts"]["products"]>[number];
}

function ProductCard({ product }: IProps) {
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
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-1">
          <Icon iconName="plus" />

          <span>Add to Cart</span>
        </button>
      )}
    </li>
  );
}

export default ProductCard;
