import axios from "axios";

// eslint-disable-next-line react/prop-types
const Categorytable = ({categories, refetch}) => {
    console.log(categories)

    const handleUpdate = id =>{
        axios.patch(`${import.meta.env.VITE_API_URL}/category/${id}`,)
        .then((data) => {
            console.log(data)
            refetch(); // Refetch only after successful deletion
          })
          .catch((error) => {
            console.error("Failed to delete the item:", error);
          });
    }

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
                    onClick={() => handleUpdate(category._id)}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
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
    </div>
    );
};

export default Categorytable;