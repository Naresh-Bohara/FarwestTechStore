import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import orderSvc from "./order.service";
import { FaTimes } from "react-icons/fa";

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const res = await orderSvc.getOrderById(id);
      setOrder(res?.detail);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!order) return <div className="p-6">Order not found</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">
        Order Detail
      </h1>

      <div className="bg-white p-4 rounded shadow space-y-2">

        <p><b>Order ID:</b> {order._id}</p>
        <p><b>Customer:</b> {order.buyer?.name}</p>
        <p><b>Email:</b> {order.buyer?.email}</p>
        <p><b>Total:</b> Rs. {order.total}</p>
        <p><b>Status:</b> {order.status}</p>
        <p><b>Payment:</b> {order.paymentStatus}</p>

        {/* ITEMS */}
        <div className="mt-4">
          <h2 className="font-semibold">Items</h2>

          {order.items?.map((item) => (
            <div key={item._id} className="flex justify-between border-b py-2">
              <span>Product</span>
              <span>{item.quantity} × Rs {item.price}</span>
            </div>
          ))}
        </div>

        {/* SCREENSHOT */}
        <div className="mt-4">
          <h2 className="font-semibold">Payment Screenshot</h2>

          {order.paymentScreenshot ? (
            <img
              src={order.paymentScreenshot}
              onClick={() => setShowImage(true)}
              className="w-64 mt-2 cursor-pointer border rounded"
            />
          ) : (
            <p className="text-gray-500">No screenshot</p>
          )}
        </div>

      </div>

      {/* IMAGE POPUP */}
      {showImage && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="relative bg-white p-4 rounded">

            <button
              onClick={() => setShowImage(false)}
              className="absolute top-2 right-2 text-red-500"
            >
              <FaTimes />
            </button>

            <img
              src={order.paymentScreenshot}
              className="max-w-3xl max-h-[80vh]"
            />

          </div>

        </div>
      )}

    </div>
  );
};

export default OrderDetailPage;