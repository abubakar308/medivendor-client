import { Switch } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ManageBanner = () => {

    const [banners, setbanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch banner data from the server
  useEffect(() => {
    const fetchbanners = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_URL}/banners`);
        setbanners(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setLoading(false);
      }
    };

    fetchbanners();
  }, []);

  // Toggle banner status (Add/Remove from slider)
  const handleToggleStatus = async (bannerId) => {
    setbanners((prevBanners) =>
        prevBanners.map((banner) =>
            banner._id === bannerId
                ? { ...banner, Status: banner.Status === "approved" ? "pending" : "approved" }
                : banner
        )
    );

        try{
          const response = await  axios.patch(`${import.meta.env.VITE_API_URL}/banners/${bannerId}`,)
          
        } 
        catch{
            console.error("Error toggling status:");
        }
        finally{
            setLoading(false);
        }
            
        
  };

    return (
        <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Banner Advertise</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">#</th>
                <th className="border border-gray-300 px-4 py-2">Image</th>
                <th className="border border-gray-300 px-4 py-2">Medicine Name</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Seller Email</th>
                <th className="border border-gray-300 px-4 py-2">Add to Slider</th>
              </tr>
            </thead>
            <tbody>
              {banners?.map((banner, index) => (
                <tr key={banner._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={banner.image}
                      alt={banner.itemName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{banner.itemName}</td>
                  <td className="border border-gray-300 px-4 py-2">{banner.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{banner.Selleremail}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Switch
                      checked={banner.Status  === "approved"}
                      onChange={() => handleToggleStatus(banner._id)}
                      className={`${
                        banner.Status  === "approved" ? "bg-blue-600" : "bg-gray-400"
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                      <span className="sr-only">Add to Slider</span>
                      <span
                        className={`${
                          banner.Status  === "approved" ? "translate-x-5" : "translate-x-1"
                        } inline-block w-4 h-4 transform bg-white rounded-full transition`}
                      />
                    </Switch>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    );
};

export default ManageBanner;