import { Switch } from "@headlessui/react";
import axios from "axios";
import { useEffect, useState } from "react";

const ManageBanner = () => {

    const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch advertisement data from the server
  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios(`${import.meta.env.VITE_API_URL}/banners`);
        setAdvertisements(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching advertisements:", error);
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, []);

  // Toggle advertisement status (Add/Remove from slider)
  const handleToggleSliderStatus = async (advertisementId, currentStatus) => {
    try {
      const updatedStatus = !currentStatus;
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/banners/${advertisementId}`, {
        isInSlider: updatedStatus,
      });

      // Update the local state with the new status
      setAdvertisements((prevAdvertisements) =>
        prevAdvertisements.map((advertisement) =>
          advertisement._id === advertisementId
            ? { ...advertisement, isInSlider: updatedStatus }
            : advertisement
        )
      );

      console.log("Advertisement updated:", response.data);
    } catch (error) {
      console.error("Error updating advertisement status:", error);
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
              {advertisements?.map((advertisement, index) => (
                <tr key={advertisement._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={advertisement.image}
                      alt={advertisement.itemName}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{advertisement.itemName}</td>
                  <td className="border border-gray-300 px-4 py-2">{advertisement.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{advertisement.sellerEmail}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Switch
                      checked={advertisement.isInSlider}
                      onChange={() => handleToggleSliderStatus(advertisement._id, advertisement.isInSlider)}
                      className={`${
                        advertisement.isInSlider ? "bg-blue-600" : "bg-gray-400"
                      } relative inline-flex items-center h-6 rounded-full w-11`}
                    >
                      <span className="sr-only">Add to Slider</span>
                      <span
                        className={`${
                          advertisement.isInSlider ? "translate-x-5" : "translate-x-1"
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