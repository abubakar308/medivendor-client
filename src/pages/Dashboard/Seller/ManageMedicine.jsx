import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Shared/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import { useState } from "react";
import { imageUpload } from "../../../api/utils";
import { Dialog } from "@headlessui/react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageMedicine = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

  const [isOpen, setIsOpen] = useState(false);
 
  const handleAddMedicine = async (e) => {
      e.preventDefault();
      const form = e.target;
      const itemName = form.itemName.value;
      const itemGenericName = form.genericName.value;
      const shortDescription = form.description.value;
      const categoryName = form.category.value;
      const companyName = form.company.value;
      const itemMassUnit = form.massUnit.value;
      const perUnitPrice = parseFloat(form.price.value);
      const discountPercent = parseFloat(form.discount.value || 0);
      const photoFile = form.imageFile?.files[0];
      const Selleremail = user?.email;

       let imageUrl = '';
    if (photoFile) {
      try {
        imageUrl = await imageUpload(photoFile);
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

      const medicine = {
          Selleremail,
          itemName,
          itemGenericName,
          shortDescription,
          categoryName,
          companyName,
          itemMassUnit,
          perUnitPrice,
          discountPercent,
          image: imageUrl,
      };

     axiosSecure.post(`/medicines`, medicine)
          .then(()=>{
            setIsOpen(false);
            refetch();
          })
  };

  const { data: medicines = [], isLoading, refetch } = useQuery({
    queryKey: ['medicines', user?.email],
    queryFn: async () => {
      if (!user?.email) return []; // Handle case where email is not available
      const { data } = await axiosSecure(`/added-medicines?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const { data: categories} = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/categories`);
        return data;
    },
  });

  const handleDelete = id =>{
    Swal.fire({
        title: "Are you sure?",
        text: "You want to clear all cart",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            axiosSecure.delete(`/medicine-remove/${id}`)
            .then(()=>{
               refetch()
            })
          Swal.fire({
            title: "Deleted!",
            text: "Your carts has been creared",
            icon: "success"
          });
        }
      });
  }
 
  if(isLoading) return <Loading />

      
    return (
        <div className="overflow-x-auto">
                   <div className="flex justify-between items-center mb-4">
                       <h2 className="text-xl font-semibold">Manage Medicines</h2>
                       <button
                           onClick={() => setIsOpen(true)}
                           className="px-4 py-2 rounded-lg bg-base-300 hover:bg-blue-600"
                       >
                           Add Medicine
                       </button>
                   </div>
       
                   <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                       <thead>
                           <tr className="bg-base-200">
                               <th className="border border-gray-300 px-4 py-2">#</th>
                               <th className="border border-gray-300 px-4 py-2">Item Name</th>
                               <th className="border border-gray-300 px-4 py-2">Generic Name</th>
                               <th className="border border-gray-300 px-4 py-2">Category</th>
                               <th className="border border-gray-300 px-4 py-2">Company</th>
                               <th className="border border-gray-300 px-4 py-2">Price</th>
                               <th className="border border-gray-300 px-4 py-2">Discount</th>
                               <th className="border border-gray-300 px-4 py-2">Actions</th>
                           </tr>
                       </thead>
                       <tbody>
                   {medicines?.map((medicine, index) => (
                     <tr key={medicine._id} className="hover:bg-gray-50">
                       <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                       <td className="border border-gray-300 px-4 py-2">{medicine.itemName}</td>
                       <td className="border border-gray-300 px-4 py-2">{medicine.itemGenericName}</td>
                       <td className="border border-gray-300 px-4 py-2">{medicine.categoryName}</td>
                       <td className="border border-gray-300 px-4 py-2">{medicine.companyName}</td>
                       <td className="border border-gray-300 px-4 py-2">${medicine.perUnitPrice}</td>
                       <td className="border border-gray-300 px-4 py-2">{medicine.discountPercent}%</td>
                       <td className="border border-gray-300 px-4 py-2">
                         <button
                           className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                         >
                           Update
                         </button>
                         <button
                         onClick={()=>handleDelete(medicine._id)}
                           className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                         >
                           Delete
                         </button>
                       </td>
                     </tr>
                   ))}
                 </tbody>
                   </table>
       
                   <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                       <div className="fixed inset-0 flex w-screen items-center justify-center p-3 bg-black bg-opacity-30">
                           <div className="max-w-lg overflow-auto max-h-full w-full space-y-4 border bg-white p-6 rounded-lg shadow-lg">
                               <h2 className="text-lg font-bold text-gray-800">Add Medicine</h2>
       
                               <form onSubmit={handleAddMedicine} className="space-y-4">
                                   <div>
                                       <label htmlFor="itemName" className="block text-sm font-medium text-gray-600">
                                           Item Name
                                       </label>
                                       <input
                                           type="text"
                                           id="itemName"
                                           name="itemName"
                                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                           required
                                       />
                                   </div>
       
                                   <div>
                                       <label htmlFor="genericName" className="block text-sm font-medium text-gray-600">
                                           Generic Name
                                       </label>
                                       <input
                                           type="text"
                                           id="genericName"
                                           name="genericName"
                                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                           required
                                       />
                                   </div>
       
                                   <div>
                                       <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                                           Short Description
                                       </label>
                                       <textarea
                                           id="description"
                                           name="description"
                                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                           rows="3"
                                           required
                                       ></textarea>
                                   </div>
       
                                   <div>
                                       <label htmlFor="category" className="block text-sm font-medium text-gray-600">
                                           Category
                                       </label>
                                       <select
                                           id="category"
                                           name="category"
                                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                           required
                                       >
                                           {categories?.map((cat) => (
                                               <option key={cat._id} value={cat.categoryName}>
                                                   {cat.categoryName}
                                               </option>
                                           ))}
                                       </select>
                                   </div>
       
                                   <div>
                                       <label htmlFor="company" className="block text-sm font-medium text-gray-600">
                                           Company
                                       </label>
                                       <select
                                           id="company"
                                           name="company"
                                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                           required
                                       >
                                           <option value="">-- Select a Company --</option>
                                           <option value="Pfizer">Pfizer</option>
                                           <option value="Johnson & Johnson">Johnson & Johnson</option>
                                           <option value="Novartis">Novartis</option>
                                           <option value="Roche">Roche</option>
                                           <option value="Sanofi">Sanofi</option>
                                           <option value="Merck & Co.">Merck & Co.</option>
                                           <option value="GlaxoSmithKline (GSK)">GlaxoSmithKline (GSK)</option>
                                           <option value="AstraZeneca">AstraZeneca</option>
                                           <option value="Bayer">Bayer</option>
                                           <option value="AbbVie">AbbVie</option>
                                           <option value="Eli Lilly">Eli Lilly</option>
                                           <option value="Amgen">Amgen</option>
                                           <option value="Bristol Myers Squibb">Bristol Myers Squibb</option>
                                           <option value="Cipla">Cipla</option>
                                           <option value="Dr. Reddy's Laboratories">Dr. Reddy&lsquo;s Laboratories</option>
                                       </select>
                                   </div>
       
                                   <div>
                                       <label htmlFor="massUnit" className="block text-sm font-medium text-gray-600">
                                           Item Mass Unit (Mg or ML)
                                       </label>
                                       <input
                                           type="text"
                                           id="massUnit"
                                           name="massUnit"
                                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                           required
                                       />
                                   </div>
       
                                   <div>
                                       <label htmlFor="price" className="block text-sm font-medium text-gray-600">
                                           Per Unit Price ($)
                                       </label>
                                       <input
                                           type="number"
                                           step="0.01"
                                           id="price"
                                           name="price"
                                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                           required
                                       />
                                   </div>
       
                                   <div>
                                       <label htmlFor="discount" className="block text-sm font-medium text-gray-600">
                                           Discount Percentage (Default 0%)
                                       </label>
                                       <input
                                           type="number"
                                           step="0.01"
                                           id="discount"
                                           name="discount"
                                           className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                           defaultValue="0"
                                       />
                                   </div>
       
                                   <div>
                                       <label htmlFor="imageFile" className="block text-sm font-medium text-gray-600">
                                           Upload Image
                                       </label>
                                       <input
                                           type="file"
                                           id="imageFile"
                                           name="imageFile"
                                           className="w-full border border-gray-300 rounded-lg p-2"
                                           accept="image/*"
                                           required
                                       />
                                   </div>
       
                                   <div className="flex justify-end gap-4">
                                       <button
                                           type="button"
                                           onClick={() => setIsOpen(false)}
                                           className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                                       >
                                           Cancel
                                       </button>
                                       <button
                                           type="submit"
                                           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                       >
                                           Add Medicine
                                       </button>
                                   </div>
                               </form>
                           </div>
                       </div>
                   </Dialog>
               </div>
    );
};

export default ManageMedicine;