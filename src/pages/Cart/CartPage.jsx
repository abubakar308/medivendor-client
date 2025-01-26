

const CartPage = () => {
    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Cart</h2>
        {/* {cart.length === 0 ? (
          <p className="text-center text-gray-600">Your cart is empty.</p>
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
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="p-3 border-b border-gray-300">{item.name}</td>
                    <td className="p-3 border-b border-gray-300">{item.company}</td>
                    <td className="p-3 border-b border-gray-300">${item.price}</td>
                    <td className="p-3 border-b border-gray-300 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-300 rounded text-gray-800 hover:bg-gray-400"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="px-2 py-1 bg-gray-300 rounded text-gray-800 hover:bg-gray-400"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 border-b border-gray-300">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
              >
                Clear Cart
              </button>
              <div className="text-lg font-semibold">
                Total: <span className="text-green-500">${calculateTotal()}</span>
              </div>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={handleCheckout}
                className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Checkout
              </button>
            </div>
          </div>
        )} */}
      </div>
    );
};

export default CartPage;