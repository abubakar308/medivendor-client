/* eslint-disable react/prop-types */
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCart } from "react-icons/io5";
import logo from '../../assets/logo.webp'
import { Link, NavLink } from "react-router-dom";
import Clock from "../Clock";

const Navbar = ({ onToggleSidebar }) => {
  console.log(onToggleSidebar); 
    const { user, logOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false);

    const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };


    return (
      <nav className="fixed z-50 w-full backdrop-blur-md bg-green-500 shadow-md">
      <div className="flex items-center justify-between px-6 py-3">
          
          {/* Left Side: Logo & Sidebar Toggle */}
          <div className="flex items-center gap-4">
          <button className="lg:hidden text-white text-2xl" onClick={onToggleSidebar}>
            <AiOutlineMenu />
        </button>
                    <Link to="/" className="flex items-center gap-2">
                        <img className="rounded-2xl w-10 h-10" src={logo} alt="logo" />
                    </Link>
                    <Clock />
                </div>

                {/* Center Navigation for Large Screens */}
                <ul className="hidden lg:flex space-x-6 text-white">
                    <li><NavLink to="/" className="hover:text-gray-200">Home</NavLink></li>
                    <li><NavLink to="/shop" className="hover:text-gray-200">Shop</NavLink></li>
                </ul>

                {/* Right Side: User Actions */}
                <div className="flex items-center gap-4">
                    {/* Dark Mode Toggle */}
                    <button onClick={toggleTheme} className="text-white">
                        {theme === "light" ? "🌙" : "☀️"}
                    </button>

                    {/* Cart Icon */}
                    {user?.email && (
                        <NavLink to='/cart' className="text-2xl text-white">
                            <IoCart />
                        </NavLink>
                    )}

                    {/* Profile & Dropdown */}
                    <div className="relative">
                        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-2 px-3 py-1 border rounded-full text-white">
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