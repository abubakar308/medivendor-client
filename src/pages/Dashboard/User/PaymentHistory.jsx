import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistory = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data: payments, isLoading, } = useQuery({
        queryKey: ['payments',user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure(`/customer-history/${user?.email}`)
          return data
        },
        enabled: !!user?.email,
      })
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Payment History</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="py-2 px-3 border-b">Transaction ID</th>
              <th className="py-2 px-3 border-b">Status</th>
              <th className="py-2 px-3 border-b">Order Date</th>
              <th className="py-2 px-3 border-b">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments?.transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-4">No orders found</td>
              </tr>
            ) : (
              payments?.transactions.map(payment => (
                <tr key={payment.transactionId}>
                  <td className="py-2 px-4 border-b">{payment.transactionId}</td>
                  <td className="py-2 px-4 border-b">{payment.status}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(payment.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">${payment.totalPrice}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    );
};

export default PaymentHistory;