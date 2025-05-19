import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import {motion} from "framer-motion"

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/categories`);
      return data;
    },
  });

  // Loading spinner if data is still fetching
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-16 h-16 border-t-4 border-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div className="container mx-auto my-6">
      <h2 className="text-3xl text-center text-secondary py-3">Medicine Categories</h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories && categories.map((category) => (
          <NavLink 
            to={`medicine/${category.categoryName}`} 
            key={category._id}
            className="flex items-center justify-between bg-base-100 dark:bg-base-200 hover:bg-accent p-4 rounded-lg shadow-lg border-2 transition duration-300"
          >
            <motion.div className="flex items-center gap-4">
              <img 
                className="w-16 h-16 object-cover rounded-full shadow-md" 
                src={category.image} 
                alt={category.categoryName} 
              />
              <div className="">
                <h3 className="text-xl font-semibold">{category.categoryName}</h3>
                <p className="text-sm">{category.medicineCount} Medicines</p>
              </div>
            </motion.div>
            <FaArrowRight className="text-primary dark:text-accent text-xl" />
          </NavLink>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Categories;
