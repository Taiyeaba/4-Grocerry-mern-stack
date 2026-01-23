import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import UseAuth from "../Hooks/UseAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { LogOut, Bell, ChevronDown } from "lucide-react";

const SellerNavbar = () => {
  const { logOut, user } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [dbUser, setDbUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ FETCH USER FROM DB (IMPORTANT)
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then(res => {
          setDbUser(res.data);
          console.log("DB USER 👉", res.data);
        })
        .catch(err => {
          console.error("User fetch failed", err);
          setDbUser(null);
        });
    }
  }, [user, axiosSecure]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  const role = dbUser?.role;

  const panelTitle =
    role === "admin" ? "Admin Dashboard" : "Seller Dashboard";

  const panelSubtitle =
    role === "admin" ? "Admin Panel" : "Seller Panel";

  return (
    <header className="sticky top-0 z-50 h-16 bg-white border-b border-gray-100 shadow-sm flex items-center justify-between px-6">
      {/* Left */}
      <Link to="/" className="flex items-center gap-3">
        <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold">
          G
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-800">
            Grocery <span className="text-emerald-600">{panelTitle}</span>
          </h1>
          <p className="text-xs text-gray-500 -mt-1">{panelSubtitle}</p>
        </div>
      </Link>

      {/* Right */}
      <div className="flex items-center gap-4">
        

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-2"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold">
                {user?.email?.split("@")[0]}
              </p>
              <p className="text-xs text-emerald-600">
                {role === "admin" ? "Admin Online" : "Seller Online"}
              </p>
            </div>

            <ChevronDown size={16} />
          </button>

          {showDropdown && (
            <div className="absolute right-0 top-14 w-56 bg-white border rounded-lg shadow">
              <div className="px-4 py-3 border-b">
                <p className="font-semibold">{user?.email}</p>
                <p className="text-xs text-gray-500">{role}</p>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="hidden sm:flex items-center gap-2 px-4 py-2 border rounded-lg"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default SellerNavbar;
