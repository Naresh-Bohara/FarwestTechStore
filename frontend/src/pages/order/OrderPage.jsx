import { useEffect, useState } from "react";
import { FaBox, FaCheckCircle, FaTimesCircle, FaClock, FaMoneyBill } from "react-icons/fa";
import orderSvc from "./order.service";

const statusStyle = {
  pending: { icon: <FaClock />, color: "text-yellow-500", bg: "bg-yellow-100" },
  processing: { icon: <FaBox />, color: "text-blue-500", bg: "bg-blue-100" },
  shipped: { icon: <FaBox />, color: "text-indigo-500", bg: "bg-indigo-100" },
  completed: { icon: <FaCheckCircle />, color: "text-green-600", bg: "bg-green-100" },
  cancelled: { icon: <FaTimesCircle />, color: "text-red-500", bg: "bg-red-100" },
};

const paymentStyle = {
  pending: "text-yellow-500",
  paid: "text-green-600",
  failed: "text-red-500",
};

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await orderSvc.getMyOrders();
      setOrders(res?.detail?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">

      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-5">

          {orders.map((order) => {
            const status = statusStyle[order.status] || statusStyle.pending;

            return (
              <div
                key={order._id}
                className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-5"
              >

                {/* TOP INFO */}
                <div className="flex flex-col md:flex-row justify-between gap-3">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order ID: <span className="font-medium">{order._id}</span>
                    </p>

                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <p className="text-sm">
                      Payment:{" "}
                      <span className={paymentStyle[order.paymentStatus]}>
                        {order.paymentStatus}
                      </span>
                    </p>
                  </div>

                  {/* STATUS */}
                  <div
                    className={`flex items-center gap-2 px-3 py-1 rounded-full ${status.bg}`}
                  >
                    <span className={status.color}>{status.icon}</span>
                    <span className={`text-sm font-semibold ${status.color}`}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>

                </div>

                {/* ITEMS */}
                <div className="mt-4 border-t pt-3">
                  {order.items?.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between text-sm text-gray-600 dark:text-gray-300 py-1"
                    >
                      <span>
                        Product × {item.quantity}
                      </span>
                      <span>Rs. {item.amount/100}</span>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="mt-4 border-t pt-3 flex justify-between items-center">

                  <div className="text-sm text-gray-500">
                    Buyer: {order.buyer?.name}
                  </div>

                  <div className="flex items-center gap-2 text-lg font-bold text-teal-600">
                    <FaMoneyBill />
                    Rs. {order.total/100}
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}
    </div>
  );
};

export default OrderPage;