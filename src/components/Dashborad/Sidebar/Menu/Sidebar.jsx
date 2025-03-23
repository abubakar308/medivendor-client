import { Link, NavLink, useNavigate } from "react-router-dom";
import useRole from "../../../../hooks/useRole";
import AdminMenu from "./AdminMenu";
import SellerMenu from "./SellerMenu";
import { FiFileText } from "react-icons/fi";
import logo from "../../../../assets/medIVENDOR.png";
import useAuth from "../../../../hooks/useAuth";

const Sidebar = ({ closeSidebar }) => {
  const [role] = useRole();
  const {logOut} = useAuth()
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 fixed flex flex-col bg-green-500 text-white dark:bg-neutral-800">
      {/* Sidebar Header */}
      <Link to="/" className="flex items-center border-b justify-center py-4 dark:bg-neutral-700">
        <img className="w-12" src={logo} alt="Logo" />
        <h2 className="text-xl font-bold">MediVendor</h2>
      </Link>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 mt-4 space-y-2">
        {/* Admin Menu */}
        {role === "admin" && <AdminMenu closeSidebar={closeSidebar} />}

        {/* Seller Menu */}
        {role === "seller" && <SellerMenu closeSidebar={closeSidebar} />}

        {/* Payment History for Users */}
        {role === "user" && (
          <NavLink
            to="payment"
            onClick={closeSidebar} // Close sidebar on click
            className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-gray-700 dark:hover:bg-neutral-600"
          >
            <FiFileText size={20} />
            <span className="text-gray-900 dark:text-white">Payment History</span>
          </NavLink>
        )}
      </nav>
      {/* sidebar profile */}
       <NavLink to='profile' className="block px-4 py-2 hover:bg-gray-200">Profile</NavLink>
       <button onClick={handleLogout} className="block w-full text-center py-2 hover:bg-gray-700">
  Logout
</button>
    </div>
  );
};

export default Sidebar;
