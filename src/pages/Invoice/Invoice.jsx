import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import logo from '../../assets/logo.webp'
import Loading from "../../Shared/Loading/Loading";

const Invoice = () => {
    const {user} = useAuth();

    const {data: orders = [], isLoading} = useQuery({
      queryKey: ['purchases', user?.email],
      queryFn: async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/purchases?email=${user?.email}`)
        return data
      },
      enabled: !!user?.email,
    })
    if(isLoading) return <Loading />;
    
    const purchases = orders[orders.length - 1];
    
    return (
        <div className="bg-base-100 p-6">
      <div
        id="invoice"
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"
      >
        {/* Website Logo */}
        <div className="flex items-center justify-between mb-6">
          <img
            src={logo}
            alt="Website Logo"
            className="w-24"
          />
          <h2 className="text-2xl font-bold text-gray-800"></h2>
        </div>

        {/* User Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">User Information:</h3>
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
        </div>
        <p>Date: {new Date().toLocaleString()}</p>

        {/* Purchase Information */}
        <div>
          <h3 className="text-lg font-semibold">Purchase Details:</h3>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th>#</th>
                <th className="border px-4 py-2 text-left">Item</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Price</th>

              </tr>
            </thead>
            <tbody>
    {purchases?.products.map((product, index) => (
        <tr key={product._id}>
          <td>{index+1}</td>
          <td className="border px-4 py-2">{product.productName}</td>
          <td className="border px-4 py-2">{product.quantity}</td>
          <td className="border px-4 py-2">${product.price}</td>
        </tr>

        
      ))
    }
    {purchases?.totalPrice && (
  <tr className="bg-gray-100">
    <td colSpan="2" className="border border-gray-400 px-4 py-2 text-right font-bold">
      Total Price
    </td>
    <td className="border border-gray-400 px-4 py-2 font-bold">
      ${purchases.totalPrice}
    </td>
  </tr>
)}
    
  </tbody>
          </table>
          <div className="flex justify-end mt-4">
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-center mt-6">
        <button
        //   onClick={handlePrint}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Download Invoice as PDF
        </button>
      </div>
    </div>
    );
};

export default Invoice;