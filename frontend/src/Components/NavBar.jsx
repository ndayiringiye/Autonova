import { Search, Heart, ShoppingCart, Menu, X, User } from "lucide-react";
import { useEffect, useState } from "react";

function NavBar({ favoriteCount = 0, cartCount = 0, selectedCategory = "All", onCategoryChange }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationLinks = [
    { name: "Home", category: null },
    { name: "Shop", category: "All" },
    { name: "Luxury Rides", category: "Luxury Rides" },
    { name: "Electric Cars", category: "Electric Cars" },
    { name: "Sports Cars", category: "Sports Cars" },
    { name: "SUVs & Crossovers", category: "SUVs & Crossovers" },
    { name: "Family Cars", category: "Family Cars" },
    { name: "Deals", category: "Deals" },
  ];

  const handleCategoryClick = (category) => {
    if (onCategoryChange && category) {
      onCategoryChange(category);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200" 
        : "bg-gradient-to-b from-white to-white/90 shadow-md"
    }`}>
      <nav className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between py-3 sm:py-4 lg:py-6">
          <div className="flex items-center flex-shrink-0">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
              Auto<span className="text-violet-500">Nova</span>
            </h1>
          </div>

          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="flex items-center w-full bg-gray-50/50 border border-gray-300 rounded-full py-3 px-6 hover:border-violet-500 focus-within:border-violet-500 transition-colors shadow-sm">
              <form className="flex items-center w-full">
                <input
                  type="search"
                  name="search"
                  placeholder="Search cars, brands, models..."
                  className="outline-none w-full text-sm bg-transparent text-gray-700 placeholder-gray-400 font-medium"
                />
                <button type="submit" className="ml-3 bg-violet-500 hover:bg-violet-600 text-white rounded-full h-8 w-8 flex items-center justify-center transition-colors">
                  <Search size={16} />
                </button>
              </form>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <div className="hidden lg:flex items-center gap-4 text-sm font-medium">
              <a href="/signin" className="flex items-center gap-2 text-gray-700 hover:text-violet-500 transition-colors">
                <User size={16} />
                Sign In
              </a>
              <button className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white px-4 py-2 rounded-full transition-colors">
                Join Now
              </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <button className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center">
                <Heart size={16} sm:size={18} />
                {favoriteCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-semibold text-[10px] sm:text-xs">
                    {favoriteCount > 99 ? '99+' : favoriteCount}
                  </span>
                )}
                {favoriteCount === 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-300 text-gray-600 text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-semibold text-[10px] sm:text-xs">
                    0
                  </span>
                )}
              </button>

              <button className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-center">
                <ShoppingCart size={16} sm:size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-semibold text-[10px] sm:text-xs">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
                {cartCount === 0 && (
                  <span className="absolute -top-1 -right-1 bg-gray-300 text-gray-600 text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-semibold text-[10px] sm:text-xs">
                    0
                  </span>
                )}
              </button>

              <button 
                className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={18} sm:size={20} /> : <Menu size={18} sm:size={20} />}
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:block border-t border-gray-200/50">
          <ul className="flex items-center gap-8 py-4 text-sm font-medium overflow-x-auto">
            {navigationLinks.map((link, index) => {
              const isActive = selectedCategory === link.category;
              return (
                <li key={index} className="group cursor-pointer flex-shrink-0">
                  <button
                    onClick={() => handleCategoryClick(link.category)}
                    className={`transition-colors duration-200 whitespace-nowrap py-2 px-1 relative ${
                      isActive
                        ? "text-violet-600 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {link.name}
                    <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-purple-600 transform transition-transform duration-200 origin-left ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}></div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-3 sm:px-4 py-4">
            <div className="mb-4">
              <div className="flex items-center bg-gray-50/50 border border-gray-300 rounded-full py-2.5 sm:py-3 px-4">
                <input
                  type="search"
                  placeholder="Search cars..."
                  className="outline-none w-full text-sm bg-transparent text-gray-700 placeholder-gray-400"
                />
                <Search size={18} className="text-gray-500 ml-2" />
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3 mb-4">
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2.5 px-4 rounded-full transition-colors text-sm font-medium">
                <User size={16} />
                Sign In
              </button>
              <button className="flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white py-2.5 px-4 rounded-full transition-colors text-sm font-medium">
                Join Now
              </button>
            </div>
            <ul className="space-y-1">
              {navigationLinks.map((link, index) => {
                const isActive = selectedCategory === link.category;
                return (
                  <li key={index}>
                    <button
                      onClick={() => {
                        handleCategoryClick(link.category);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`block w-full text-left py-3 px-4 rounded-lg transition-colors font-medium text-sm ${
                        isActive
                          ? "bg-violet-50 text-violet-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-violet-500"
                      }`}
                    >
                      {link.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default NavBar;