import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

const MyProfile = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-center text-2xl text-primary">
        Hi {user?.displayName}, Welcome
      </h3>

      {/* User Header with Gradient Background */}
      <div className="relative w-full h-[250px] md:h-[300px] bg-gradient-to-r from-blue-500 to-green-400 rounded-lg shadow-md flex justify-center items-center">
        {/* Profile Picture */}
        <div className="absolute -bottom-14">
          <img
            src={user?.photoURL}
            alt="User"
            className="rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-lg"
          />
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mt-16">
        <p className="text-md mt-2 text-gray-700">Role: {role}</p>
        <h2 className="text-3xl font-bold">{user?.displayName}</h2>
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
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  defaultValue={user?.displayName}
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full border rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  defaultValue={user?.email}
                  disabled
                />
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-gray-300 rounded-lg mr-2"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
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
