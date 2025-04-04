import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashborad/Sidebar/Menu/Sidebar";
import { useState, useEffect } from "react";
import { FaBoxOpen, FaCross } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("sidebarState")) || false
  );

  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  return (
    <div>
      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-50 flex"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            className="w-64 h-full shadow-lg transform transition-transform duration-300 ease-in-out translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
            <button
              className="absolute top-0 -right-4  p-2 rounded-full shadow-md transition"
              onClick={() => setIsSidebarOpen(false)}
            >
            <IoCloseSharp /> 
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar for Large Screens */}
        <div className="hidden md:block md:w-64">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen p-4">
          <div
            className="md:hidden justify-end p-2 flex rounded-md mb-4"
            onClick={() => setIsSidebarOpen(true)}
          >
            <AiOutlineMenu />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
