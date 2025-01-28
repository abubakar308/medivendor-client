/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
import { Navigate } from "react-router-dom"
import useRole from "../hooks/useRole"
import Loading from "../Shared/Loading/Loading"


const AdminRoute = ({children}) => {
    const [role, isLoading] = useRole()

    if (isLoading) return <Loading />
    if (role === 'admin') return children
    return <Navigate to='/dashboard' replace='true' />
  }
  
//   AdminRoute.propTypes = {
//     children: propTypes.element,
// };

export default AdminRoute;