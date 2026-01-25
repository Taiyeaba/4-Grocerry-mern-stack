import React from "react";
import { useNavigate } from "react-router";
import { useCart } from "../Context/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useCart();

  if (!product) return null;

  const cartItem = cartItems.find(item => item._id === product._id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer w-full max-w-[280px] mx-auto">
      
      {/* Image */}
      <div
        onClick={() => navigate(`/products-details/${product._id}`)}
        className="relative bg-gray-50 p-4"
      >
        <div className="h-48 flex items-center justify-center">
          <img
            className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
            src={Array.isArray(product.image) ? product.image[0] : product.image}
            alt={product.name}
          />
        </div>

        {product.offerPrice < product.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {Math.round(
              ((product.price - product.offerPrice) / product.price) * 100
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-gray-500 text-sm uppercase mb-1">
          {product.category}
        </p>

        <h3
          onClick={() => navigate(`/products-details/${product._id}`)}
          className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600"
        >
          {product.name}
        </h3>

        {product.addedBy && (
          <p className="text-gray-500 text-xs mb-3">
            Sold by:{" "}
            <span className="font-medium">
              {product.addedBy.storeName || "Unknown"}
            </span>
          </p>
        )}

        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[1, 2, 3, 4, 5].map(star => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= 4 ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-gray-600 text-sm ml-1">(4.0)</span>
        </div>

        {/* Price + Cart */}
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900">
              ${product.offerPrice}
            </span>
            {product.price > product.offerPrice && (
              <span className="text-gray-400 line-through text-sm">
                ${product.price}
              </span>
            )}
          </div>

          {/* CART BUTTON (Mobile Responsive) */}
          {quantity === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                toast.success("Added to cart");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
              Add to Cart
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full flex items-center bg-blue-600 text-white rounded-lg overflow-hidden"
            >
              <button
                onClick={() => {
                  removeFromCart(product._id);
                  toast.error("Removed from cart");
                }}
                className="flex-1 py-3 hover:bg-blue-700"
              >
                −
              </button>

              <div className="px-4 py-3 border-x border-blue-700">
                {quantity}
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  toast.success("Added more");
                }}
                className="flex-1 py-3 hover:bg-blue-700"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
