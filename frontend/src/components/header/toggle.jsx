import React from 'react';

const AnimatedToggle = ({ isOpen, onClick }) => {
  return (
    <button onClick={onClick} className="ml-2 focus:outline-none">
      <div className="relative w-8 h-8">
        {/* Line 1 */}
        <span
          className={`absolute top-1/2 left-0 w-full h-1 bg-teal-800 transform transition-transform duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-1" : "-translate-y-1"}`}
        ></span>
        {/* Line 2 */}
        <span
          className={`absolute top-1/2 left-0 w-full h-1 bg-teal-800 transform transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100"}`}
        ></span>
        {/* Line 3 */}
        <span
          className={`absolute top-1/2 left-0 w-full h-1 bg-teal-800 transform transition-transform duration-300 ease-in-out ${isOpen ? "-rotate-45 translate-y-1" : "translate-y-1"}`}
        ></span>
      </div>
    </button>
  );
};

export default AnimatedToggle;
