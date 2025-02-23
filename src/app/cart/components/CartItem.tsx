"use client";

import { useState } from "react";

import { Icon } from "@/components";
import { GetCartQuery } from "@/gql/__generated__/graphql";

type IProps = {
  data: GetCartQuery["getCart"]["items"][number];
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

function CartItem({ data, onUpdate, onRemove }: IProps) {
  const [inputValue, setInputValue] = useState(data.quantity);

  const handleChangeQuantity = () => {
    if (data.quantity === inputValue) {
      swal({
        title: "Process canceled!",
        text: "The products quantity is already the same",
        icon: "info",
        timer: 5000,
      });
      return;
    }

    onUpdate(data._id, inputValue);
  };

  return (
    <li className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="text-gray-600">
        <h3 className="text-lg font-semibold text-gray-800">{data.product.title}</h3>
        <p>Price: ${data.product.cost.toFixed(2)}</p>
        <p>Quantity: {data.quantity}</p>
        <p>Added: {new Date(parseInt(data.addedAt)).toLocaleDateString()}</p>
      </div>

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={data.product.availableQuantity}
            value={inputValue}
            onChange={el => setInputValue(+el.target.value)}
            className="text-black w-14 pl-3 border border-black rounded-lg"
          />

          <button
            onClick={handleChangeQuantity}
            className="w-10 h-full bg-green-500  hover:bg-green-600 rounded-lg grid place-items-center"
          >
            <Icon iconName="check" />
          </button>
        </div>

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
