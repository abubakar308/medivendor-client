import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import MedicineData from "../../components/Shop/MedicineData";

const CategoryDetails = () => {
    const {category} = useParams();
    const {data: medicines, isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicines/${category}`)
          return data
        },
      })
    return (
        <div className='container mx-auto px-4 sm:px-8'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
            <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
              <table className='min-w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3  border-b border-gray-200 text-left text-sm uppercase font-normal'
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
            medicines?.map(medicine=>(<MedicineData medicine={medicine} key={medicine._id}></MedicineData>))
           }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default CategoryDetails;