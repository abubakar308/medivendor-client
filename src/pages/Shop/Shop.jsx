import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import MedicineData from "../../components/Shop/MedicineData";
import Loading from "../../Shared/Loading/Loading";

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // Default sort by name
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order ascending

  const { data: medicines, isLoading } = useQuery({
    queryKey: ['medicines'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicines`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  // Filter medicines based on the search term and status filter
  const filteredMedicines = medicines.filter((medicine) => {
    const matchesSearch =
      medicine.itemName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Sorting function
  const sortedMedicines = filteredMedicines.sort((a, b) => {
    if (sortBy === 'price') {
      return sortOrder === 'asc' ? a.perUnitPrice - b.perUnitPrice : b.perUnitPrice - a.perUnitPrice;
    } else if (sortBy === 'quantity') {
      return sortOrder === 'asc' ? a.quantity - b.quantity : b.quantity - a.quantity;
    } else { // Default sort by name
      const nameA = a.itemName.toLowerCase();
      const nameB = b.itemName.toLowerCase();
      return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sortBy') {
      setSortBy(value);
    } else {
      setSortOrder(value);
    }
  };


  return (
    <div className="container mx-auto px-4 sm:px-6 py-8">
      <h2 className="text-3xl text-center font-semibold text-primary py-4">Medicine Shop</h2>

      {/* Search Bar */}
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          className="px-4 py-2 border rounded-md w-1/3"
          placeholder="Search by Medicine Name"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        {/* Sort Options */}
        <div className="flex gap-4">
          <select
            name="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="px-4 py-2 border rounded-md"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="quantity">Sort by Quantity</option>
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

      {/* Medicines Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-base-100 dark:bg-neutral-800">
        <table className="w-full table-auto min-w-max text-sm text-left text-gray-800 dark:text-gray-200">
          <thead className="bg-secondary dark:bg-primary">
            <tr>
              <th className="px-5 py-3 border-b border-gray-300 dark:border-neutral-600">Image</th>
              <th className="px-5 py-3 border-b border-gray-300 dark:border-neutral-600">Name</th>
              <th className="px-5 py-3 border-b border-gray-300 dark:border-neutral-600">Category</th>
              <th className="px-5 py-3 border-b border-gray-300 dark:border-neutral-600">Price</th>
              <th className="px-5 py-3 border-b border-gray-300 dark:border-neutral-600">Quantity</th>
              <th className="px-5 py-3 border-b border-gray-300 dark:border-neutral-600">Status</th>
              <th className="px-5 py-3 border-b border-gray-300 dark:border-neutral-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedMedicines?.map((medicine) => (
              <MedicineData key={medicine._id} medicine={medicine} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shop;
