import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import { useState } from "react";

const Managepayment = () => {
  const axiosSecure = useAxiosSecure();

  // States for search, sorting, and status filter
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('totalPrice');
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('');

  // Fetch payment data
  const { data: payments = [], isLoading, refetch } = useQuery({
    queryKey: ["purchases"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/manage-order`);
      return data;
    },
  });

  // Handle payment acceptance
  const handleAcceptPayment = (id) => {
    axiosSecure.patch(`/order-accept/${id}`).then(() => {
      refetch();
    });
  };

  // Filter payments by search term (user name)
  const filteredPayments = payments?.filter((payment) =>
    payment?.customerInfo?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter payments by status
  const filteredByStatus = filteredPayments?.filter((payment) =>
    statusFilter ? payment.Status.toLowerCase() === statusFilter.toLowerCase() : true
  );

  // Sort payments by selected criteria
  const sortedPayments = filteredByStatus?.sort((a, b) => {
    if (sortBy === 'totalPrice') {
      return sortOrder === 'asc' ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
    } else {
      // Default sort by name (customer name)
      const nameA = a.customerInfo.name.toLowerCase();
      const nameB = b.customerInfo.name.toLowerCase();
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-background rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-primary mb-4">Payment Management</h1>

      <div className="flex justify-between mb-4">
        {/* Search Input */}
        <input
          type="text"
          className="px-4 py-2 border rounded-md w-1/3"
          placeholder="Search by User"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Filter by Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">Filter by Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

        {/* Sort By Options */}
        <div className="flex gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="totalPrice">Sort by Price</option>
            <option value="name">Sort by User</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="p-3">User</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments?.map((payment) => (
              <tr key={payment.id} className="text-center border-t hover:bg-gray-100">
                <td className="p-3">{payment?.customerInfo.name}</td>
                <td className="p-3">${payment?.totalPrice}</td>
                <td
                  className={`p-3 font-semibold ${
                    payment?.Status === "paid" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {payment.Status}
                </td>
                <td className="p-3">
                  {payment.Status === "pending" && (
                    <button
                      onClick={() => handleAcceptPayment(payment._id)}
                      className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/80 transition"
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
    </div>
  );
};

export default Managepayment;
