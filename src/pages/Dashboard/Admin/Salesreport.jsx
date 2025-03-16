import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Salesreport = () => {
  const axiosSecure = useAxiosSecure();
  const { data: historyData = [], isLoading } = useQuery({
    queryKey: ["historyData"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/manage-order`);
      return data;
    },
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSortChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sortBy') {
      setSortBy(value);
    } else {
      setSortOrder(value);
    }
  };

  // Filter based on search term
  const filteredData = searchTerm
    ? historyData?.filter((transaction) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
          transaction.products.some((item) =>
            item.productName && item.productName.toLowerCase().includes(lowerSearchTerm)
          ) ||
          (transaction.customerInfo.email && transaction.customerInfo.email.toLowerCase().includes(lowerSearchTerm)) ||
          transaction.products.some((item) =>
            item.sellerInfo && item.sellerInfo.toLowerCase().includes(lowerSearchTerm)
          )
        );
      })
    : historyData;

  // Filter by date range
  const filteredByDate = filteredData?.filter((transaction) => {
    const orderDate = new Date(transaction.orderDate);
    const start = startDate ? new Date(startDate) : new Date('1970-01-01');
    const end = endDate ? new Date(endDate) : new Date();
    return orderDate >= start && orderDate <= end;
  });

  // Sorting function using useMemo
  const sortedData = useMemo(() => {
    return filteredByDate?.sort((a, b) => {
      if (sortBy === 'totalPrice') {
        return sortOrder === 'asc' ? a.totalPrice - b.totalPrice : b.totalPrice - a.totalPrice;
      } else if (sortBy === 'orderDate') {
        return sortOrder === 'asc'
          ? new Date(a.orderDate) - new Date(b.orderDate)
          : new Date(b.orderDate) - new Date(a.orderDate);
      } else {
        const nameA = a.products[0].productName.toLowerCase();
        const nameB = b.products[0].productName.toLowerCase();
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      }
    });
  }, [filteredByDate, sortBy, sortOrder]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (sortedData.length === 0) {
    return <div>No data found for the given filters.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl text-center font-bold text-primary mb-4">Sales Report</h2>

      <div className="flex justify-between mb-4">
        <input
          type="text"
          className="px-4 py-2 border rounded-md w-1/3"
          placeholder="Search by Product, Seller, or Buyer Email"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div className="flex gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
        </div>
        <div className="flex gap-4">
          <select
            name="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="orderDate">Sort by Order Date</option>
            <option value="totalPrice">Sort by Total Price</option>
            <option value="productName">Sort by Product Name</option>
          </select>
          <select
            name="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-secondary text-white">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium border">Product Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium border">Seller Email</th>
              <th className="py-3 px-4 text-left text-sm font-medium border">Buyer Email</th>
              <th className="py-3 px-4 text-left text-sm font-medium border">Total Price</th>
              <th className="py-3 px-4 text-left text-sm font-medium border">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((transaction) =>
              transaction.products.map((item, index) => (
                <tr key={`${transaction._id}-${index}`} className="hover:bg-gray-100">
                  <td className="py-3 px-4 text-sm border">{item.productName}</td>
                  <td className="py-3 px-4 text-sm border">{item.sellerInfo}</td>
                  <td className="py-3 px-4 text-sm border">{transaction.customerInfo.email}</td>
                  <td className="py-3 px-4 text-sm border text-green-600 font-semibold">
                    {transaction.totalPrice} USD
                  </td>
                  <td className="py-3 px-4 text-sm border">
                    {new Date(transaction.orderDate).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Salesreport;
