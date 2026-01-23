import { createContext, useContext, useState, useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [orders, setOrders] = useState([]);

  // Add new order
  const addOrder = async (order) => {
    try {
      const res = await axiosSecure.post("/orders", order);
      setOrders(prev => [
        { ...order, _id: res.data.insertedId },
        ...prev
      ]);
    } catch (error) {
      console.error("Add order error:", error);
    }
  };

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const res = await axiosSecure.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch orders error:", err);
    }
  };

  // Load orders on app start
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, addOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
