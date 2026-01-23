import { createContext, useContext, useState, useEffect } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();
  const [addresses, setAddresses] = useState([]);

  // ✅ Fetch addresses from backend
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axiosSecure.get("/address");
        setAddresses(res.data);
      } catch (error) {
        console.error("Fetch addresses error:", error);
      }
    };
    fetchAddresses();
  }, []);

  // ✅ Add new address
  const addAddress = async (address) => {
    try {
      const res = await axiosSecure.post("/address", {
        ...address,
        createdAt: new Date(),
      });

      setAddresses(prev => [
        { ...address, _id: res.data.insertedId },
        ...prev
      ]);
    } catch (error) {
      console.error("Add address error:", error);
    }
  };

  return (
    <AddressContext.Provider value={{ addresses, addAddress }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => useContext(AddressContext);
