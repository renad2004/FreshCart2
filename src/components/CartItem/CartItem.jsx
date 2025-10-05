import { Minus, Plus, Trash } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../../context/card.context";

export default function CartItem({ cartInfo }) {
  const { removeFromCart, updateQuantity } = useContext(CartContext);
  const { count, price, product } = cartInfo;
  const { title, imageCover, id } = product;

  return (
    <div className="flex justify-between my-20 items-center rounded-xl p-4 mb-4">
      {/* Left Section */}
      <div className="flex gap-4 items-center">
        <img
          className="w-26 h-26 object-cover rounded-lg"
          src={imageCover}
          alt={title}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-main font-bold text-md mt-1">Price : {price}</p>
          <button
            onClick={() => removeFromCart(id)}
            className="flex cursor-pointer rounded-lg p-2 items-center gap-2 text-white bg-red-500 hover:bg-red-600 text-sm mt-2"
          >
            <Trash size={16} />
            Remove
          </button>
        </div>
      </div>

      {/* Right Section (Quantity Control) */}
      <div className="flex items-center gap-3">
        {/* Plus */}
        <button
          onClick={() => updateQuantity(id, count + 1)}
          className="p-2 rounded-full cursor-pointer bg-main text-white hover:bg-main-dark transition"
        >
          <Plus size={18} />
        </button>

        <span className=" text-lg font-medium">{count}</span>

        {/* Minus */}
        <button
          onClick={() => {
            if (count > 1) {
              updateQuantity(id, count - 1);
            } else {
              removeFromCart(id);
            }
          }}
          className="p-2 rounded-full cursor-pointer bg-main text-white hover:bg-main-dark transition"
        >
          <Minus size={18} />
        </button>
      </div>
    </div>
  );
}
