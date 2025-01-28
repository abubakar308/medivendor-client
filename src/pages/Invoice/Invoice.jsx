import useAuth from "../../hooks/useAuth";

const Invoice = () => {
    const {user} = useAuth()
    
    return (
        <div className="bg-gray-100 p-6">
      <div
        id="invoice"
        className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6"
      >
        {/* Website Logo */}
        <div className="flex items-center justify-between mb-6">
          <img
            src="/logo.png"
            alt="Website Logo"
            className="w-24"
          />
          <h2 className="text-2xl font-bold text-gray-800">Invoice</h2>
        </div>

        {/* User Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">User Information:</h3>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Phone: {user.phone}</p>
        </div>

        {/* Purchase Information */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Purchase Details:</h3>
          <table className="w-full border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2 text-left">Item</th>
                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                <th className="border border-gray-300 px-4 py-2">Price</th>
                <th className="border border-gray-300 px-4 py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {purchases?.map((item, index) => (
                <tr key={index} className="text-gray-700">
                  <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    ${item.price}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    ${item.quantity * item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-end mt-4">
            <p className="text-lg font-bold text-gray-800">Total: ${total}</p>
          </div>
        </div>
      </div>

      {/* Print Button */}
      <div className="flex justify-center mt-6">
        <button
        //   onClick={handlePrint}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          Download Invoice as PDF
        </button>
      </div>
    </div>
    );
};

export default Invoice;