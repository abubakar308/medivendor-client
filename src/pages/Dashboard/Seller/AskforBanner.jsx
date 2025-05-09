import { Dialog } from "@headlessui/react";
import axios from "axios";
import { useState } from "react";
import { imageUpload } from "../../../api/utils";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";

const AskforBanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  // Medicines query
  const { data: medicines = [], isLoading: isMedicinesLoading } = useQuery({
    queryKey: ["medicines", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/added-medicines?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  // Banners query
  const { data: banners = [], isLoading: isBannersLoading, refetch } = useQuery({
    queryKey: ["banners", user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/banners?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const handleBannerAdd = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const imageFile = form.imageFile.files[0];
    const itemName = form.medicine.value;
    const sellerEmail = user?.email;
    const status = "pending";

    try {
      const image = await imageUpload(imageFile);
      const bannerData = {
        title,
        description,
        image,
        Selleremail: sellerEmail,
        itemName,
        Status: status,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/banners`, bannerData);

      form.reset();
      setIsModalOpen(false);
      refetch(); // Refetch after adding new banner
    } catch (err) {
      console.error(err);
      setError("Failed to add banner. Please try again later.");
    }
  };

  if (isMedicinesLoading || isBannersLoading) {
    return <div className="text-center text-lg text-indigo-500 mt-10">Loading...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-700">Your Advertisements</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition duration-300"
        >
          Add Advertisement
        </button>
      </div>

      {/* Banners Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Item Name</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr key={banner._id} className="border-t">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{banner.itemName}</td>
                <td className="py-3 px-6">
                  {banner.Status === "approved" ? (
                    <span className="text-green-600 font-semibold">{banner.Status}</span>
                  ) : (
                    <span className="text-red-500 font-semibold">{banner.Status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-xl p-8 space-y-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800">Create New Advertisement</h2>

            <form onSubmit={handleBannerAdd} className="space-y-6">
              {/* Select Medicine */}
              <div>
                <label htmlFor="medicine" className="block mb-2 text-sm font-semibold text-gray-600">
                  Select Medicine
                </label>
                <select
                  id="medicine"
                  name="medicine"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">-- Select Medicine --</option>
                  {medicines.map((medicine) => (
                    <option key={medicine._id} value={medicine.itemName}>
                      {medicine.itemName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title Input */}
<div>
  <label htmlFor="title" className="block text-sm font-medium text-gray-600">
    Advertisement Title
  </label>
  <input
    type="text"
    id="title"
    name="title"
    placeholder="Enter Advertisement Title"
    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  />
</div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block mb-2 text-sm font-semibold text-gray-600">
                  Advertisement Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                ></textarea>
              </div>

              {/* Upload Image */}
              <div>
                <label htmlFor="imageFile" className="block mb-2 text-sm font-semibold text-gray-600">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  accept="image/*"
                  required
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Actions */}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AskforBanner;
