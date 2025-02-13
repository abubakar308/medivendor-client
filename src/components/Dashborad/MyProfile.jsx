import useAuth from "../../hooks/useAuth";
import cover from '../../assets/cover.webp';
import useRole from "../../hooks/useRole";

const MyProfile = () => {
    const {user} = useAuth();
    const [role] =useRole();
    return (
        <div className="container mx-auto">
            <h3 className="text-center text-2xl">Hi {user?.displayName} Welcome</h3>
  {/* User Header */}
  <div className="relative w-full">
    <img src={cover} alt="Cover" className="w-full h-[350px] md:h-[450px] object-cover rounded-lg shadow-md" />

    {/* Profile Picture */}
    <div className="absolute inset-0 flex items-center justify-center -mt-48">
      <img
        src={user?.photoURL}
        alt="User"
        className="rounded-full w-40 h-40 md:w-48 md:h-48 border-4 border-white shadow-lg"
      />
    </div>
    
  </div>

  {/* User Info */}
  <div className="text-center">
  <p className="text-md mt-2">Role: {role}</p>
    <h2 className="text-3xl font-bold">Name: {user?.displayName}</h2>
    <p className="text-lg">Email:  {user?.email}</p>

    <button className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-base-300 rounded-lg shadow-md transition duration-300">
      Update Profile
    </button>
  </div>

  {/* Post Section */}
  <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Create a Post</h3>
    
    <div className="form-control mb-4">
      <textarea
        placeholder="What's on your mind?"
        className="textarea textarea-bordered w-full p-4 border-gray-300 rounded-md focus:ring focus:ring-blue-200"
        rows="4"
      />
      <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-300">
        Post
      </button>
    </div>
  </div>
</div>
    );
};

export default MyProfile;