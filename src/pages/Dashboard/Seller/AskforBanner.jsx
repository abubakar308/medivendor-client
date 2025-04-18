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

  const handleBnnerAdd = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const description = form.description.value;
    const imageFile = form.imageFile?.files[0];
    const itemName = form.medicine.value;
    const Selleremail = user?.email;
    const Status = 'pending';

    try {
      const image = await imageUpload(imageFile);
      const bannerData = {
        description,
        image,
        Selleremail,
        itemName,
        Status,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/banners`, bannerData);
      setIsModalOpen(false);
      refetch(); // Refetch banners data
    } catch (err) {
      setError("Failed to add banner. Please try again later.");
    }
  };

  const { data: medicines = [], isLoading: isMedicinesLoading } = useQuery({
    queryKey: ['medicines', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/added-medicines?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  const { data: banners, isLoading: isBannersLoading } = useQuery({
    queryKey: ['banners', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/banners?email=${user?.email}`);
      return data;
    },
    enabled: !!user?.email,
  });

  if (isMedicinesLoading || isBannersLoading) {
    return <div>Loading...</div>; // Add a loading spinner or message
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Medicines for Advertisement</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-base-300 rounded-lg hover:bg-blue-600"
        >
          Add Advertisement
        </button>
      </div>

      {/* Medicines List */}
      <table className="table-auto border-collapse border border-gray-300 w-full text-left">
        <thead>
          <tr className="bg-base-100">
            <th className="border border-gray-300 px-4 py-2">#</th>
            <th className="border border-gray-300 px-4 py-2">Item Name</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {banners?.map((medicine, index) => (
            <tr key={medicine._id}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{medicine.itemName}</td>
              <td className="border border-gray-300 px-4 py-2">
                {medicine.Status === 'approved' ? (
                  <span className="text-green-500">{medicine?.Status}</span>
                ) : (
                  <span className="text-red-500">{medicine?.Status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding Advertisement */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-w-lg w-full bg-white p-6 rounded-lg shadow-lg space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Add Advertisement</h2>
            <form onSubmit={handleBnnerAdd} className="space-y-6">
              {/* Medicine Selection */}
              <div>
                <label htmlFor="medicine" className="block text-sm font-medium text-gray-600">
                  Select Medicine
                </label>
                <select
                  id="medicine"
                  name="medicine"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Select Medicine --</option>
                  {medicines?.map((medicine) => (
                    <option key={medicine._id} value={medicine.itemName}>
                      {medicine.itemName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Advertisement Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-600">
                  Advertisement Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                ></textarea>
              </div>

              {/* Upload Image */}
              <div>
                <label htmlFor="imageFile" className="block text-sm font-medium text-gray-600">
                  Upload Advertisement Image
                </label>
                <input
                  type="file"
                  id="imageFile"
                  name="imageFile"
                  className="w-full border border-gray-300 rounded-lg p-3"
                  accept="image/*"
                  required
                />
              </div>

              {/* Error Message */}
              {error && <p className="text-red-500 text-sm">{error}</p>}

              {/* Action Buttons */}
              <div className="flex justify-end gap-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add
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
