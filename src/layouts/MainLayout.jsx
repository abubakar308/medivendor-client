import { Outlet } from "react-router-dom";
import Footer from "../Shared/Footer/Footer";
import Navbar from "../Shared/Navbar/Navbar";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
           <div className="pt-16 min-h-[calc(100vh-68px)]">
            <Outlet></Outlet>
           </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;