import { GetCartQuery } from "@/gql/__generated__/graphql";

type IProps = {
  data: GetCartQuery["getCart"]["items"][number];
  onRemove: (id: string) => void;
  onUpdate: (id: string, quantity: number) => void;
};

function CartItem({ data, onRemove, onUpdate }: IProps) {
  return (
    <li className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="text-gray-600">
        <h3 className="text-lg font-semibold text-gray-800">{data.product.title}</h3>
        <p>Price: ${data.product.cost.toFixed(2)}</p>
        <p>Quantity: {data.quantity}</p>
        <p>Added: {new Date(parseInt(data.addedAt)).toLocaleDateString()}</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <button
          onClick={() => onUpdate(data._id, data.quantity + 1)}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          +
        </button>
        <button
          onClick={() => onUpdate(data._id, data.quantity - 1)}
          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
          disabled={data.quantity <= 1}
        >
          -
        </button>
        <button
          onClick={() => onRemove(data._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default CartItem;
