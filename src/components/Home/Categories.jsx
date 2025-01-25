import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Categories = () => {

    const {data: categories, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/categories`)
          return data
        },
      })
      
    return (
        <div className="grid md:grid-cols-3 gap-3 rounded-2xl">
           {
            categories && categories.map(category=> <Link to={`medicine/${category.categoryName}`} key={category._id}>
            <div className="flex items-center gap-5 border" >
                <img className="w-16 h-16" src={category.image} alt="" />
                <div>
                    <h3>{category.categoryName}</h3>
                    <p>{category.medicineCount}</p>
                </div>
                <FaArrowRight></FaArrowRight>
            </div>
            </Link>)
            }
        </div>
    );
};

export default Categories;