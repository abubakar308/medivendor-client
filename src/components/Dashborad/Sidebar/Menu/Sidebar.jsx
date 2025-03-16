import { NavLink } from "react-router-dom";
import useRole from "../../../../hooks/useRole";
import AdminMenu from "./AdminMenu";
import SellerMenu from "./SellerMenu";
import { FiFileText } from "react-icons/fi";

const Sidebar = () => {
  const [role] = useRole();
  console.log(role);

  return (
    <div className="h-screen fixed top-10 left-0 w-64 flex flex-col bg-green-500 text-white dark:bg-neutral-800">
      {/* Sidebar Header */}
      <div className="flex items-center justify-center py-4 bg-green-600 dark:bg-neutral-700">
        <h2 className="text-xl font-bold">MediVendor</h2>
      </div>

      {/* Navigation NavLinks */}
      <nav className="flex-1 p-4 mt-4 space-y-2">
        {/* Admin Menu */}
        {role === 'admin' && <AdminMenu />}

        {/* Seller Menu */}
        {role === 'seller' && <SellerMenu />}

        {/* Payment History for Users */}
        {role === 'user' && (
          <NavLink
            to="payment"
            className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-gray-700 dark:hover:bg-neutral-600"
          >
            <FiFileText size={20} />
            <span className="text-gray-900 dark:text-white">Payment History</span>
          </NavLink>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
