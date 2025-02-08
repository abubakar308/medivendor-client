import { BiBarChart, BiCreditCard } from "react-icons/bi";
import { FaAd, FaUsersCog } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
    return (
        <div>
             {/* Manage Users */}
          <NavLink
            to="manage-users"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
           <FaUsersCog size={20}/>
            <span>Manage Users</span>
          </NavLink>
  
          {/* Manage Category */}
          <NavLink
            to="manage-category"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
           <MdCategory size={20}/>
            <span>Manage Category</span>
          </NavLink>
  
          {/* Payment Management */}
          <NavLink
            to="payment-management"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiCreditCard size={20} />
            <span>Payment Management</span>
          </NavLink>
  
          {/* Sales Report */}
          <NavLink
           to="/dashboard"
           className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg ${
              isActive ? "active text-white" : "hover:bg-gray-700 text-gray-300"
            }`
          }
          >
            <BiBarChart size={20} />
            <span>Sales Report</span>
          </NavLink>
  
          {/* Manage Banner Advertise */}
          <NavLink
            to="manage-banner"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
           <FaAd size={20}/>
            <span>Manage Banner Advertise</span>
          </NavLink>
        </div>
    );
};

export default AdminMenu;