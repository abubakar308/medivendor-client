/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import Loading from "../Shared/Loading/Loading";

const SellerRoute = ({children}) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <Loading />
    if (role === 'seller') return children
    return <Navigate to='/dashboard' replace='true' />
};

export default SellerRoute;