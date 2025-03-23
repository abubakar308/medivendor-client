import { useState, Fragment } from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { Dialog, Transition } from "@headlessui/react";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth(); // Ensure updateUserProfile exists
  const [role] = useRole();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [image, setImage] = useState(user?.photoURL || "");
  const [newImage, setNewImage] = useState(null);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewImage(imageUrl);
    }
  };

  const handleSaveChanges = async () => {
    await updateUserProfile(name, newImage || image);
    setImage(newImage || image);
    closeModal();
  };

  return (
    <div className="container mx-auto p-4">
     <h3 className="text-center text-2xl font-semibold text-primary">
  {role === "admin"
    ? "Admin Profile"
    : role === "seller"
    ? "Seller Profile"
    : "User Profile"}
</h3>

      {/* User Header with Gradient Background */}
      <div className="relative w-full h-[200px] md:h-[250px] bg-gradient-to-r from-blue-400 to-green-500 rounded-lg shadow-md flex justify-center items-center">
        {/* Profile Picture */}
        <div className="absolute -bottom-14">
          <img
            src={image}
            alt="User"
            className="rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-16">
        <p className="text-md mt-2 text-gray-700">Role: {role}</p>
        <h2 className="text-3xl font-bold">{name}</h2>
        <p className="text-lg text-gray-600">{user?.email}</p>

        {/* Update Profile Button */}
        <button
          onClick={openModal}
          className="mt-6 px-6 py-2 bg-primary hover:bg-blue-700 text-white rounded-lg shadow-md transition duration-300"
        >
          Update Profile
        </button>
      </div>

      {/* Update Profile Modal */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
              <Dialog.Title className="text-xl font-bold">
                Update Profile
              </Dialog.Title>

              {/* Profile Image Upload */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border rounded-lg p-2 mt-1"
                />
                {newImage && (
                  <img
                    src={newImage}
                    alt="Preview"
                    className="w-20 h-20 mt-2 rounded-full object-cover"
                  />
                )}
              </div>

              {/* Name Input */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email (Read-Only) */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg p-2 mt-1 bg-gray-100"
                  value={user?.email}
                  disabled
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default MyProfile;
