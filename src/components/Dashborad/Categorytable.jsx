import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { imageUpload } from "../../api/utils";
import Loading from "../../Shared/Loading/Loading";

// eslint-disable-next-line react/prop-types
const Categorytable = ({categories, refetch, isLoading}) => {
   const [isOpen, setIsOpen] = useState(false);
   const [editCategory, setEditCategory] = useState(null); 


    const handleUpdate = async(e) =>{
        e.preventDefault()
 const form = e.target
      const name =form.categoryName.value;
      const photoFile = form.imageFile?.files[0];
 
      let imageUrl = '';
      if (photoFile) {
        // Upload the image file and get the URL
        imageUrl = await imageUpload(photoFile);
      } else {
        imageUrl = form.imageUrl.value; // Use the provided URL if no file is uploaded
      }
      const category ={
        categoryName: name,
        image:  imageUrl,
      }
   
    axios.patch(`${import.meta.env.VITE_API_URL}/category/${editCategory._id}`, category)
    .then((data) => {
      console.log(data)
      refetch(); // Refetch only after successful deletion
    })
    .catch((error) => {
      console.error("Failed to delete the item:", error);
    });
    setIsOpen(false);
     if(isLoading) return <Loading />
    }

    const openEditModal = (category) => {
        setEditCategory(category); // Store the category being edited
        setIsOpen(true); // Open the modal
      };

    const handleDelete = id =>{
        console.log(id)
        axios.delete(`${import.meta.env.VITE_API_URL}/category/${id}`,)
        .then((data) => {
            console.log(data)
            refetch(); // Refetch only after successful deletion
          })
          .catch((error) => {
            console.error("Failed to delete the item:", error);
          });
    }
    return (
        <div className="overflow-x-auto">
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        {/* Table Head */}
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Category Name</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {
            // eslint-disable-next-line react/prop-types
            categories.map((category,index) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{category.categoryName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={category.image}
                    alt={category.categoryName}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                   onClick={() => openEditModal(category)}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 flex w-screen items-center justify-center p-3 bg-black bg-opacity-30">
              <div className="max-w-lg max-h-full w-full space-y-4 border bg-white p-6 rounded-lg shadow-lg">
                {/* Title */}
                <h2 className="text-lg font-bold text-gray-800">Update Category</h2>
      
                {/* Form */}
                <form onSubmit={handleUpdate} className="space-y-4">
                  {/* Category Name */}
                  <div>
                    <label htmlFor="categoryName" className="block text-sm font-medium text-gray-600">
                      Category Name
                    </label>
                    <input
                      type="text"
                      id="categoryName"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     name="categoryName"
                      required
                    />
                  </div>
      
                  {/* Category Image URL */}
                  <div>
                    <label htmlFor="categoryImageUrl" className="block text-sm font-medium text-gray-600">
                      Category Image URL
                    </label>
                    <input
                      type="url"
                      id="categoryImageUrl"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      name="imageUrl"
                    />
                  </div>
      
                  {/* Image Upload */}
                  <div>
                    <label htmlFor="imageFile" className="block text-sm font-medium text-gray-600">
                      Or Upload an Image
                    </label>
                    <input
                      type="file"
                      name="imageFile"
                      id="imageFile"
                      className="w-full border border-gray-300 rounded-lg p-2"
                      accept="image/*"
                    />
                  </div>
      
                  {/* Submit and Cancel Buttons */}
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
                      Add Category
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Dialog>
    </div>
    );
};

export default Categorytable;