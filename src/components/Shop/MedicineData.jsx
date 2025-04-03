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
  const [selected, setSelected] = useState(false);
  const navigate = useNavigate();
  const [role] = useRole();
  // const { t } = useTranslation();

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
  };

  const handleClick = id => {
    fetch(`${import.meta.env.VITE_API_URL}/medicine/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsOpen(true);
      });
  };

  const handleSelect = async () => {
    if (!user?.email) {
      navigate('/login');
    }
    if (role !== 'user') {
      Swal.fire({
        position: "top-center",
        icon: "error",
        title: "Only users can select medicine",
        showConfirmButton: false,
        timer: 2000,
        width: "400px",
      });
    } else {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/carts`, item);

        if (response.status === 200) {
          setSelected(true);
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: `${item.itemName} added successfully`,
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
                  className="mx-auto object-cover rounded h-16 w-24"
                />
              </div>
            </div>
          </div>
        </td>

        <td className="p-3 border-b border-gray-200 text-sm">
          <p className="whitespace-nowrap">{itemName}</p>
        </td>
        <td className="p-3 border-b border-gray-200 text-sm">
          <p className="">{categoryName}</p>
        </td>
        <td className="p-3 border-b border-gray-200 text-sm">
          <p className="whitespace-nowrap">${perUnitPrice}</p>
        </td>
        <td className="p-3 border-b border-gray-200 text-sm">
          <p className="whitespace-nowrap dark:text-white">5</p>
        </td>
        <td className="p-3 border-b border-gray-200 text-sm">
          <button onClick={handleSelect} className="btn bg-accent whitespace-no-wrap">
            {selected ? ("selected") : ("select")}
          </button>
        </td>

        <td className="p-3 border-b text-sm">
          <button
            onClick={() => handleClick(_id)}
            className="relative btn disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold leading-tight"
          >
            <span className="absolute cursor-pointer inset-0 bg-accent  rounded-full"></span>
            <span className="relative cursor-pointer">
              <FaEye />
            </span>
          </button>
        </td>
      </tr>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-3">
          <DialogPanel className="max-w-lg max-h-full rounded-md overflow-auto space-y-4 border bg-base-100 p-4 dark:bg-neutral-800">
            <DialogTitle className="font-bold text-primary">
              <img src={image} alt={itemName} className="w-full h-auto object-cover rounded-md" />
            </DialogTitle>
            <p className="">name: {itemName}</p>
            <p className="">category: {categoryName}</p>
            <p className="">itemMassUnit: {itemMassUnit}</p>
            <p className="">
              {discountPercent > 0 ? (
                <>
                  <span className="line-through">${perUnitPrice}</span>
                  <span className="ml-2 text-accent">
                    ${(perUnitPrice - (perUnitPrice * discountPercent) / 100).toFixed(2)}
                  </span>
                  <p className="text-secondary">discount: {discountPercent}%</p>
                </>
              ) : (
                <span>price: ${perUnitPrice}</span>
              )}
            </p>

            <div className="flex gap-4">
              <p className="">company: {companyName}</p>
              <p className="">genericName: {itemGenericName}</p>
            </div>
            <Description className="">description: {shortDescription}</Description>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default MedicineData;
