import React, { useEffect, useState } from "react";
import car2 from "../../public/images/car2.png";
import car4 from "../../public/images/car4.png";
import car6 from "../../public/images/car6.png";
import bg39 from "../../public/images/bg 39.png";
import {
  FaCarSide,
  FaChargingStation,
  FaCrown,
  FaUserFriends,
  FaBolt,
  FaRoad,
} from "react-icons/fa";

// Optional: Uncomment if you want scroll animations
// import { motion } from "framer-motion";

const categories = [
  {
    name: "Luxury Rides",
    icon: <FaCrown className="text-yellow-500 text-3xl" />,
    description: "Drive prestige. Discover elite comfort and craftsmanship.",
  },
  {
    name: "Electric Cars",
    icon: <FaChargingStation className="text-green-500 text-3xl" />,
    description: "Go green with powerful, eco-conscious performance.",
  },
  {
    name: "Sport Cars",
    icon: <FaRoad className="text-red-500 text-3xl" />,
    description: "Speed, thrill, and precision. Born to perform.",
  },
  {
    name: "SUVs & Crossovers",
    icon: <FaCarSide className="text-blue-500 text-3xl" />,
    description: "Space meets strength. Perfect for all your adventures.",
  },
  {
    name: "Family Cars",
    icon: <FaUserFriends className="text-indigo-500 text-3xl" />,
    description: "Safe, spacious, and perfect for your loved ones.",
  },
  {
    name: "Affordable Deals",
    icon: <FaBolt className="text-purple-500 text-3xl" />,
    description: "Value-packed vehicles for smart, stylish driving.",
  },
];

const backgroundImages = [bg39, car4, car6];

const Categories = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleFilter = (name) => {
    setSelectedCategory(name);
    setShowDropdown(false); // auto-close mobile dropdown after selecting
  };

  const filteredCategories =
    selectedCategory === "All"
      ? categories
      : categories.filter((cat) => cat.name === selectedCategory);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 z-0"
        style={{ backgroundImage: `url(${backgroundImages[bgIndex]})`, opacity: 0.2 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row w-11/12 max-w-7xl mx-auto py-20 px-4">

        {/* Mobile Dropdown */}
        <div className="sm:hidden w-full mb-6">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="w-full bg-violet-600 text-white px-4 py-3 rounded-xl shadow-md font-semibold flex items-center justify-between"
          >
            {selectedCategory === "All" ? "Browse Types" : selectedCategory}
            <span>{showDropdown ? "▲" : "▼"}</span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showDropdown ? "max-h-[500px] mt-4" : "max-h-0"
            }`}
          >
            <ul className="bg-white bg-opacity-90 backdrop-blur-md p-4 rounded-xl shadow-md space-y-3">
              <li
                onClick={() => handleFilter("All")}
                className="cursor-pointer text-gray-700 hover:text-violet-700 font-medium"
              >
                Show All
              </li>
              {categories.map((cat, index) => (
                <li
                  key={index}
                  onClick={() => handleFilter(cat.name)}
                  className="cursor-pointer flex items-center gap-3 text-gray-700 hover:text-violet-700 transition-all"
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar - Desktop */}
        <div className="hidden sm:block lg:w-1/4 mb-10 lg:mb-0">
          <div className="bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-2xl shadow-lg h-full">
            <h3 className="text-2xl font-bold text-violet-700 mb-6">Browse Types</h3>
            <ul className="space-y-4">
              <li
                onClick={() => handleFilter("All")}
                className={`cursor-pointer font-medium ${
                  selectedCategory === "All"
                    ? "text-violet-700"
                    : "text-gray-700 hover:text-violet-700"
                }`}
              >
                Show All
              </li>
              {categories.map((cat, index) => (
                <li
                  key={index}
                  onClick={() => handleFilter(cat.name)}
                  className={`cursor-pointer flex items-center gap-3 transition-all ${
                    selectedCategory === cat.name
                      ? "text-violet-700 font-semibold"
                      : "text-gray-700 hover:text-violet-700"
                  }`}
                >
                  {cat.icon}
                  <span>{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cards */}
        <div className="lg:w-3/4">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-violet-600 drop-shadow-md mb-3">
              Explore by Category
            </h2>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto">
              {selectedCategory === "All"
                ? "Find the perfect ride tailored to your lifestyle — luxury, family, electric, or sport."
                : `Showing results for ${selectedCategory}`}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {filteredCategories.map((cat, index) => (
              // Optional: Wrap this in <motion.div> for scroll animation
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all border border-gray-100 hover:border-violet-400 backdrop-blur-lg bg-opacity-80"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{cat.name}</h3>
                </div>
                <p className="text-gray-600">{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
