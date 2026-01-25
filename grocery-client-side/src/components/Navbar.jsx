import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import logo from '../assets/logo.png';
import UseAuth from '../Hooks/UseAuth';
import Swal from 'sweetalert2';
import { useCart } from "../Context/CartContext";
import { User } from 'lucide-react';

const Navbar = () => {
  const [searchText, setSearchText] = useState("");

  const { cartCount } = useCart();
  const navigate = useNavigate();
  const { user, logOut, role } = UseAuth();
  console.log(user, role,);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const accountRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = (
    <>


      {(role === "admin" || role === "seller") && (
        <li>
          <NavLink
            to="/seller"
            className={({ isActive }) =>
              isActive
                ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600'
                : 'text-gray-700 hover:text-emerald-600 transition-colors'
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
        </li>
      )}



      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600'
              : 'text-gray-700 hover:text-emerald-600 transition-colors'
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-products"
          className={({ isActive }) =>
            isActive
              ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600'
              : 'text-gray-700 hover:text-emerald-600 transition-colors'
          }
          onClick={() => setIsMenuOpen(false)}
        >
          All Products
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          text: 'You have logged out successfully',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message || 'Something went wrong!'
        });
      });
  };




  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Main Navbar - Height fixed */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-gray-700 p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>

            {/* Logo */}
            <div className="flex items-center">
              <NavLink to="/" className="flex items-center">
                <img
                  src={logo}
                  alt="Grocery Logo"
                  className="h-14 w-auto object-contain"
                />

              </NavLink>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <ul className="flex space-x-8">{navItems}</ul>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4 md:space-x-6">


            {/* Mobile Search Icon.......... */}
            <button
              className="md:hidden p-2 bg-emerald-50 rounded-full text-emerald-600"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <FaSearch size={16} />
            </button>




            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center bg-white rounded-xl px-4 py-2 w-80 border border-emerald-200 shadow-sm hover:shadow-md transition-shadow focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
              <div className="flex items-center w-full">
                <FaSearch className="text-emerald-500 mr-3 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search vegetables, fruits, dairy..."
                  value={searchText}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchText(value);

                    // 🔥 live search
                    navigate(`/all-products?search=${value}`);
                  }}
                  className="flex-1 bg-transparent focus:outline-none text-sm placeholder-gray-500 w-full"
                />


              </div>
            </div>

            {/* Mobile Search Button */}
            <button
              className="text-emerald-600 text-sm ml-3 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
              onClick={() => {
                navigate(`/all-products?search=${searchText}`);
                setIsSearchOpen(false);
              }}
            >
              Search
            </button>




            {/* User Account Dropdown */}
            <div className="relative" ref={accountRef}>
              <button
                className="flex items-center space-x-1 md:space-x-2 text-gray-700 hover:text-emerald-600 focus:outline-none group"
                onClick={() => setIsAccountOpen(!isAccountOpen)}
              >
                <div
                  className={`p-2 rounded-full transition-colors
                  ${user
                      ? 'bg-emerald-50 ring-2 ring-emerald-500'
                      : 'bg-gray-100 group-hover:bg-emerald-100'}
                       `}
                >
                  <FaUser
                    size={16}
                    className={user ? 'text-emerald-600' : 'text-gray-700'}
                  />
                </div>

                <div className="hidden md:flex flex-col leading-tight text-left">
                  <span className="text-sm font-medium">Account</span>

                  {user && (
                    <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                      Online
                    </span>
                  )}
                </div>

                <FaChevronDown
                  size={12}
                  className={`hidden md:inline transition-transform duration-200 ${isAccountOpen ? 'rotate-180' : ''}`}
                />

              </button>

              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 animate-fadeIn">
                  <div className="py-2">


                    <Link
                      to='/profile'
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <span className="mr-2"><User size={20}></User></span> My Profile
                    </Link>



                    {
                      user ? (
                        <button onClick={handleLogout} className='flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-colors'>  <span className="mr-2">👤</span> Logout</button>
                      ) : (
                        <Link
                          to='/auth/login'
                          className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-colors"
                          onClick={() => setIsAccountOpen(false)}
                        >
                          <span className="mr-2">👤</span> Login
                        </Link>
                      )
                    }



                    <Link
                      to='/auth/register'
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-colors"
                      onClick={() => setIsAccountOpen(false)}
                    >
                      <span className="mr-2">📝</span> Register
                    </Link>
                    <hr className="my-1 border-gray-200" />
                    {user && role == "user" && (
                      <Link
                        to="/my-order"
                        className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 hover:text-emerald-600 transition-colors"
                        onClick={() => setIsAccountOpen(false)}
                      >
                        <span className="mr-2">📦</span> My Orders
                      </Link>
                    )}




                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart */}
            <div className="relative">
              <NavLink
                to="/cart"
                className="flex items-center"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsAccountOpen(false);
                }}
              >
                <div
                  onClick={() => navigate("/cart")}
                  className="relative p-2 bg-gray-100 rounded-full hover:bg-emerald-100 transition-colors">
                  <FaShoppingCart size={18} className="text-gray-700" />
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {cartCount}
                  </span>
                </div>

              </NavLink>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden pb-3 animate-fadeIn">
            <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-emerald-200 shadow-sm">
              <FaSearch className="text-emerald-500 flex-shrink-0" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchText(value);
                  navigate(`/all-products?search=${value}`);
                }}
                placeholder="What are you looking for?"
                className="bg-transparent ml-3 w-full focus:outline-none text-black text-sm placeholder-gray-400"
              />

              <button
                className="text-emerald-600 text-sm ml-3 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors flex-shrink-0"
                onClick={() => {
                  navigate(`/all-products?search=${searchText}`);
                  setIsSearchOpen(false);
                }}
              >
                Search
              </button>
            </div>
          </div>
        )}


        {/* Mobile Menu */}
        {/* {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 pt-4 pb-3 animate-fadeIn">
            <ul className="space-y-3 px-2">
              {React.Children.map(navItems.props.children, (child) =>
                React.cloneElement(child, {
                  className: child.props.className + " block py-2 px-3 rounded-lg hover:bg-emerald-50",
                  onClick: () => setIsMenuOpen(false)
                })
              )}
            </ul>
          </div>
        )} */}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 pt-4 pb-3 animate-fadeIn">
            <ul className="space-y-3 px-2">
              {(role === "admin" || role === "seller") && (
                <li>
                  <NavLink
                    to="/seller"
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-lg ${isActive
                        ? "bg-emerald-50 text-emerald-600 font-semibold"
                        : "text-gray-700 hover:bg-emerald-50"
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
              )}

              <li>
                <NavLink
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-lg ${isActive
                      ? "bg-emerald-50 text-emerald-600 font-semibold"
                      : "text-gray-700 hover:bg-emerald-50"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/all-products"
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 px-3 rounded-lg ${isActive
                      ? "bg-emerald-50 text-emerald-600 font-semibold"
                      : "text-gray-700 hover:bg-emerald-50"
                    }`
                  }
                >
                  All Products
                </NavLink>
              </li>
            </ul>
          </div>
        )}



      </div>
    </nav>
  );
};

export default Navbar;