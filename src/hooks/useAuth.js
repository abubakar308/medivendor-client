import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
const useAuth = () => {
   const auth = useContext(AuthContext);
   return auth;
};

export default useAuth;

export const saveUser = async (user) => {
   await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
     name: user?.displayName,
     image: user?.photoURL,
     email: user?.email,
   })
 }