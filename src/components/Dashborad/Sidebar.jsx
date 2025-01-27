import { BiBarChart, BiCreditCard, BiHelpCircle, BiPackage } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="h-screen fixed top-10 left-0 w-64 bg-green-500 text-white flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 text-center font-bold text-lg border-b border-gray-700">
          Admin Dashboard
        </div>
  
        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          {/* Manage Users */}
          <Link
            to="/manage-users"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
           
            <span>Manage Users</span>
          </Link>
  
          {/* Manage Category */}
          <Link
            to="/manage-category"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
           
            <span>Manage Category</span>
          </Link>
  
          {/* Payment Management */}
          <Link
            to="/payment-management"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiCreditCard size={20} />
            <span>Payment Management</span>
          </Link>
  
          {/* Sales Report */}
          <Link
            to="/sales-report"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiBarChart size={20} />
            <span>Sales Report</span>
          </Link>
  
          {/* Manage Banner Advertise */}
          <Link
            to="/manage-banner"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
           
            <span>Manage Banner Advertise</span>
          </Link>
  
          {/* Manage Medicines */}
          <Link
            to="/manage-medicines"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiPackage size={20} />
            <span>Manage Medicines</span>
          </Link>
  
          {/* Payment History */}
          <Link
            to="/payment-history"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <FiFileText size={20} />
            <span>Payment History</span>
          </Link>
  
          {/* Ask for Advertisement */}
          <Link
            to="/ask-for-advertisement"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiHelpCircle size={20} />
            <span>Ask For Advertisement</span>
          </Link>
        </nav>
      </div>
    );
};

export default Sidebar;