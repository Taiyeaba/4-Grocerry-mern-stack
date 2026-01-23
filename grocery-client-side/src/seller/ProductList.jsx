import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { useProducts } from "../Context/ProductContext";

const ProductList = () => {
  const location = useLocation();
  const { products, toggleStock ,fetchProducts} = useProducts();

  // 🔍 URL search
  const searchParams = new URLSearchParams(location.search);
  const searchText = searchParams.get("search")
    ? searchParams.get("search").toLowerCase()
    : "";

  // 🔎 filter
  const filteredProducts = products.filter((product) => {
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
  fetchProducts("dashboard");
}, []);


  return (
    <div className="flex-1 py-10 flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">
          {searchText
            ? `Search result for "${searchText}"`
            : "All Products"}
        </h2>

        <div className="flex flex-col items-center max-w-5xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="md:table-auto table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="px-4 py-3 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold hidden md:block">
                  Price
                </th>
                <th className="px-4 py-3 font-semibold">In Stock</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-500">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-10 text-gray-400">
                    No products found 😔
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr
                    key={product._id}
                    className="border-t border-gray-500/20"
                  >
                    {/* Product */}
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                      <div className="border border-gray-300 rounded overflow-hidden">
                        <img
                          src={
                            Array.isArray(product.image)
                              ? product.image[0]
                              : product.image
                          }
                          alt={product.name}
                          className="w-16 h-16 object-cover"
                        />
                      </div>
                      <span className="truncate max-sm:hidden">
                        {product.name}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-3">{product.category}</td>

                    {/* Price */}
                    <td className="px-4 py-3 hidden md:block">
                      ৳{product.offerPrice}
                    </td>

                    {/* Stock toggle */}
                    <td className="px-4 py-3">
                      <label className="relative inline-flex items-center cursor-pointer gap-3">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={product.inStock}
                          onChange={() => toggleStock(product._id)}
                        />
                        <div className="w-12 h-7 bg-slate-300 rounded-full peer-checked:bg-blue-600 transition-colors duration-200"></div>
                        <span className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5"></span>
                      </label>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
