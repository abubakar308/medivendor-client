import useRole from "../../../../hooks/useRole";
import AdminMenu from "./AdminMenu";
import SellerMenu from "./SellerMenu";

const Sidebar = () => {

  const [role] = useRole()
  console.log(role)
    return (
        <div className="h-screen fixed top-10 left-0 w-64 bg-green-500 text-white flex flex-col">
          
        {/* Sidebar Header */}
  
        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2">
          {/* admin menu */}
        { role === 'admin' && <AdminMenu />}

          {/* seller emnu */}
         { role === 'seller' && <SellerMenu />}
        </nav>
      </div>
    );
};

export default Sidebar;