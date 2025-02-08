import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";


const CartPage = () => {
    const {user} = useAuth();
    const {data: cartdata = [], isLoading, refetch } = useQuery({
        queryKey: ['cartdata', user?.email],
        queryFn: async () => {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/cart?email=${user?.email}`)
          return data
        },
        enabled: !!user?.email,
      })
      
      
      if(isLoading) return <Loading />;

      
      const removeItem = id =>{

        Swal.fire({
          title: "Are you sure?",
          text: "You want to delete this cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            axios
            .delete(`${import.meta.env.VITE_API_URL}/cart/${id}`)
            .then((data) => {
              console.log(data)
              refetch(); // Refetch only after successful deletion
            })
            .catch((error) => {
              console.error("Failed to delete the item:", error);
            });
            Swal.fire({
              title: "Deleted!",
              text: "Your cart has been deleted",
              icon: "success"
            });
          }
        });
      }

      const clearAllCart = ()=>{

        Swal.fire({
          title: "Are you sure?",
          text: "You want to clear all cart",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            axios
            .delete(`${import.meta.env.VITE_API_URL}/cart?email=${user?.email}`)
            .then(() => {
              refetch(); // Refetch only after successful deletion
            })
            .catch((error) => {
              console.error("Failed to delete the item:", error);
            })
            Swal.fire({
              title: "Deleted!",
              text: "Your carts has been cleared",
              icon: "success"
            });
          }
        });
      };

      const handleQuantity = (quantity, id) => {
        
        axios
            .put(`${import.meta.env.VITE_API_URL}/cart/${id}`, {quantity})
       
      }


    
    return (
        <div className="p-6 max-w-4xl mx-auto rounded-lg shadow-md">
          <Helmet>
            <title>Cart {user?.displayName}</title>
          </Helmet>
        <h2 className="text-2xl font-semibold mb-6">My Cart</h2>
        {cartdata?.length === 0 ? (
          <p className="text-center">Your cart is empty.</p>
        ) : (
          <div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-3 border-b-2 border-gray-300">Name</th>
                  <th className="p-3 border-b-2 border-gray-300">Company</th>
                  <th className="p-3 border-b-2 border-gray-300">Price</th>
                  <th className="p-3 border-b-2 border-gray-300">Quantity</th>
                  <th className="p-3 border-b-2 border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartdata?.map((item) => (
                  <tr key={item._id}>
                    <td className="p-3 border-b border-gray-300">{item.itemName}</td>
                    <td className="p-3 border-b border-gray-300">{item.companyName}</td>
                    <td className="p-3 border-b border-gray-300">${item.perUnitPrice}</td>
                    <td className="p-3 border-b border-gray-300 text-center">
                    <div className='space-x-2 mt-2 text-sm'>
                  <input
                  defaultValue={item?.quantity}
                    onChange={e => handleQuantity(parseInt(e.target.value), item._id)}
                    className=' p-2  border border-lime-300 focus:outline-lime-500 rounded-md '
                    name='quantity'
                    id='quantity'
                    type='number'
                    placeholder='Available quantity'
                    required
                  />
                </div>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <button
                        onClick={() => removeItem(item._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearAllCart}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Clear Cart
              </button>
              <div className="text-lg font-semibold">
                {/* Total: <span className="text-green-500">${calculateTotal()}</span> */}
              </div>
            </div>
            <div className="mt-6 text-right">
             <NavLink to='/checkout'>
             <button
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Checkout
              </button></NavLink>
            </div>
          </div>
        )}
      </div>
    );
};

export default CartPage;