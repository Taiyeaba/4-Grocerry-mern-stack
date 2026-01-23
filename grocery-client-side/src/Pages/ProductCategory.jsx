import React from "react";
import { useParams } from "react-router";
import ProductCard from "./ProductCard";
import { useProducts } from "../Context/ProductContext";
import { categories } from "../assets/assets";
import Loader from "../components/Loader";

const ProductCategory = () => {
  const { category } = useParams();
  const { products, loading } = useProducts();

  if (loading) return <Loader/>;

  const selectedCategory = categories.find(
    c => c.path.toLowerCase() === category.toLowerCase()
  );

  const filteredProducts = products.filter(
    p => p.category.toLowerCase() === category.toLowerCase() && p.inStock
  );

  if (!selectedCategory)
    return <p className="text-center mt-20 text-red-500">Category not found</p>;

  return (
    <div className="container mx-auto px-4 mt-10">
      <div className="text-center mb-10">
        <img
          src={selectedCategory.image}
          alt={selectedCategory.text}
          className="w-32 mx-auto mb-4"
        />
        <h1 className="text-3xl md:text-4xl font-bold">{selectedCategory.text}</h1>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found in this category 😔</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCategory;
