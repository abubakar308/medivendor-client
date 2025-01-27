import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Shop from "../pages/Shop/Shop";
import CategoryDetails from "../pages/CategoryDetails/CategoryDetails";
import CartPage from "../pages/Cart/CartPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Managecategory from "../pages/Dashboard/Admin/Managecategory";
import Manageuser from "../pages/Dashboard/Admin/Manageuser";
import ManageBanner from "../pages/Dashboard/Admin/ManageBanner";
import Managepayment from "../pages/Dashboard/Admin/Managepayment";
import ManageMedicine from "../pages/Dashboard/Seller/ManageMedicine";
import PaymentHistory from "../pages/Dashboard/User/PaymentHistory";
import PaymentHistorySeller from "../pages/Dashboard/Seller/PaymentHistorySeller";
import Salesreport from "../pages/Dashboard/Admin/Salesreport";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                path:"/",
                element: <Home></Home>
            },
            {
              path: '/shop',
              element: <Shop></Shop>
            },
            {
              path: '/medicine/:category',
              element: <CategoryDetails></CategoryDetails>
            },
            {
              path: '/cart',
              element: <CartPage></CartPage>
            }
        ]
      },
      {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
          {
            path: 'manage-category',
            element: <Managecategory />
          },
          {
            path: 'manage-users',
            element: <Manageuser />
          },
          {
            path: 'manage-banner',
            element: <ManageBanner />
          },
          {
            path: 'payment-management',
            element: <Managepayment />
          },
          {
            path: 'manage-medicine',
            element: <ManageMedicine />
          },
          {
            path: 'payment-history-user',
            element: <PaymentHistory />
          },
          {
            path: 'payment-history-seller',
            element: <PaymentHistorySeller />
          },
          {
            path: 'sales-report',
            element: <Salesreport />
          },
        ]
      },
      {
        path: '/signup',
        element: <SignUp></SignUp>
      },
      {
        path: '/login',
        element: <Login></Login>
      }
])
