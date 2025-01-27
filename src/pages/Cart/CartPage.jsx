import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";


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
        console.log(`Removing item with ID: ${id}`);
        axios
          .delete(`${import.meta.env.VITE_API_URL}/cart/${id}`)
          .then((data) => {
            console.log(data)
            refetch(); // Refetch only after successful deletion
          })
          .catch((error) => {
            console.error("Failed to delete the item:", error);
          });
      }

      const clearAllCart = ()=>{
        axios
          .delete(`${import.meta.env.VITE_API_URL}/cart?email=${user.email}`)
          .then((data) => {
            console.log(data)
            refetch(); // Refetch only after successful deletion
          })
          .catch((error) => {
            console.error("Failed to delete the item:", error);
          });
      }
    
    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Cart</h2>
        {cartdata?.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
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
                      <div className="flex items-center justify-center space-x-2">
                        <button
                        //   onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-300 rounded text-gray-800 hover:bg-gray-400"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                        //   onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-300 rounded text-gray-800 hover:bg-gray-400"
                        >
                          +
                        </button>
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
              <button
                // onClick={handleCheckout}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    );
};

export default CartPage;