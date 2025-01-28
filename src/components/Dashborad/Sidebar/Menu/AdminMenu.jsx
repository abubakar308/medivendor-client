import { BiBarChart, BiCreditCard } from "react-icons/bi";
import { Link } from "react-router-dom";

const AdminMenu = () => {
    return (
        <div>
             {/* Manage Users */}
          <Link
            to="manage-users"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
           
            <span>Manage Users</span>
          </Link>
  
          {/* Manage Category */}
          <Link
            to="manage-category"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
           
            <span>Manage Category</span>
          </Link>
  
          {/* Payment Management */}
          <Link
            to="payment-management"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiCreditCard size={20} />
            <span>Payment Management</span>
          </Link>
  
          {/* Sales Report */}
          <Link
            to="sales-report"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiBarChart size={20} />
            <span>Sales Report</span>
          </Link>
  
          {/* Manage Banner Advertise */}
          <Link
            to="manage-banner"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
           
            <span>Manage Banner Advertise</span>
          </Link>
        </div>
    );
};

export default AdminMenu;