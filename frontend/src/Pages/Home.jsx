import React, { useEffect, useRef, useState } from "react";
import car1 from "../../public/images/car1.png";
import car2 from "../../public/images/car2.png";
import car3 from "../../public/images/car3.png";
import car4 from "../../public/images/car4.png";
import car5 from "../../public/images/car5.png";
import car6 from "../../public/images/car6.png";
import {
  FaLongArrowAltRight,
  FaLongArrowAltLeft,
  FaHeart,
  FaShareAlt,
  FaBell,
  FaCommentDots,
  FaCar,
  FaStar,
  FaShoppingCart,
} from "react-icons/fa";
// import VennDiagram from "../Components/Services";
import TopHitCars from "../Components/TopHitCars";
import CarCategories from "../Components/CarCategories";
import NavBar from "../Components/NavBar";

const cars = [
  {
    name: "Tesla Model S",
    image: car1,
    price: "$79,990",
    description: "Luxury electric performance with unmatched acceleration and range.",
    rating: 5,
  },
  {
    name: "BMW i8",
    image: car2,
    price: "$147,500",
    description: "Hybrid sports car with futuristic design and power.",
    rating: 4,
  },
  {
    name: "Mercedes-Benz G-Wagon",
    image: car3,
    price: "$131,750",
    description: "Bold design meets elite off-road and city luxury.",
    rating: 5,
  },
  {
    name: "Audi R8",
    image: car4,
    price: "$158,600",
    description: "Precision German engineering in a breathtaking supercar.",
    rating: 4,
  },
  {
    name: "Porsche Taycan",
    image: car5,
    price: "$90,900",
    description: "Electric soul, Porsche heart. Speed and sustainability combined.",
    rating: 5,
  },
  {
    name: "Range Rover Sport",
    image: car6,
    price: "$83,000",
    description: "Ultimate blend of luxury, technology, and rugged capability.",
    rating: 4,
  },
];

const Home = () => {
  const carouselRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

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
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (direction) => {
    const scrollAmount = 320;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  const renderStars = (count) => {
    return Array(count)
      .fill()
      .map((_, i) => (
        <FaStar key={i} className="text-yellow-400 text-sm inline" />
      ));
  };

  return (
    <>
      <NavBar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <div className="mt-20">
        <div className="bg-gradient-to-br from-violet-100 to-white min-h-screen w-full">
          <TopHitCars />
          <CarCategories selectedCategory={selectedCategory} />
        <div className="relative max-w-7xl mx-auto overflow-hidden">
          <div className="w-11/12 mx-auto">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto scroll-smooth space-x-6 pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cars.map((car, index) => (
                <div
                  key={index}
                  className="min-w-[300px] bg-white rounded-2xl shadow-xl p-4 transition-transform hover:scale-105 duration-300 flex-shrink-0"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{car.name}</h3>
                  <div className="mb-2">{renderStars(car.rating)}</div>
                  <p className="text-sm text-gray-600 mb-2">{car.description}</p>
                  <p className="text-lg font-semibold text-violet-600 mb-3">{car.price}</p>

                  <button className="w-full bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 text-white py-2 rounded-full font-medium flex items-center justify-center gap-2 mb-3">
                    <FaShoppingCart />
                    Buy Now
                  </button>

                  <div className="flex items-center justify-between">
                    <button className="text-red-500 hover:text-red-600 text-xl" title="Like">
                      <FaHeart />
                    </button>
                    <button className="text-blue-500 hover:text-blue-600 text-xl" title="Share">
                      <FaShareAlt />
                    </button>
                    <button className="text-yellow-500 hover:text-yellow-600 text-xl" title="Subscribe">
                      <FaBell />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700 text-xl" title="Comment">
                      <FaCommentDots />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-10">
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
        {/* <div className="mt-20">
          <VennDiagram />
        </div> */}
      </div>
    </>
  );
};

export default Home;
