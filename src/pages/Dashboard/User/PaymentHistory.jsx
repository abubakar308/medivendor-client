import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments, isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/customer-history/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  return (
    <div className="p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">
        Payment History
      </h2>

      {/* Show Loading State */}
      {isLoading ? (
        <p className="text-center">Loading payment history...</p>
      ) : payments?.transactions?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
            <thead className="bg-secondary">
              <tr className="text-left">
                <th className="py-2 px-3 border">Transaction ID</th>
                <th className="py-2 px-3 border">Status</th>
                <th className="py-2 px-3 border">Order Date</th>
                <th className="py-2 px-3 border">Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.transactions.map((payment) => (
                <tr key={payment.transactionId} className="">
                  <td className="py-2 px-4 border">{payment.transactionId}</td>
                  <td
                    className={`py-2 px-4 border font-semibold ${
                      payment.status === "Completed"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(payment.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">${payment.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400">No payments found.</p>
      )}
    </div>
  );
};

export default PaymentHistory;
