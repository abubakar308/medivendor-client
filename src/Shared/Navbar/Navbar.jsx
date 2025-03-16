/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import { Link, NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logo from "../../assets/logo.webp";
import Clock from "../Clock";
import { useTranslation } from "react-i18next";

const Navbar = ({ onToggleSidebar }) => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const location = useLocation();

  const { t, i18n } = useTranslation(); // Use translation hook

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang).then(() => {
    }).catch((error) => {
      console.error("Error changing language:", error);
    });
  };


  // Theme State with Persistence
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Show Sidebar Toggle Only on Dashboard Pages
  useEffect(() => {
    setIsShow(location.pathname.startsWith("/dashboard"));
  }, [location.pathname]);

  // Close Dropdown on Outside Click
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
    <nav className="fixed z-50 w-full backdrop-blur-md bg-primary shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Side: Logo & Sidebar Toggle */}
        <div className="flex items-center gap-4">
          {isShow && (
            <button className="lg:hidden text-white text-2xl" onClick={onToggleSidebar}>
              <AiOutlineMenu />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2">
            <img className="rounded-2xl w-10 h-10" src={logo} alt="logo" />
          </Link>
          <Clock />
        </div>

        {/* Center Navigation for Large Screens */}
        <ul className="hidden lg:flex space-x-6 text-white">
          <li><NavLink to="/" className="hover:text-gray-200 p-2 rounded-xl">{t("home")}</NavLink></li>
          <li><NavLink to="/shop" className="hover:text-gray-200 p-2 rounded-xl">{t("shop")}</NavLink></li>
        </ul>

        {/* Right Side: User Actions */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button onClick={toggleTheme} className="text-white">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
      <select onChange={(e) => changeLanguage(e.target.value)} className="p-1">
        <option value="en">🇬🇧 English</option>
        <option value="bn">🇧🇩 বাংলা</option>
      </select>

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
                    <NavLink to='/profile' className="block px-4 py-2 hover:bg-gray-200">Profile</NavLink>
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
    </nav>
  );
};

export default Navbar;