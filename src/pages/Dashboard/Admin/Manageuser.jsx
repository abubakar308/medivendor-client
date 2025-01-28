import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../../Shared/Loading/Loading";
import useAuth from "../../../hooks/useAuth";


const Manageuser = () => {
// const {user} = useAuth()
    const {data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const { data } = await axios(`${import.meta.env.VITE_API_URL}/all-users`)
          return data
        },
      })
      if(isLoading) return <Loading />;

    return (
        <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Users</h1>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 text-sm font-medium">Photo</th>
              <th className="p-4 text-sm font-medium">Name</th>
              <th className="p-4 text-sm font-medium">Email</th>
              <th className="p-4 text-sm font-medium">Role</th>
              <th className="p-4 text-sm font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
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
                  {/* Promote to Seller */}
                  {user.role !== 'seller' && (
                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                      Make Seller
                    </button>
                  )}
                  {/* Promote to Admin */}
                  {user.role !== 'admin' && (
                    <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                      Make Admin
                    </button>
                  )}
                  {/* Downgrade to User */}
                  {user.role !== 'user' && (
                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
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