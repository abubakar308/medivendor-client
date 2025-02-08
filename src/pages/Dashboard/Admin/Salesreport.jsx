import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Salesreport = () => {

    const axiosSecure = useAxiosSecure()
    const {data: historyData = [], isLoading } = useQuery({
        queryKey: ['historyData'],
        queryFn: async () => {
          const { data } = await axiosSecure(`/manage-order`)
          return data
        },

      })
    return (
        <div className="max-10/12 mx-auto p-4">
        <h2 className="text-2xl text-center font-bold mb-4">Sales Report</h2>
  
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
  <thead className="bg-base-100">
    <tr>
      <th className="py-3 px-4 text-left text-sm font-medium border">
        Product Name
      </th>
      <th className="py-3 px-4 text-left text-sm font-medium border">
        Seller Email
      </th>
      <th className="py-3 px-4 text-left text-sm font-medium border">
        Buyer Email
      </th>
      <th className="py-3 px-4 text-left text-sm font-medium border">
        Total Price
      </th>
      <th className="py-3 px-4 text-left text-sm font-medium border">
        Order Date
      </th>
    </tr>
  </thead>
  <tbody>
    {historyData.map((transaction) => (
      transaction.products.map((item, index) => (
        <tr key={`${transaction._id}-${index}`}>
          <td className="py-3 px-4 text-sm border">
         {item.productName}
          </td>
          <td className="py-3 px-4 text-sm border">
            {item.sellerInfo}
          </td>
          <td className="py-3 px-4 text-sm border">
            {transaction.customerInfo.email}
          </td>
          <td className="py-3 px-4 text-sm  border">
            {transaction.totalPrice} USD
          </td>
          <td className="py-3 px-4 text-sm border">
            {new Date(transaction.orderDate).toLocaleString()}
          </td>
        </tr>
      ))
    ))}
  </tbody>
</table>
      </div>
    );
};

export default Salesreport;