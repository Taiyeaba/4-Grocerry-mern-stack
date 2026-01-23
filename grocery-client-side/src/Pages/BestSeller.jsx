import React from "react";
import ProductCard from "./ProductCard";
import { useProducts } from "../Context/ProductContext";
import Loader from "../components/Loader";

const BestSeller = () => {
  const { products, loading } = useProducts();

  if (loading) return <Loader/>;

  // inStock product গুলো নাও এবং প্রথম 5 টা দেখাও
  const bestSellers = products.filter(p => p.inStock).slice(0, 5);

  return (
    <div className="mt-16 container mx-auto px-4">
      <p className="text-2xl md:text-3xl font-medium mb-6">Best Seller</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSellers.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
