import { NavLink } from "react-router-dom";
import useRole from "../../../../hooks/useRole";
import AdminMenu from "./AdminMenu";
import SellerMenu from "./SellerMenu";
import { FiFileText } from "react-icons/fi";

const Sidebar = () => {

  const [role] = useRole()
  console.log(role)
    return (
        <div className="h-screen fixed top-10 left-0 w-64 bg-green-500 text-white flex flex-col">
          
        {/* Sidebar Header */}
  
        {/* Navigation NavLinks */}
        <nav className="flex-1 p-4 space-y-2">
          {/* admin menu */}
        { role === 'admin' && <AdminMenu />}

          {/* seller emnu */}
         { role === 'seller' && <SellerMenu />}
         {role === 'user' && <NavLink
                     to="payment-history-user"
                     className="flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-gray-700"
                   >
                     <FiFileText size={20} />
                     <span>Payment History</span>
                   </NavLink>}
        </nav>
      </div>
    );
};

export default Sidebar;