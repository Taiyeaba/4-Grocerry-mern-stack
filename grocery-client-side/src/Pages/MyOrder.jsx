import React from "react";
import { useCart } from "../Context/CartContext";

// Helper function: address object ke string e convert kore
const formatAddress = (address) => {
  if (!address) return "No address selected";
  return `${address.name}, ${address.phone}, ${address.street}, ${address.city} - ${address.postal}`;
};

const MyOrder = () => {
  const { orders } = useCart(); // User order

  if (!orders || orders.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No orders placed yet 😔
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-3 sm:px-4">
      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
        My Orders
      </h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg mb-6 bg-white overflow-hidden"
        >
          {/* ORDER HEADER */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm p-4 border-b bg-gray-50">
            <p>
              <span className="font-medium">Order ID:</span> {order.id}
            </p>
            <p>
              <span className="font-medium">Payment:</span> {order.payment}
            </p>
            <p>
              <span className="font-medium">Total:</span> ${order.total}
            </p>
          </div>

          {/* ITEMS */}
          {order.items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 p-4 border-b"
            >
              {/* PRODUCT INFO */}
              <div className="flex items-center gap-4">
                <img
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain"
                />

                <div>
                  <p className="font-medium text-sm sm:text-base">
                    {item.name}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {item.category}
                  </p>
                </div>
              </div>

              {/* ORDER DETAILS */}
              <div className="text-xs sm:text-sm text-gray-600 space-y-1">
                <p>Qty: {item.quantity}</p>
                <p>Status: {order.status}</p>
                <p>
                  Date: {new Date(order.date).toLocaleDateString()}
                </p>
                <p className="break-words">
                  Address: {formatAddress(order.address)}
                </p>
              </div>

              {/* PRICE */}
              <p className="font-medium text-right sm:text-left">
                ${item.offerPrice * item.quantity}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
