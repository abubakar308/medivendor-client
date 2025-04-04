import { Link, NavLink, useNavigate } from "react-router-dom";
import useRole from "../../../../hooks/useRole";
import AdminMenu from "./AdminMenu";
import SellerMenu from "./SellerMenu";
import { FiFileText } from "react-icons/fi";
import logo from "../../../../assets/medIVENDOR.png";
import useAuth from "../../../../hooks/useAuth";

const Sidebar = ({ closeSidebar }) => {
  const [role] = useRole();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/login");
    closeSidebar(); // Logout করলে Sidebar বন্ধ হবে
  };

  return (
    <div className="h-screen w-64 fixed flex flex-col bg-primary text-white  shadow-lg">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b dark:border-neutral-600">
        <Link to="/" className="flex items-center gap-2">
          <img className="w-10" src={logo} alt="Logo" />
          <h2 className="text-xl font-bold">MediVendor</h2>
        </Link>
      </div>

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
            onClick={closeSidebar}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-neutral-600 transition duration-200"
          >
            <FiFileText size={20} />
            <span className="">Payment History</span>
          </NavLink>
        )}

       
      </nav>

       {/* Profile Link */}
       <NavLink
          to="profile"
          onClick={closeSidebar}
          className="block px-4 py-3 rounded-lg hover:bg-gray-700 dark:hover:bg-neutral-600 transition duration-200"
        >
          Profile
        </NavLink>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="py-3 mb-5 md:mb-0 bg-accent text-white font-semibold transition duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
