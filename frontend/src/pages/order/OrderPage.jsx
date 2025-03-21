import React, { useState } from 'react';
import { FaCheckCircle, FaTimesCircle, FaShippingFast, FaCog } from 'react-icons/fa';

const OrderPage = () => {
  const initialOrders = [
    {
      orderId: 'ORD12345',
      userName: 'Naresh Bohara',
      dateCreated: 'Jul 17, 2024 5:27 PM',
      dateUpdated: 'Oct 6, 2024 5:35 PM',
      items: [
        { name: 'Redmi Note 11 Pro', quantity: 1, price: 38000 },
      ],
      status: 'Processing',
    },
    {
      orderId: 'ORD12346',
      userName: 'Naresh Bohara',
      dateCreated: 'Jul 17, 2024 5:27 PM',
      dateUpdated: 'Jul 17, 2024 5:27 PM',
      items: [
        { name: 'Product A', quantity: 2, price: 1500 },
      ],
      status: 'Processing',
    },
    {
      orderId: 'ORD12347',
      userName: 'Naresh Bohara',
      dateCreated: 'Jul 17, 2024 5:27 PM',
      dateUpdated: 'Jul 17, 2024 10:41 AM',
      items: [
        { name: 'Product B', quantity: 1, price: 2500 },
      ],
      status: 'Processing',
    },
  ];

  const [orders, setOrders] = useState(initialOrders);

  const changeStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    setOrders(updatedOrders);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'Shipped':
        return <FaShippingFast className="text-blue-500" />;
      case 'Cancelled':
        return <FaTimesCircle className="text-red-500" />;
      case 'Processing':
        return <FaCog className="animate-spin text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
      <h1 className="text-2xl font-bold text-teal-950 py-3 border-b-2 border-teal-700">
        My Orders
      </h1>
      <div className="mx-auto my-3 px-4 lg:px-12">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 sm:p-6">
          {orders.map((order, index) => (
            <div key={order.orderId} className="mb-6 border-b pb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Order #{order.orderId}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    User: {order.userName}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Created At: {order.dateCreated}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Updated At: {order.dateUpdated}
                  </p>
                </div>
                <div className="text-xl mt-2 sm:mt-0">
                  {getStatusIcon(order.status)}{' '}
                  <span className="text-sm font-semibold">
                    {order.status}
                  </span>
                </div>
              </div>
              <ul className="mb-3">
                {order.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>Rs. {item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-right text-lg font-bold text-teal-700 dark:text-teal-400 mb-2 sm:mb-0">
                  Total: Rs. {order.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                </div>
                <div>
                  <select
                    value={order.status}
                    onChange={(e) => changeStatus(index, e.target.value)}
                    className="border rounded-md p-1 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderPage;
