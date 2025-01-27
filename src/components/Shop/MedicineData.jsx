/* eslint-disable react/prop-types */
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const MedicineData = ({medicine}) => {
    const {_id, image, itemName, categoryName, perUnitPrice, itemGenericName, companyName, discountPercent, shortDescription, itemMassUnit } = medicine;
const [isOpen, setIsOpen] = useState(false);
const {user} = useAuth();

const item= {
  medicineId: _id,
  image: image,
  itemName: itemName,
  perUnitPrice: perUnitPrice,
  companyName: companyName,
  discountPercent: discountPercent,
  itemMassUnit: itemMassUnit,
  customerEmail: user?.email || "",
}


  const handleClick = id =>{
    fetch(`${import.meta.env.VITE_API_URL}/medicine/${id}`)
    .then(res=>res.json())
    .then(data=>{
      console.log(data)
      setIsOpen(true)
    })
  }

  const handleSelect = async () => {
     axios.post(`${import.meta.env.VITE_API_URL}/carts`, item); // Make sure VITE_API_URL is the correct environment variable
      
      // navigate('/my-bids');
  };
  

    return (
        
         <>
          <tr className="w-full">
      <td className='p-3 border-b border-gray-200 bg-white text-sm'>
        <div className='flex items-center'>
          <div className='flex-shrink-0'>
            <div className='block relative'>
              <img
                alt='profile'
                src={image}
                className='mx-auto object-cover rounded h-10 w-15 '
              />
            </div>
          </div>
        </div>
      </td>

      <td className='p-3 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>{itemName}</p>
      </td>
      <td className='p-3 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>
            {categoryName}
        </p>
      </td>
      <td className='p-3 border-b border-gray-200 bg-white text-sm'>
    <p className='text-gray-900 whitespace-no-wrap'>{perUnitPrice}</p>
      </td>
      <td className='p-3 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900 whitespace-no-wrap'>5</p>
      </td>
      <td className='p-3 border-b border-gray-200 bg-white text-sm'>
        <button onClick={handleSelect} className='text-gray-900 whitespace-no-wrap'>select</button>
      </td>

      <td className='p-3 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={()=>handleClick(_id)}
          className='relative btn disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
        >
          <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
          <span className='relative cursor-pointer'><FaEye></FaEye></span>
        </button>
      </td>
    </tr>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-3">
          <DialogPanel className="max-w-lg max-h-full space-y-4 border bg-green-300 p-4">
            <DialogTitle className="font-bold">
              <img src={image} alt="" />
            </DialogTitle>
            <p>{itemName}</p>
            <p>{categoryName}</p>
           
            <p>{itemMassUnit}</p>
           {discountPercent && <p>{discountPercent}</p>}

          
            <div className="flex gap-4">
            <p>Company: {companyName}</p>
              <p>Generic Name: {itemGenericName}</p>
            </div>
            <Description>{shortDescription}</Description>
          </DialogPanel>
        </div>
      </Dialog>
         </>
       
    );
};

export default MedicineData;