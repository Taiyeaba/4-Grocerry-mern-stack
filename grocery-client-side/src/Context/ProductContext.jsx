import { createContext, useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const axiosSecure = useAxiosSecure();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ GET ALL PRODUCTS FROM BACKEND (MongoDB)
  // const fetchProducts = async () => {
  //   try {
  //     setLoading(true);
  //     const res = await axiosSecure.get("/products");
  //     setProducts(res.data);
  //   } catch (err) {
  //     console.error("Product fetch error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchProducts = async (type = "dashboard") => {
    try {
      setLoading(true);

      const url =
        type === "public"
          ? "/products/public"
          : "/products";

      const res = await axiosSecure.get(url);
      setProducts(res.data);
    } catch (err) {
      console.error("Product fetch error:", err);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ ADD PRODUCT (POST → MongoDB + frontend sync)
  const addProduct = async (product) => {
    try {
      const res = await axiosSecure.post("/products", {
        ...product,
        inStock: true,
        createdAt: new Date(),
      });

      // frontend state update after successful backend insert
      setProducts(prev => [
        {
          ...product,
          _id: res.data.insertedId, // MongoDB _id
          inStock: true,
        },
        ...prev,
      ]);
    } catch (error) {
      console.error("Add product error:", error);
    }
  };

  // ✅ TOGGLE STOCK (backend + frontend)
  const toggleStock = async (id) => {
    try {
      // find current product
      const product = products.find(p => p._id === id);
      if (!product) return;

      // toggle stock value
      const updatedStock = !product.inStock;

      // PATCH request to backend
      await axiosSecure.patch(`/products/${id}`, { inStock: updatedStock });

      // frontend state update
      setProducts(prev =>
        prev.map(item =>
          item._id === id
            ? { ...item, inStock: updatedStock }
            : item
        )
      );
    } catch (error) {
      console.error("Toggle stock error:", error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        addProduct,
        toggleStock,
        fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
