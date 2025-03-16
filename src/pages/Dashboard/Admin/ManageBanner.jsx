import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const ManageBanner = () => {
  const axiosSecure = useAxiosSecure();
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosSecure(`/banners`);
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, [axiosSecure]);

  // Toggle banner status
  const handleToggleStatus = async (bannerId) => {
    setBanners((prevBanners) =>
      prevBanners.map((banner) =>
        banner._id === bannerId
          ? { ...banner, Status: banner.Status === "approved" ? "pending" : "approved" }
          : banner
      )
    );

    try {
      await axiosSecure.patch(`/banner-show/${bannerId}`);
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-background rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-primary mb-4 text-center">Manage Banner Advertise</h2>
      
      {loading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-secondary text-white">
              <tr>
                <th className="py-3 px-4 text-left border">#</th>
                <th className="py-3 px-4 text-left border">Image</th>
                <th className="py-3 px-4 text-left border">Medicine Name</th>
                <th className="py-3 px-4 text-left border">Description</th>
                <th className="py-3 px-4 text-left border">Seller Email</th>
                <th className="py-3 px-4 text-left border">Add to Slider</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner, index) => (
                <tr key={banner._id} className="hover:bg-gray-100">
                  <td className="py-3 px-4 border">{index + 1}</td>
                  <td className="py-3 px-4 border">
                    <img
                      src={banner.image}
                      alt={banner.itemName}
                      className="w-16 h-16 object-cover rounded-md shadow-md"
                    />
                  </td>
                  <td className="py-3 px-4 border">{banner.itemName}</td>
                  <td className="py-3 px-4 border">{banner.description}</td>
                  <td className="py-3 px-4 border">{banner.Selleremail}</td>
                  <td className="py-3 px-4 border">
                    <Switch
                      checked={banner.Status === "approved"}
                      onChange={() => handleToggleStatus(banner._id)}
                      className={`relative inline-flex items-center h-6 rounded-full w-11 transition ${
                        banner.Status === "approved" ? "bg-green-600" : "bg-gray-400"
                      }`}
                    >
                      <span className="sr-only">Add to Slider</span>
                      <span
                        className={`inline-block w-4 h-4 transform bg-white rounded-full transition ${
                          banner.Status === "approved" ? "translate-x-5" : "translate-x-1"
                        }`}
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
