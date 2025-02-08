import { BiHelpCircle, BiPackage } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const SellerMenu = () => {
    return (
        <div>
            {/* Manage Medicines */}
          <NavLink
            to="manage-medicine"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiPackage size={20} />
            <span>Manage Medicines</span>
          </NavLink>
  
          {/* Payment History */}
          <NavLink
            to="payment-history"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <FiFileText size={20} />
            <span>Payment History</span>
          </NavLink>
  
          {/* Ask for Advertisement */}
          <NavLink
            to="ask-for-advertisement"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiHelpCircle size={20} />
            <span>Ask For Advertisement</span>
          </NavLink>
        </div>
    );
};

export default SellerMenu;