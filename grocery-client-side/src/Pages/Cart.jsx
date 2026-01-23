import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCart } from "../Context/CartContext";
import { useAddress } from "../Context/AddressContext";
import UseAuth from "../Hooks/UseAuth";

const Cart = () => {
  const navigate = useNavigate();
  const {user} = UseAuth();
   // ✅ Cart items এবং placeOrder
  const { cartItems, removeFromCart, updateQuantity, placeOrder } = useCart();

  // ✅ Addresses AddressContext থেকে নাও
  const { addresses } = useAddress();

  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [paymentMethod, setPaymentMethod] = useState("cash");

  // ✅ Auto select last added address
  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(addresses[addresses.length - 1]);
    }
  }, [addresses]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.offerPrice * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.02);
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
  if (cartItems.length === 0) {
    alert("Cart is empty");
    return;
  }

  if (!selectedAddress) {
    alert("Please select delivery address");
    return;
  }

  const newOrder = {
    userEmail: user.email,      // ✅ IMPORTANT
    items: cartItems,
    address: selectedAddress,
    payment: paymentMethod === "cash" ? "COD" : "Online",
    total,
    status: "Order Placed",
    createdAt: new Date(),
  };

  placeOrder(newOrder);
  navigate("/my-order");
};


  return (
    <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
      {/* LEFT */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">
            {cartItems.length} Items
          </span>
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 mt-10">Your cart is empty 😔</p>
        ) : (
          <>
            <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 font-medium pb-3">
              <p>Product Details</p>
              <p className="text-center">Subtotal</p>
              <p className="text-center">Action</p>
            </div>

            {cartItems.map((product) => (
              <div
                key={product._id}
                className="grid grid-cols-[2fr_1fr_1fr] items-center pt-4"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 border rounded">
                    <img
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image
                      }
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-gray-500 text-sm">
                      Category: {product.category}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      <span>Qty:</span>
                      <select
                        value={product.quantity}
                        onChange={(e) =>
                          updateQuantity(product._id, Number(e.target.value))
                        }
                        className="border px-1"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <p className="text-center">
                  ${product.offerPrice * product.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(product._id)}
                  className="mx-auto"
                >
                  ❌
                </button>
              </div>
            ))}
          </>
        )}

        <button
          onClick={() => navigate("/all-products")}
          className="mt-8 text-indigo-500 font-medium"
        >
          ← Continue Shopping
        </button>
      </div>

      {/* RIGHT */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 border">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="my-5" />

        <p className="text-sm font-medium uppercase">Delivery Address</p>

        <div className="relative mt-2">
          <div className="flex justify-between">
            <p className="text-gray-500 text-sm">
              {selectedAddress
                ? `${selectedAddress.name}, ${selectedAddress.phone}, ${selectedAddress.street}, ${selectedAddress.city} - ${selectedAddress.postal}`
                : "No address selected"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-indigo-500 text-sm"
            >
              Change
            </button>
          </div>

          {showAddress && (
            <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow">
              {addresses.map((addr) => (
                <p
                  key={addr._id}
                  onClick={() => {
                    setSelectedAddress(addr);
                    setShowAddress(false);
                  }}
                  className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
                >
                  {`${addr.name}, ${addr.phone}, ${addr.street}, ${addr.city} - ${addr.postal}`}
                </p>
              ))}

              <Link to="/address">
                <button className="w-full mt-2 p-2 bg-indigo-500 text-white text-sm">
                  + Add New Address
                </button>
              </Link>
            </div>
          )}
        </div>

        <hr className="my-4" />

        <p className="text-sm font-medium uppercase mb-2">Payment Method</p>

        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full border p-2 rounded text-sm mb-4"
        >
          <option value="cash">Cash on Delivery</option>
          <option value="online">Online Payment</option>
        </select>

        <div className="space-y-2 text-gray-500">
          <p className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${tax}</span>
          </p>
          <p className="flex justify-between text-lg font-medium text-black">
            <span>Total</span>
            <span>${total}</span>
          </p>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 mt-6 bg-indigo-500 text-white hover:bg-indigo-600"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
