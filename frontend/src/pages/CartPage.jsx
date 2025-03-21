import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Trash icon for removing items
import productImage from '../assets/images/product.jpg'; // Sample product image

const CartPage = () => {
  // Sample data for cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'RC 2205 Brushless Motor',
      category: 'Robotics',
      price: 1450,
      quantity: 1,
      image: productImage,
      inStock: true,
    },
    {
      id: 2,
      name: 'Drone Frame Kit',
      category: 'Drones & UAVs',
      price: 3200,
      quantity: 1,
      image: productImage,
      inStock: true,
    },
    {
      id: 3,
      name: 'Arduino Uno R3',
      category: 'Microcontrollers',
      price: 850,
      quantity: 1,
      image: productImage,
      inStock: true,
    },
  ]);

  // Function to handle quantity change
  const handleQuantityChange = (id, type) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === id) {
        const updatedQuantity = type === 'increment' ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: updatedQuantity > 0 ? updatedQuantity : 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  // Function to remove an item from the cart
  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Cart Header */}
      <h1 className="text-4xl font-bold text-[#213245] mb-8">Your Cart</h1>

      {/* Cart Items */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Products Section */}
        <div className="lg:w-3/4 space-y-6">
          {cartItems.map((item, index) => (
            <div key={item.id} className="flex items-center justify-between border-b pb-6">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
                <div>
                  <h2 className="text-xl font-semibold text-[#213245]">
                    {index + 1}. {item.name}
                  </h2>
                  <p className="text-sm text-gray-500">Category: {item.category}</p>
                  <p className={`text-sm ${item.inStock ? 'text-green-500' : 'text-red-500'}`}>
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
              {/* Quantity and Price Section */}
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => handleQuantityChange(item.id, 'decrement')}
                    className="px-3 py-1 text-lg font-semibold text-gray-600"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => e.target.value}
                    className="w-12 text-center border-l border-r border-gray-300 focus:outline-none"
                    min={1}
                  />
                  <button
                    onClick={() => handleQuantityChange(item.id, 'increment')}
                    className="px-3 py-1 text-lg font-semibold text-gray-600"
                  >
                    +
                  </button>
                </div>
                <p className="text-lg font-semibold text-[#213245]">Rs. {item.price * item.quantity}</p>
                <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/4 bg-[#E0F7FA] p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-2xl font-bold text-[#213245] mb-4">Order Summary</h2>
          <div className="flex justify-between text-lg text-gray-600">
            <span>Subtotal:</span>
            <span>
              Rs.{' '}
              {cartItems.reduce((total, item) => {
                return total + item.price * item.quantity;
              }, 0)}
            </span>
          </div>
          <div className="flex justify-between text-lg text-gray-600">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-lg text-gray-600 border-t pt-4">
            <span>Total:</span>
            <span className="text-xl font-bold text-[#213245]">
              Rs.{' '}
              {cartItems.reduce((total, item) => {
                return total + item.price * item.quantity;
              }, 0)}
            </span>
          </div>

          {/* Checkout Button */}
          <button className="w-full bg-[#213245] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#1b2731] transition duration-300">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
