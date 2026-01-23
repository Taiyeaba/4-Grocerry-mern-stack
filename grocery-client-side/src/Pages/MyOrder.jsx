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
    <div className="max-w-5xl mx-auto py-16 px-4">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-lg mb-6 bg-white"
        >
          {/* ORDER HEADER */}
          <div className="flex justify-between text-sm p-4 border-b bg-gray-50">
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
              className="flex justify-between items-center p-4 border-b"
            >
              <div className="flex items-center gap-4">
                <img
                  src={Array.isArray(item.image) ? item.image[0] : item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain"
                />

                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>Qty: {item.quantity}</p>
                <p>Status: {order.status}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                <p>Address: {formatAddress(order.address)}</p>
              </div>

              <p className="font-medium">
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