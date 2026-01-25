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
        <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r p-2 sm:p-3 md:p-4">

          {/* NavLink container */}
          <nav className="flex flex-row md:flex-col gap-2 md:gap-2 overflow-x-auto md:overflow-visible">

            <NavLink
              to="/seller/add-product"
              className={({ isActive }) =>
                `flex-shrink-0 px-4 py-2.5 rounded text-base md:text-base whitespace-nowrap font-medium
                ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "hover:bg-gray-100"
                }
                text-center md:text-left`
              }
            >
              ➕ Add Product
            </NavLink>

            <NavLink
              to="/seller/products"
              className={({ isActive }) =>
                `flex-shrink-0 px-4 py-2.5 rounded text-base md:text-base whitespace-nowrap font-medium
                ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "hover:bg-gray-100"
                }
                text-center md:text-left`
              }
            >
              📦 Product List
            </NavLink>

            <NavLink
              to="/seller/orders"
              className={({ isActive }) =>
                `flex-shrink-0 px-4 py-2.5 rounded text-base md:text-base whitespace-nowrap font-medium
                ${
                  isActive
                    ? "bg-emerald-100 text-emerald-700"
                    : "hover:bg-gray-100"
                }
                text-center md:text-left`
              }
            >
              🧾 Orders
            </NavLink>

          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 bg-gray-50 p-3 sm:p-4 md:p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default SellerLayout;
