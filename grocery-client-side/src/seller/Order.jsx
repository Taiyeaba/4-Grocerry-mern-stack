import React from "react";
import { useCart } from "../Context/CartContext";

// Helper function: address object ke string e convert kore
const formatAddress = (address) => {
  if (!address) return "No address";
  return `${address.name}, ${address.phone}, ${address.street}, ${address.city} - ${address.postal}`;
};

const Order = () => {
  const { orders } = useCart(); // All orders (Admin)

  if (!orders || orders.length === 0) {
    return (
      <div className="py-20 text-center text-gray-500">
        No orders found 😔
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Orders List</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between
                       gap-4 p-4 bg-white border rounded-lg shadow-sm"
          >
            {/* LEFT : IMAGE + PRODUCTS */}
            <div className="flex items-start sm:items-center gap-4 flex-1">
              <img
                src={
                  Array.isArray(order.items[0].image)
                    ? order.items[0].image[0]
                    : order.items[0].image
                }
                alt="product"
                className="w-14 h-14 object-cover rounded"
              />

              <div>
                {order.items.map((item) => (
                  <p key={item._id} className="text-sm font-medium">
                    {item.name}
                    {item.quantity > 1 && (
                      <span className="text-indigo-500">
                        {" "}
                        x {item.quantity}
                      </span>
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex-1 text-sm text-gray-600">
              <p className="font-medium text-gray-800">
                {order.user || "Customer"}
              </p>
              <p className="break-words">{formatAddress(order.address)}</p>
            </div>

            {/* AMOUNT */}
            <p className="font-semibold text-gray-800 lg:w-24">
              ${order.total}
            </p>

            {/* PAYMENT INFO */}
            <div className="text-sm text-gray-600 lg:w-40">
              <p>
                <span className="font-medium">Method:</span>{" "}
                {order.payment}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(order.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                <span
                  className={
                    order.payment === "COD"
                      ? "text-orange-500"
                      : "text-green-600"
                  }
                >
                  {order.payment === "COD" ? "Pending" : "Paid"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
