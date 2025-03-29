import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth, { saveUser } from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { TbFidgetSpinner } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const [role, setRole] = useState("user"); // Default role

  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      navigate(getRedirectPath(role), { replace: true });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithGoogle();
      await saveUser(data?.user);
      navigate(getRedirectPath(role), { replace: true });
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const getRedirectPath = (role) => {
  //   switch (role) {
  //     case "admin": return "/admin/dashboard";
  //     case "seller": return "/seller/dashboard";
  //     default: return "/user/dashboard";
  //   }
  // };

  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <h1 className='my-3 text-4xl font-bold text-center'>Log In</h1>
        <select className='mb-4 p-2 border rounded' onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <input type='email' name='email' placeholder='Email' required className='w-full p-2 border rounded' />
          <input type='password' name='password' placeholder='Password' required className='w-full p-2 border rounded' />
          <button type='submit' className='bg-lime-500 w-full rounded-md py-3 text-white'>
            {loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : "Continue"}
          </button>
        </form>
        <button onClick={handleGoogleSignIn} className='flex items-center justify-center space-x-2 border m-3 p-2 cursor-pointer'>
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className='text-sm text-center'>Don't have an account? <NavLink to='/signup' className='text-lime-500'>Sign up</NavLink>.</p>
      </div>
    </div>
  );
};

export default Login;
