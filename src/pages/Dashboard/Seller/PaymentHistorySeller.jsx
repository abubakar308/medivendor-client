import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PaymentHistorySeller = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure()
    const {data: payments = [], isLoading, } = useQuery({
        queryKey: ['payments',user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure(`/seller/orders/${user?.email}`)
          return data
        },
        enabled: !!user?.email,
      })
      console.log(payments)

      let paidTotal = 0;
      let pendingTotal = 0;
      
      payments.forEach(order => {
        const orderTotal = order.products.reduce((sum, product) => sum + product.price, 0);
      
        if (order.orderStatus === "paid") {
          paidTotal += orderTotal;
        } else {
          pendingTotal += orderTotal;
        }
      });
      const total = paidTotal + pendingTotal;
    return (
        <div>
  <h1>Total Order: {payments?.length }</h1>
  {payments.length === 0 ? (
    <p>No orders found</p>
  ) : (
    <table border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>Order Date</th>
          {/* <th>Customer Name</th> */}
          <th>Customer Email</th>
          <th>Products</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {payments.map(order => (
          <tr key={order.transactionId}>
            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
            {/* <td>{order.customerInfo.name}</td> */}
            <td>{order.customerInfo.email}</td>
            <td>
                {order.products.map(product => (
                  <tr key={product.productId}>
                    <span>{product.productName}</span> 
                  </tr>
                ))}
            </td>
            <td>
             {order.products.map(product => (
                  <tr key={product.productId}>
                    <span>${product.price}</span> 
                  </tr>
                ))}
            </td>
            <td>{order.orderStatus}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )}
  <div className="border-t-2">
    <p className="text-xl font-bold">Total Sell: {total}</p>
    <p className="text-xl font-bold text-green-400">Paid Total: {paidTotal}</p>
    <p className="text-xl font-bold text-red-400">Pending Total: {pendingTotal}</p>
  </div>
</div>
    );
};

export default PaymentHistorySeller;