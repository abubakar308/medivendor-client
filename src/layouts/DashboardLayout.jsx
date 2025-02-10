import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Sidebar from "../components/Dashborad/Sidebar/Menu/Sidebar";
import { useState } from "react";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  

  return (
    <div>
    {/* Navbar */}
    <Navbar onToggleSidebar={() => { 
    setIsSidebarOpen(!isSidebarOpen); 
}} />
    <div className="flex">
      {/* Sidebar for Large Screens */}
      <div className="hidden md:block md:w-64">
        <Sidebar />
      </div>

      {/* Sidebar for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div className="w-64 bg-green-500 h-full shadow-lg p-4 relative">
            <Sidebar />
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsSidebarOpen(false)}
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-[calc(100vh-320px)] md:mt-20 mt-24 p-4">
        <Outlet />
      </div>
    </div>
  </div>
    );
};

export default DashboardLayout;