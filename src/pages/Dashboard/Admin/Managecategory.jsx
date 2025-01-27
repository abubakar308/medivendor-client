import { Dialog } from "@headlessui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Loading from "../../../Shared/Loading/Loading";
import Categorytable from "../../../components/Dashborad/Categorytable";


const Managecategory = () => {

    const [isOpen, setIsOpen] = useState(false);

    
    const {data: categories, isLoading } = useQuery({
      queryKey: ['category'],
      queryFn: async () => {
        const { data } = await axios(`${import.meta.env.VITE_API_URL}/categories`)
        return data
      },
    })
    
    if(isLoading) return <Loading />


  const handleAddCategory = (e) => {
    e.preventDefault()
    const formData = {
        categoryName: e.target.categoryName.value,
        image: e.target.imageUrl.value || e.target.imageFile.files[0]
    }
    console.log("New Category Data:", formData);
    
    // Add your API call or logic here
  };
  const handleAdd = () =>{
    setIsOpen(true)
}
    return (
        <div>
          <div className="flex justify-around py-3 text-2xl font-bold">
      <h2>All category: {categories.length}</h2>
      <button className="btn" onClick={handleAdd}>Add a new category</button>
          </div>
          {/* category data table */}
          <Categorytable categories={categories} ></Categorytable>
    
           <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center p-3 bg-black bg-opacity-30">
        <div className="max-w-lg max-h-full w-full space-y-4 border bg-white p-6 rounded-lg shadow-lg">
          {/* Title */}
          <h2 className="text-lg font-bold text-gray-800">Add New Category</h2>

          {/* Form */}
          <form onSubmit={handleAddCategory} className="space-y-4">
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

export default Managecategory;