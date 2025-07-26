
import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-md transition p-4 bg-white">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-lg font-bold mt-3">{product.name}</h2>
      <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
      <p className="text-blue-700 font-semibold mt-2">Rs. {product.price}</p>
      <Link
        to={`/product/${product._id}`}
        className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View Product
      </Link>
    </div>
  );
}
