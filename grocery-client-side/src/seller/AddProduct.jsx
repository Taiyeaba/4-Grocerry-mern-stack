// AddProduct.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useProducts } from "../Context/ProductContext";
import UseAuth from "../Hooks/UseAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddProduct = () => {
  const { addProduct } = useProducts();
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [dbUser, setDbUser] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
    image: "",
    file: null,
  });

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then(res => setDbUser(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const handleChange = (e) =>
    setData({ ...data, [e.target.id]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setData({ ...data, file, image: URL.createObjectURL(file) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dbUser) return;

    let uploadedImageURL = data.image;

    if (data.file) {
      const formData = new FormData();
      formData.append("image", data.file);
      try {
        const res = await axiosSecure.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploadedImageURL = res.data.url;
      } catch (err) {
        console.error("Image upload failed:", err);
        alert("Image upload failed!");
        return;
      }
    }

    const productData = {
      name: data.name,
      category: data.category,
      price: Number(data.price),
      offerPrice: Number(data.offerPrice),
      image: [uploadedImageURL],
      description: data.description.split("\n"),
         
      addedBy: {
        role: dbUser.role,
        storeName:
          dbUser.role === "admin"
            ? "GroceryBD Official"
            : dbUser.firstName,
      },
      inStock: true,
      createdAt: new Date(),
       sellerEmail: user.email,
    };

    try {
      await addProduct(productData);
      navigate("/all-products");
    } catch (err) {
      console.error(err);
      alert("Failed to add product!");
    }
  };

  return (
    <div className="py-10 bg-white px-4 sm:px-6 lg:px-0">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 max-w-lg mx-auto md:p-10 p-4 
                   border rounded-xl shadow-sm"
      >
        {/* Image Upload */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <p className="text-sm font-medium">Product Image</p>
          <label className="cursor-pointer">
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleImage}
            />
            <img
              src={
                data.image ||
                "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png"
              }
              className="w-24 sm:w-28 mt-2 sm:mt-0"
              alt="upload"
            />
          </label>
        </div>

        {/* Name */}
        <input
          id="name"
          placeholder="Product Name"
          required
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full text-sm sm:text-base"
        />

        {/* Description */}
        <textarea
          id="description"
          placeholder="Each line = one bullet point"
          onChange={handleChange}
          rows={4}
          className="border px-3 py-2 rounded w-full resize-none text-sm sm:text-base"
        />

        {/* Category */}
        <select
          id="category"
          required
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full text-sm sm:text-base"
        >
          <option value="">Select Category</option>
          <option>Vegetables</option>
          <option>Fruits</option>
          <option>Dairy</option>
          <option>Drinks</option>
          <option>Grains</option>
          <option>Bakery</option>
          <option>Instant</option>
        </select>

        {/* Price */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            id="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full text-sm sm:text-base"
          />
          <input
            id="offerPrice"
            type="number"
            placeholder="Offer Price"
            onChange={handleChange}
            className="border px-3 py-2 rounded w-full text-sm sm:text-base"
          />
        </div>

        {/* Button */}
        <button className="w-full sm:w-auto px-8 py-2 
                           bg-indigo-500 text-white rounded 
                           text-sm sm:text-base">
          ADD PRODUCT
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
