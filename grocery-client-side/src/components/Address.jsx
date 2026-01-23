import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAddress } from "../Context/AddressContext";
import img from "../assets/add_address_image.svg";

const Address = () => {
  const navigate = useNavigate();
  const { addAddress } = useAddress();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    postal: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Save to backend + context
    await addAddress(formData);

    // ✅ Redirect to cart or anywhere
    navigate("/cart");
  };

  return (
    <div className="flex my-14 items-center justify-center px-4">
      <div className="max-w-6xl w-full bg-white rounded-2xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* FORM */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Add New Address</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="Street Address"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="w-full p-2 border rounded"
              required
            />
            <input
              name="postal"
              value={formData.postal}
              onChange={handleChange}
              placeholder="Postal Code"
              className="w-full p-2 border rounded"
              required
            />

            <button className="w-full py-3 bg-indigo-500 text-white rounded">
              Save Address
            </button>
          </form>
        </div>

        {/* IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-indigo-50">
          <img src={img} className="w-3/4" alt="Add Address" />
        </div>
      </div>
    </div>
  );
};

export default Address;
