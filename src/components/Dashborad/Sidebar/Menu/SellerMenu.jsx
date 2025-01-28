import { BiHelpCircle, BiPackage } from "react-icons/bi";
import { FiFileText } from "react-icons/fi";
import { Link } from "react-router-dom";

const SellerMenu = () => {
    return (
        <div>
            {/* Manage Medicines */}
          <Link
            to="manage-medicine"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiPackage size={20} />
            <span>Manage Medicines</span>
          </Link>
  
          {/* Payment History */}
          <Link
            to="payment-history"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <FiFileText size={20} />
            <span>Payment History</span>
          </Link>
  
          {/* Ask for Advertisement */}
          <Link
            to="ask-for-advertisement"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700"
          >
            <BiHelpCircle size={20} />
            <span>Ask For Advertisement</span>
          </Link>
        </div>
    );
};

export default SellerMenu;