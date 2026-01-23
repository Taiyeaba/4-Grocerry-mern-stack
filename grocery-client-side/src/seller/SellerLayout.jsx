import React from "react";
import { NavLink, Outlet } from "react-router";
import SellerNavbar from "./SellerNavbar";

const SellerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col container mx-auto">

      {/* TOP NAVBAR */}
      <SellerNavbar />

      {/* BODY */}
      <div className="flex flex-1 flex-col md:flex-row">

        {/* SIDEBAR */}
        <aside className="w-full md:w-64 bg-white border-r md:border-r p-3 md:p-4">

          {/* NavLink container */}
          <nav className="flex md:flex-col justify-center md:justify-start gap-3 md:gap-2">

            <NavLink
              to="/seller/add-product"
              className={({ isActive }) =>
                `px-4 py-3 rounded text-lg md:text-base whitespace-nowrap font-medium ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "hover:bg-gray-100"
                } text-center md:text-left`
              }
            >
              ➕ Add Product
            </NavLink>

            <NavLink
              to="/seller/products"
              className={({ isActive }) =>
                `px-4 py-3 rounded text-lg md:text-base whitespace-nowrap font-medium ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "hover:bg-gray-100"
                } text-center md:text-left`
              }
            >
              📦 Product List
            </NavLink>

            <NavLink
              to="/seller/orders"
              className={({ isActive }) =>
                `px-4 py-3 rounded text-lg md:text-base whitespace-nowrap font-medium ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "hover:bg-gray-100"
                } text-center md:text-left`
              }
            >
              🧾 Orders
            </NavLink>

          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-gray-50 p-4 sm:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default SellerLayout;