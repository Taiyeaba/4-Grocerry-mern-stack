
import { useLocation } from "react-router";
import { useProducts } from "../Context/ProductContext";
import ProductCard from "./ProductCard";
import { useEffect } from "react";


const AllProducts = () => {
  const location = useLocation();
  const { products,fetchProducts} = useProducts();

  // 🔍 search
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("search")
    ? searchParams.get("search").toLowerCase()
    : "";

  // 🔎 filter (IMPORTANT: inStock true only)
  const filteredProducts = products.filter((product) => {
    if (!product.inStock) return false;

    if (!searchText) return true;

    const nameMatch = product.name
      .toLowerCase()
      .includes(searchText);

    const categoryMatch = product.category
      .toLowerCase()
      .includes(searchText);

    return nameMatch || categoryMatch;
  });

       useEffect(() => {
  fetchProducts("public");
}, []);



  return (
    <div className="container mx-auto px-4 mt-10">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6">
        {searchText
          ? `Search result for "${searchText}"`
          : "All Products"}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No products found 😔
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProducts;
