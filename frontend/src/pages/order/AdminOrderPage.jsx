import { useEffect, useState } from "react";
import { FaCheck, FaTimes, FaEye } from "react-icons/fa";
import orderSvc from "./order.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [previewImage, setPreviewImage] = useState(null);
  const [imgLoading, setImgLoading] = useState(false); 
  const navigate = useNavigate();

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await orderSvc.getAllOrders();
      const data = res?.detail?.data || res?.detail || [];
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const openImage = (url) => {
    setPreviewImage(url);
    setImgLoading(true); // start loader
  };

  const verifyPayment = async (id, status) => {
    try {
      await orderSvc.verifyPayment(id, { paymentStatus: status });
      toast.success("Payment updated");
      loadOrders();
    } catch {
      toast.error("Failed to update payment");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await orderSvc.updateOrderStatus(id, { status });
      toast.success("Order status updated");
      loadOrders();
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-6">Admin Orders</h1>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full text-sm text-left">

          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Order</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Total</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Status</th>
              <th className="p-3">Screenshot</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b hover:bg-gray-50">

                <td className="p-3 text-xs">{order._id}</td>

                <td className="p-3">
                  <p className="font-medium">{order.buyer?.name}</p>
                  <p className="text-xs text-gray-500">{order.buyer?.email}</p>
                </td>

                <td className="p-3 font-semibold text-teal-600">
                  Rs. {order.total}
                </td>

                <td className="p-3">
                  <span className={
                    order.paymentStatus === "verified"
                      ? "text-green-600"
                      : order.paymentStatus === "rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }>
                    {order.paymentStatus}
                  </span>

                  <div className="flex gap-2 mt-2">
                    <button onClick={() => verifyPayment(order._id, "paid")} className="text-green-600">
                      <FaCheck />
                    </button>
                    <button onClick={() => verifyPayment(order._id, "failed")} className="text-red-500">
                      <FaTimes />
                    </button>
                  </div>
                </td>

                <td className="p-3">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                <td className="p-3">
                  {order.paymentScreenshot ? (
                    <button
                      onClick={() => openImage(order.paymentScreenshot)}
                      className="text-blue-600 underline"
                    >
                      View
                    </button>
                  ) : (
                    <span className="text-gray-400">No</span>
                  )}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    className="text-blue-600 flex items-center gap-1"
                  >
                    <FaEye /> View Order
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {previewImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

          {/* MODAL BOX */}
          <div className="bg-white rounded-xl w-[80%] h-[80%] relative flex items-center justify-center shadow-2xl animate-fadeIn">

            {/* CLOSE BUTTON (TOP) */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 text-red-500 text-xl font-bold"
            >
              ✕
            </button>

            {/* LOADING STATE */}
            {imgLoading && (
              <div className="absolute flex flex-col items-center gap-2">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Loading image...</p>
              </div>
            )}

            {/* IMAGE */}
            <img
              src={previewImage}
              alt="Payment Screenshot"
              className="max-w-full max-h-full object-contain rounded"
              onLoad={() => setImgLoading(false)}
            />

            {/* BOTTOM CLOSE BUTTON */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute bottom-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Close
            </button>

          </div>

        </div>
      )}

      {/* ANIMATION STYLE */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              transform: scale(0.9);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}
      </style>

    </div>
  );
};

export default AdminOrderPage;