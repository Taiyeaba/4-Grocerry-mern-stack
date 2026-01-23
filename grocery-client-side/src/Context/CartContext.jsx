import { createContext, useContext, useState, useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import UseAuth from "../Hooks/UseAuth";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { user } = UseAuth();          // 🔥 user track করবো
  const axiosSecure = useAxiosSecure();

  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ LOAD ORDERS (refresh / login এর পর)
  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    axiosSecure
      .get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Fetch orders error:", err));
  }, [user]); // 🔥 user change হলে reload

  // 🛒 ADD TO CART
  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item._id !== id));
  };

  const updateQuantity = (id, qty) => {
    setCartItems(prev =>
      prev.map(item =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  // ✅ PLACE ORDER
  const placeOrder = async (order) => {
    try {

      const res = await axiosSecure.post("/orders", order);

      setOrders(prev => [
        ...prev,
        { ...order, _id: res.data.insertedId }
      ]);
      
      setCartItems([]);
    } catch (err) {
      console.error("Place order failed:", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: cartItems.length,
        addToCart,
        removeFromCart,
        updateQuantity,
        orders,
        placeOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
