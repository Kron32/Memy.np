
import React from 'react';

export default function CartItem({ item, onRemove, onQuantityChange }) {
  return (
    <div className="flex items-center border-b py-4">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-grow ml-4">
        <h3 className="font-semibold text-lg">{item.name}</h3>
        <p className="text-gray-600">Price: Rs. {item.price}</p>
        <div className="mt-2 flex items-center space-x-2">
          <label htmlFor={`quantity-${item._id}`} className="mr-2">
            Qty:
          </label>
          <input
            id={`quantity-${item._id}`}
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => onQuantityChange(item._id, Number(e.target.value))}
            className="w-16 border rounded px-2 py-1"
          />
        </div>
      </div>
      <button
        onClick={() => onRemove(item._id)}
        className="ml-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
      >
        Remove
      </button>
    </div>
  );
}
