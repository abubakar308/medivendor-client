import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Loading from "../../Shared/Loading/Loading";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const CartPage = () => {
  const { user } = useAuth();

  const {
    data: cartdata = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["cartdata", user?.email],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/cart?email=${user?.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  // ===========================
  // REMOVE ONE ITEM
  // ===========================
  const removeItem = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this cart item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${import.meta.env.VITE_API_URL}/cart/${id}`);
          await refetch();

          Swal.fire("Deleted!", "Item removed successfully.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to delete item.", "error");
        }
      }
    });
  };

  // ===========================
  // CLEAR ALL CARTS
  // ===========================
  const clearAllCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to clear all items from cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `${import.meta.env.VITE_API_URL}/cart?email=${user?.email}`
          );
          await refetch();

          Swal.fire("Cleared!", "All cart items removed.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to clear cart.", "error");
        }
      }
    });
  };

  // ===========================
  // UPDATE QUANTITY
  // ===========================
  const handleQuantity = async (quantity, id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/cart/${id}`, {
        quantity,
      });

      // UI update
      refetch();
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto rounded-lg shadow-md">
      <Helmet>
        <title>Cart {user?.displayName}</title>
      </Helmet>

      <h2 className="text-2xl font-semibold mb-6">My Cart</h2>

      {cartdata?.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-3 border-b-2 border-gray-300">Name</th>
                <th className="p-3 border-b-2 border-gray-300">Company</th>
                <th className="p-3 border-b-2 border-gray-300">Price</th>
                <th className="p-3 border-b-2 border-gray-300">Quantity</th>
                <th className="p-3 border-b-2 border-gray-300">Actions</th>
              </tr>
            </thead>

            <tbody>
              {cartdata?.map((item) => (
                <tr key={item._id}>
                  <td className="p-3 border-b border-gray-300">{item.itemName}</td>
                  <td className="p-3 border-b border-gray-300">{item.companyName}</td>
                  <td className="p-3 border-b border-gray-300">
                    ${item.perUnitPrice}
                  </td>

                  {/* Quantity */}
                  <td className="p-3 border-b border-gray-300 text-center">
                    <input
                      defaultValue={item?.quantity}
                      onChange={(e) =>
                        handleQuantity(parseInt(e.target.value), item._id)
                      }
                      className="p-2 border border-gray-300 rounded-md"
                      type="number"
                      min={1}
                    />
                  </td>

                  <td className="p-3 border-b border-gray-300">
                    <button
                      onClick={() => removeItem(item._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Clear Cart */}
          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={clearAllCart}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              Clear Cart
            </button>
          </div>

          <div className="mt-6 text-right">
            <NavLink to="/checkout">
              <button className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Checkout
              </button>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
