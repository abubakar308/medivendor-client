import { Outlet } from "react-router-dom";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import Sidebar from "../components/Dashborad/Sidebar/Menu/Sidebar";

const DashboardLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="flex gap-3">
    {/* Sidebar */}
    <div className="hidden  md:block md:w-64">
      <Sidebar />
    </div>

    {/* Main Content */}
    <div className="flex-1 md:mt-20 mt-24">
      <Outlet />
    </div>
  </div>
           <Footer />
        </div>
    );
};

export default DashboardLayout;