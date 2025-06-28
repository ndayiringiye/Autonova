import { useState, useEffect } from 'react';
import { Car, LogOut, ChevronDown, Search, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';


const Navbar = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-600 to-blue-600 rounded-full flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-white">AutoNova</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">Home</Link>
            
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                Vehicles <ChevronDown className={`ml-1 w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-xl py-2 z-50 border border-gray-700">
                  <Link to="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">New Arrivals</Link>
                  <Link to="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Luxury Collection</Link>
                  <Link to="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Electric Vehicles</Link>
                  <Link to="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">Sell Your Car</Link>
                </div>
              )}
            </div>
            
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">Dealers</Link>
            <Link to="#" className="text-gray-400 hover:text-white transition-colors">About</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search makes, models..."
                className="pl-10 pr-4 py-2 bg-gray-900/50 border border-violet-700 rounded-full text-sm  text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
            </div>

            {user ? (
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-300 hover:text-white">
                  <User className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => { /* handle logout */ }}
                  className="flex items-center space-x-1 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-sm text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/signin" 
                  className="px-4 py-2 text-sm text-gray-200 hover:text-gray-400 transition-colors"
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 rounded-full text-sm text-white font-medium transition-all shadow-lg hover:shadow-blue-500/20"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-4 py-3 space-y-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search vehicles..."
                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-full text-sm text-white focus:outline-none w-full"
              />
            </div>

            <Link to="/" className="block px-3 py-2 text-gray-300 hover:text-white rounded-lg">Home</Link>
            
            <div>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-gray-300 hover:text-white rounded-lg"
              >
                <span>Vehicles</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="ml-4 mt-2 space-y-2">
                  <Link to="#" className="block px-3 py-2 text-gray-400 hover:text-white rounded-lg">New Arrivals</Link>
                  <Link to="#" className="block px-3 py-2 text-gray-400 hover:text-white rounded-lg">Luxury Collection</Link>
                  <Link to="#" className="block px-3 py-2 text-gray-400 hover:text-white rounded-lg">Electric Vehicles</Link>
                  <Link to="#" className="block px-3 py-2 text-gray-400 hover:text-white rounded-lg">Sell Your Car</Link>
                </div>
              )}
            </div>
            
            <Link to="#" className="block px-3 py-2 text-gray-300 hover:text-white rounded-lg">Dealers</Link>
            <Link to="#" className="block px-3 py-2 text-gray-300 hover:text-white rounded-lg">About</Link>

            <div className="pt-4 border-t border-gray-800 space-y-3">
              {user ? (
                <>
                  <Link to="#" className="block px-3 py-2 text-center bg-gray-800 hover:bg-gray-700 rounded-full text-white">My Profile</Link>
                  <button 
                    onClick={() => { /* handle logout */ }}
                    className="w-full px-3 py-2 text-center bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-full border border-red-400/30"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin" 
                    className="block px-3 py-2 text-center bg-gray-800 hover:bg-gray-700 rounded-full text-white"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block px-3 py-2 text-center bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 rounded-full text-white font-medium"
                  >
                    Register Now
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;