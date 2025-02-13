/* eslint-disable react/prop-types */
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { FaEye } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import { useTranslation } from "react-i18next";

const MedicineData = ({ medicine }) => {
  const { _id, image, itemName, Selleremail, categoryName, perUnitPrice, itemGenericName, companyName, discountPercent, shortDescription, itemMassUnit } = medicine;
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const [selected, setSelected] =  useState(false);
  const navigate = useNavigate();
  const [role] = useRole()
  const { t } = useTranslation();



  const item = {
    medicineId: _id,
    image: image,
    itemName: itemName,
    perUnitPrice: perUnitPrice,
    quantity: 1,
    companyName: companyName,
    discountPercent: discountPercent,
    itemMassUnit: itemMassUnit,
    SellerEmail: Selleremail,
    customerEmail: user?.email || "",
  }


  const handleClick = id => {
    fetch(`${import.meta.env.VITE_API_URL}/medicine/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setIsOpen(true)
      })
  }

  const handleSelect = async () => {
   if(!user?.email){
    navigate('/login')
   };
   if(role != 'user'){
    Swal.fire({
      position: "top-center",
      icon: "error",
      title: "only user select medicine",
      showConfirmButton: false,
      timer: 2000,
      width: "400px",
    });
   }
   else
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/carts`, item);
      
      if (response.status === 200) {
        setSelected(true)
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: `${item.itemName} Medicine added successfully`,
          showConfirmButton: false,
          timer: 2000,
          width: "400px",
        });
      } 
    } catch (error) {
    
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: `${error.response?.data || error.message}`,
        showConfirmButton: false,
        timer: 2000,
        width: "400px",
      });
    }
  };


  return (

    <>
    <Helmet>
      <title>{categoryName || "Shop"}</title>
    </Helmet>
    <tr className="w-full">
      <td className="p-3 border-b border-gray-200 text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={image}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      <td className="p-3 border-b border-gray-200 text-sm">
        <p className="whitespace-no-wrap">{itemName}</p>
      </td>
      <td className="p-3 border-b border-gray-200 text-sm">
        <p className="whitespace-no-wrap">{categoryName}</p>
      </td>
      <td className="p-3 border-b border-gray-200 text-sm">
        <p className="whitespace-no-wrap">{perUnitPrice}</p>
      </td>
      <td className="p-3 border-b border-gray-200 text-sm">
        <p className="whitespace-no-wrap">5</p>
      </td>
      <td className="p-3 border-b border-gray-200 text-sm">
        <button onClick={handleSelect} className="btn whitespace-no-wrap">
          {selected ? t("selected") : t("select")}  {/* Use translation here */}
        </button>
      </td>

      <td className="p-3 border-b text-sm">
        <button
          onClick={() => handleClick(_id)}
          className="relative btn disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
        >
          <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative cursor-pointer"><FaEye></FaEye></span>
        </button>
      </td>
    </tr>
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-3">
        <DialogPanel className="max-w-lg max-h-full rounded-md overflow-auto space-y-4 border bg-green-300 p-4">
          <DialogTitle className="font-bold">
            <img src={image} alt="" />
          </DialogTitle>
          <p>{t("name")}: {itemName}</p> 
          <p>{t("category")}: {categoryName}</p> 
          <p>{t("itemMassUnit")}: {itemMassUnit}</p> 
          <p>
            {discountPercent > 0 ? (
              <>
                <span className="line-through text-gray-500">${perUnitPrice}</span> {/* Original Price */}
                <span className="ml-2 text-red-500">
                  ${(perUnitPrice - (perUnitPrice * discountPercent) / 100).toFixed(2)} 
                </span>
                <p className="text-green-600">{t("discount")}: {discountPercent}%</p>  
              </>
            ) : (
              <span>{t("price")}: ${perUnitPrice}</span>  
            )}
          </p>

          <div className="flex gap-4">
            <p>{t("company")}: {companyName}</p> 
            <p>{t("genericName")}: {itemGenericName}</p>  
          </div>
          <Description>{t("description")}: {shortDescription}</Description>
        </DialogPanel>
      </div>
    </Dialog>
  </>

  );
};

export default MedicineData;