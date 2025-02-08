import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const Managepayment = () => {
const axiosSecure = useAxiosSecure()
    const {data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ['purchases'],
        queryFn: async () => {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/manage-order`)
          return data
        },

      })

      const handleAcceptPayment = (id) => {
      axiosSecure.patch(`/order-accept/${id}`)
      .then(()=>{
        refetch()
      })
      };

      if(isLoading) return <Loading />;
    return (
        <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Payment Management</h1>
      <table className="w-full border border-gray-300 shadow-md">
        <thead>
          <tr className="bg-base-200">
            <th className="p-2">User</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {payments?.map(payment => (
            <tr key={payment.id} className="text-center border-t">
              <td className="p-2">{payment?.customerInfo.name}</td>
              <td className="p-2">${payment?.totalPrice}</td>
              <td className={`p-2 ${payment?.Status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>{payment.Status}</td>
              <td className="p-2">
                {payment.Status === 'pending' && (
                  <button
                    onClick={() => handleAcceptPayment(payment._id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Accept Payment
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    );
};

export default Managepayment;