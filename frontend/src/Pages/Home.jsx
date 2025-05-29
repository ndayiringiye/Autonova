import React, { useEffect, useRef } from "react";
import car1 from "../../public/images/car1.png";
import car2 from "../../public/images/car2.png";
import car3 from "../../public/images/car3.png";
import car4 from "../../public/images/car4.png";
import car5 from "../../public/images/car5.png";
import car6 from "../../public/images/car6.png";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";

const images = [car1, car2, car3, car4, car5, car6];

const Home = () => {
  const carouselRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += 1;
        if (
          carouselRef.current.scrollLeft + carouselRef.current.offsetWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollLeft = 0;
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = 300;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-100 to-white py-10 px-4">
      <div className="text-center max-w-4xl mx-auto mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold text-violet-700 mb-4">
          Drive Your Dreams.
        </h1>
        <p className="text-gray-700 text-lg md:text-xl">
          Explore top car brands with unbeatable deals. Style. Power. Affordability.
        </p>
        <p className="text-gray-500 italic mt-2">Buy your next car today — you deserve the best.</p>
      </div>
      <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
        <div
          ref={carouselRef}
          className="flex overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar"
        >
          {images.concat(images).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Car ${index + 1}`}
              className="w-[300px] h-[200px] object-cover rounded-xl shadow-md mx-2 transition-transform hover:scale-105 duration-300"
            />
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-8">
          <button
            onClick={() => handleScroll("left")}
            className="flex items-center gap-2 bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition"
          >
            <FaLongArrowAltLeft />
            Previous
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="flex items-center gap-2 bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition"
          >
            Next
            <FaLongArrowAltRight />
          </button>
        </div>
      </div>
    </div>
  );
};


export default Home;
