import { Carousel } from 'flowbite-react';
import React from 'react';

const DefaultSlider = ({ data }) => {
  return (
    <div id="default-carousel" className="relative w-full">
      {/* Carousel container with responsive height */}
      <div className="relative mt-[5px] mb-[1px] h-32 sm:h-48 md:h-56 lg:h-72 xl:h-80">
        <Carousel>
          {data &&
            data.map((row, i) => (
              <div key={i} className="relative w-full h-full">
                {/* "NEW" badge positioned correctly within the visible area */}
                {Date.now() - new Date(row.createdAt).getTime() <
                  3 * 24 * 60 * 60 * 1000 && (
                  <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg z-10">
                    NEW
                  </span>
                )}
                <a
                  href={row.link}
                  target="_banner"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                >
                  <img
                    className="w-full h-full object-cover rounded-lg"
                    src={row.image}
                    alt=""
                  />
                </a>
              </div>
            ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DefaultSlider;
