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
import AskforBanner from "../pages/Dashboard/Seller/AskforBanner";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import Invoice from "../pages/Invoice/Invoice";
import Checkout from "../pages/Checkout/Checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyProfile from "../components/Dashborad/MyProfile";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

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
              element: <PrivateRoute>
                <CartPage />
              </PrivateRoute>
            },
            {
              path: '/checkout',
              element: <PrivateRoute>
      <Elements stripe={stripePromise}>
        <Checkout />
      </Elements>
              </PrivateRoute>
            },
            {
              path: '/invoice',
              element: <PrivateRoute>
                <Invoice />
              </PrivateRoute>
            },
        ]
      },
      {
        path: '/dashboard',
        element: <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>,
        children: [
          {
            index: true, // 👈 This makes Profile the default route when visiting "/dashboard"
            element: <MyProfile />,
          },
          {
            path: "profile", // 👈 This allows visiting "/dashboard/profile" without errors
            element: <MyProfile />,
          },
          {
            path: 'sales-report',
            element: <PrivateRoute>
              <AdminRoute>
              <Salesreport />
              </AdminRoute>
            </PrivateRoute>
          },
          {
            path: 'payment',
            element: <PrivateRoute>
              <PaymentHistory />
            </PrivateRoute>
          },
          {
            path: 'manage-category',
            element: <PrivateRoute>
              <AdminRoute>
              <Managecategory />
              </AdminRoute>
            </PrivateRoute>
          },
          {
            path: 'manage-users',
            element: <PrivateRoute>
              <AdminRoute>
              <Manageuser />
              </AdminRoute>
            </PrivateRoute>
          },
          {
            path: 'manage-banner',
            element: <PrivateRoute>
              <AdminRoute>
              <ManageBanner />
              </AdminRoute>
            </PrivateRoute>
          },
          {
            path: 'payment-management',
            element: <PrivateRoute>
              <AdminRoute>
              <Managepayment />
              </AdminRoute>
            </PrivateRoute>
          },
          {
            path: 'manage-medicine',
            element: <PrivateRoute>
              <SellerRoute>
              <ManageMedicine />
              </SellerRoute>
            </PrivateRoute>
          },
          {
            path: 'payment-history',
            element: <PrivateRoute>
              <SellerRoute>
              <PaymentHistorySeller />
              </SellerRoute>
            </PrivateRoute>
          },
          {
            path: 'ask-for-advertisement',
            element: <PrivateRoute>
              <SellerRoute>
              <AskforBanner />
              </SellerRoute>
            </PrivateRoute>
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
