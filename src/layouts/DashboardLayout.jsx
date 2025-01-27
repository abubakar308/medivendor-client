import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div>
           <p>category</p>
           <Outlet></Outlet>
        </div>
    );
};

export default DashboardLayout;