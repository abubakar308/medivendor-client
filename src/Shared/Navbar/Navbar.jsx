/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCart, IoCloseSharp } from "react-icons/io5";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/medIVENDOR.png";
import Clock from "../Clock";

const Navbar = ({ onToggleSidebar }) => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Theme State with Persistence
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setIsShow(location.pathname.startsWith("/dashboard"));
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-menu")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed z-50 w-full mx-auto backdrop-blur-md bg-primary shadow-md">
      <div className="flex max-w-screen-xl mx-auto items-center justify-between px-6 py-3">
        {/* Left Side: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {isShow && (
            <button className="lg:hidden text-white text-2xl" onClick={onToggleSidebar}>
              <AiOutlineMenu />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <img className="rounded-2xl w-12 h-10" src={logo} alt="logo" />
            <span className="text-lg font-semibold text-white">MEDIVENDOR</span>
          </Link>
          <Clock />
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden text-white text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
         {isMobileMenuOpen? <IoCloseSharp /> :<AiOutlineMenu />}
        </button>

        {/* Center Navigation for Large Screens */}
        <ul className="hidden lg:flex space-x-6 text-white">
          <li><NavLink to="/" className="hover:text-gray-200 p-2 rounded-xl">Home</NavLink></li>
          <li><NavLink to="/shop" className="hover:text-gray-200 p-2 rounded-xl">Shop</NavLink></li>
          <li><NavLink to="/aboutus" className="hover:text-gray-200 p-2 rounded-xl">AboutUs</NavLink></li>
        </ul>

        {/* Right Side: User Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="text-white text-xl">
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          {/* Cart Icon */}
          {user?.email && (
            <NavLink to='/cart' className="text-2xl text-white">
              <IoCart />
            </NavLink>
          )}

          {/* Profile & Dropdown */}
          <div className="relative dropdown-menu">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(!isOpen);
              }}
              className="flex items-center gap-2 px-3 py-1 border rounded-full text-white"
            >
              <AiOutlineMenu />
              {user ? <img className="rounded-full w-8 h-8" src={user.photoURL} alt="profile" /> : <p>Join</p>}
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg overflow-hidden">
                {user ? (
                  <>
                    <NavLink to='/dashboard' className="block px-4 py-2 hover:bg-gray-200">Dashboard</NavLink>
                    <button onClick={logOut} className="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
                  </>
                ) : (
                  <>
                    <NavLink to='/login' className="block px-4 py-2 hover:bg-gray-200">Login</NavLink>
                    <NavLink to='/signup' className="block px-4 py-2 hover:bg-gray-200">Sign Up</NavLink>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-primary text-white py-4 space-y-4">
          <NavLink to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-center py-2 hover:bg-gray-700">Home</NavLink>
          <NavLink to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-center py-2 hover:bg-gray-700">Shop</NavLink>
          <NavLink to="/aboutus" onClick={() => setIsMobileMenuOpen(false)} className="block text-center py-2 hover:bg-gray-700">AboutUs</NavLink>

          {/* User Options in Mobile Menu */}
          {user?.email && (
            <>
              <NavLink to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="block text-center py-2 hover:bg-gray-700">Cart</NavLink>
              <NavLink to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-center py-2 hover:bg-gray-700">Dashboard</NavLink>
              <button onClick={logOut} className="block w-full text-center py-2 hover:bg-gray-700">Logout</button>
            </>
          )}

          {!user && (
            <>
              <NavLink to="/login" className="block text-center py-2 hover:bg-gray-700">Login</NavLink>
              <NavLink to="/signup" className="block text-center py-2 hover:bg-gray-700">Sign Up</NavLink>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="block text-center py-2 text-white">
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
