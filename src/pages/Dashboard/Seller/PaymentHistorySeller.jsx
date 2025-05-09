import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistorySeller = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/seller/orders/${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  let paidTotal = 0;
  let pendingTotal = 0;

  // Calculate totals
  payments.forEach(order => {
    const orderTotal = order.products.reduce((sum, product) => {
      return sum + (product.price * product.quantity); // Multiply price × quantity
    }, 0);
  
    if (order.orderStatus === "paid") {
      paidTotal += orderTotal;
    } else {
      pendingTotal += orderTotal;
    }
  });

  const total = paidTotal + pendingTotal;

  return (
    <div className="p-6 bg-light-gray rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Total Order: {payments.length}</h1>

      {payments.length === 0 ? (
        <p className="text-center text-gray-600">No orders found</p>
      ) : (
        <table className="w-full table-auto border-collapse text-left">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Customer Email</th>
              <th className="py-2 px-4 border-b">Products</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Total</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map(order => (
              <tr key={order.transactionId}>
                <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">{order.customerInfo.email}</td>
                <td className="py-2 px-4 border-b">
                  {order.products.map(product => (
                    <div key={product.productId}>
                      <span>{product.productName}</span>
                    </div>
                  ))}
                </td>
                <td className="py-2 px-4 border-b">
  {order.products.reduce((sum, product) => sum + Number(product.price), 0).toFixed(2)}
</td>
                <td className="py-2 px-4 border-b">
                  {order.products.map(product => (
                    <div key={product.productId}>
                      <span>{product.quantity}</span>
                    </div>
                  ))}
                  </td>
                  <td className="py-2 px-4 border-b">
  {order.products.reduce((sum, product) => sum + (product.price * product.quantity), 0)}
</td>
                <td className="py-2 px-4 border-b">{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="border-t-2 mt-6 pt-4">
        <p className="text-xl font-bold text-indigo-600">Total Sell: ${total}</p>
        <p className="text-xl font-bold text-emerald-500">Paid Total: ${paidTotal}</p>
        <p className="text-xl font-bold text-amber-500">Pending Total: ${pendingTotal}</p>
      </div>
    </div>
  );
};

export default PaymentHistorySeller;
