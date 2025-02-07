import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const Manageuser = () => {
const {user} = useAuth()
const axiosSecure = useAxiosSecure()
    const {data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
          const { data } = await axiosSecure(`/all-users/${user?.email}`);
          return data
        },
        enabled: !!user?.email,
      });
      if(isLoading) return <Loading />;


      const handleRoleChange = async (userId, newRole) => {
        try {
          // Send API request to update the user's role
          const response = await axiosSecure.patch(`/update-role/${userId}`, { role: newRole });
          console.log(response.data.message);
          refetch(); // Refetch the users after updating the role
        } catch (error) {
          console.error("Error updating role:", error);
        }
      };

      
    return (
        <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-base-100 border-b">
              <th className="p-4 text-sm font-medium">Photo</th>
              <th className="p-4 text-sm font-medium">Name</th>
              <th className="p-4 text-sm font-medium">Email</th>
              <th className="p-4 text-sm font-medium">Role</th>
              <th className="p-4 text-sm font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b">
                <td className="p-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-4 text-sm">{user?.name}</td>
                <td className="p-4 text-sm">{user?.email}</td>
                <td className="p-4 text-sm font-semibold">{user.role}</td>
                <td className="p-4 flex justify-center items-center gap-2">
                  {/* Make Seller */}
                  {user.role !== 'seller' && (
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleRoleChange(user._id, 'seller')}
                    >
                      Make Seller
                    </button>
                  )}

                  {/* Make Admin */}
                  {user.role !== 'admin' && (
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleRoleChange(user._id, 'admin')}
                    >
                      Make Admin
                    </button>
                  )}

                  {/* Downgrade */}
                  {user.role !== 'user' && (
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleRoleChange(user._id, 'user')}
                    >
                      Downgrade
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    );
};

export default Manageuser;