import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import MedicineData from "../../components/Shop/MedicineData";

const Shop = () => {
    const {data: medicines, isLoading } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicines`)
          return data
        },
      })
    return (
            <div className='container w-full mx-auto px-3 sm:px-5'>
        <div className='py-8'>
          <div className='-mx-4 sm:-mx-5 px-3 sm:px-5 py-3 overflow-x-auto'>
            <div className=' min-w-full shadow rounded-lg overflow-hidden'>
              <table className='w-full leading-normal'>
                <thead>
                  <tr>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Image
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Category
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Price
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Quantity
                    </th>
                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                    >
                      Status
                    </th>

                    <th
                      scope='col'
                      className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
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

export default Shop;