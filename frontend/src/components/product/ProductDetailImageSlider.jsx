import { Carousel } from "flowbite-react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const ProductDetailImageSlider = ({ images }) => {
  return (
    <div className="w-full max-w-md lg:max-w-lg mx-auto">
      <Carousel
        leftControl={
          <FaChevronCircleLeft className="w-8 h-8 text-white dark:text-gray-300 drop-shadow-lg" />
        }
        rightControl={
          <FaChevronCircleRight className="w-8 h-8 text-white dark:text-gray-300 drop-shadow-lg" />
        }
        indicators={true}
        slideInterval={4000} 
      >
        {images?.map((img, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full h-96 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden"
          >
            <img
              src={img}
              alt={`Product image ${index + 1}`}
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductDetailImageSlider;
