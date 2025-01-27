import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { IoCart } from "react-icons/io5";


const Navbar = () => {
    const { user, logOut } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
           <div className="navbar fixed bg-green-500">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
         <li><Link to='/'>Home</Link></li>
    <li><Link to="/allsports">All Sports Equipment</Link></li>
    <li><Link to="addequipment">Add Equipment</Link></li>
    <li><Link to="myequipment">My Equipment List</Link></li>
      </ul>
    </div>
   <div className="flex items-center gap-1">
   <a className="">Medicine Store</a>
   <img className="w-12" src='' alt="" />
   </div>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
    <li><Link to='/'>Home</Link></li>
    <li><Link to="/shop">Shop</Link></li>
    </ul>
    
    <Link to='/cart' className="text-3xl">
    <IoCart></IoCart>
    </Link>
  </div>
  <Link className="ml-10" to="myequipment">Language</Link>
  <div className="navbar-end">
  <div className='relative'>
              <div className='flex flex-row items-center gap-3'>
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
                >
                 <div className="sm:hidden">
                 < AiOutlineMenu />
                 </div>
                  <div className='hidden md:block'>
                    {/* Avatar */}
                   {user?
                     <img
                     className='rounded-full'
                     referrerPolicy='no-referrer'
                     src={user?.photoURL}
                     alt='profile'
                     height='30'
                     width='30'
                   />:
                   <p>Join us</p>
                   }
                  </div>
                </div>
              </div>
              {isOpen && (
                <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                  <div className='flex flex-col cursor-pointer'>
                    <Link
                      to='/'
                      className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Home
                    </Link>

                    {user ? (
                      <>
                        <Link
                          to='/dashboard'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Dashboard
                        </Link>
                        <div
                          onClick={logOut}
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                        >
                          Logout
                        </div>
                      </>
                    ) : (
                      <>
                        <Link
                          to='/login'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Login
                        </Link>
                        <Link
                          to='/signup'
                          className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                        >
                          Sign Up
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
  </div>
</div>
        </div>
    );
};

export default Navbar;