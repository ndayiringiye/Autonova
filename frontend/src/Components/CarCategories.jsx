import { useState, useEffect } from 'react';
import { 
  Search, Heart, MessageCircle, Share2, Bell, ShoppingCart, 
  Eye, Calendar, User, Plus, Filter, SortAsc, MapPin
} from 'lucide-react';

const CarCategories = ({ selectedCategory = "All" }) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [user, setUser] = useState({ id: '1', role: 'buyer' });
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [subscriptions, setSubscriptions] = useState(new Set());

  const categoryFilters = {
    "All": () => true,
    "Luxury Rides": (car) => car.price >= 100000 || car.title.toLowerCase().includes('luxury') ||
                            car.title.toLowerCase().includes('mercedes') || car.title.toLowerCase().includes('bmw') ||
                            car.title.toLowerCase().includes('audi') || car.title.toLowerCase().includes('lexus'),
    "Electric Cars": (car) => car.title.toLowerCase().includes('tesla') || car.title.toLowerCase().includes('electric') ||
                             car.title.toLowerCase().includes('ev') || car.title.toLowerCase().includes('hybrid') ||
                             car.title.toLowerCase().includes('taycan') || car.title.toLowerCase().includes('i3') ||
                             car.title.toLowerCase().includes('leaf'),
    "Sports Cars": (car) => car.title.toLowerCase().includes('sport') || car.title.toLowerCase().includes('r8') ||
                           car.title.toLowerCase().includes('911') || car.title.toLowerCase().includes('corvette') ||
                           car.title.toLowerCase().includes('ferrari') || car.title.toLowerCase().includes('lamborghini') ||
                           car.title.toLowerCase().includes('porsche'),
    "Family Cars": (car) => car.title.toLowerCase().includes('family') || car.title.toLowerCase().includes('sedan') ||
                           car.title.toLowerCase().includes('accord') || car.title.toLowerCase().includes('camry') ||
                           car.title.toLowerCase().includes('civic') || car.title.toLowerCase().includes('corolla') ||
                           car.price < 50000,
    "SUVs & Crossovers": (car) => car.title.toLowerCase().includes('suv') || car.title.toLowerCase().includes('crossover') ||
                                 car.title.toLowerCase().includes('range rover') || car.title.toLowerCase().includes('x5') ||
                                 car.title.toLowerCase().includes('q7') || car.title.toLowerCase().includes('escalade') ||
                                 car.title.toLowerCase().includes('tahoe') || car.title.toLowerCase().includes('suburban'),
    "Deals": (car) => car.price < 30000 || car.year < 2020
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3000/user/cars?limit=50');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const carsData = data.data || data.cars || data || [];
      
      setCars(carsData);
      
      carsData.forEach(car => {
        fetchCarLikes(car._id);
        fetchCarComments(car._id);
      });
      
    } catch (error) {
      console.error('Error fetching cars:', error);
      setError(error.message);
      
      const mockCars = [
        {
          _id: '1',
          title: '2020 Toyota Camry',
          description: 'Excellent condition, low mileage, single owner',
          price: 25000,
          year: 2020,
          imageUrl: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&h=400&fit=crop',
          seller: { username: 'admin', email: 'admin@example.com' },
          isAvailable: true,
          views: 124,
          likes: [],
          createdAt: new Date().toISOString()
        },
        {
          _id: '2',
          title: 'BMW X5 2023',
          description: 'Luxury SUV with premium features',
          price: 65000,
          year: 2023,
          imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop',
          seller: { username: 'dealer1', email: 'dealer@example.com' },
          isAvailable: true,
          views: 89,
          likes: [],
          createdAt: new Date().toISOString()
        },
        {
          _id: '3',
          title: '2022 Tesla Model 3',
          description: 'Electric sedan with autopilot, excellent range',
          price: 45000,
          year: 2022,
          imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop',
          seller: { username: 'ev_dealer', email: 'ev@example.com' },
          isAvailable: true,
          views: 156,
          likes: [],
          createdAt: new Date().toISOString()
        },
        {
          _id: '4',
          title: '2021 Porsche 911',
          description: 'Sports car in pristine condition, low miles',
          price: 120000,
          year: 2021,
          imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop',
          seller: { username: 'luxury_auto', email: 'luxury@example.com' },
          isAvailable: true,
          views: 98,
          likes: [],
          createdAt: new Date().toISOString()
        }
      ];
      setCars(mockCars);
    } finally {
      setLoading(false);
    }
  };

  const fetchCarLikes = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/likes/${carId}`);
      if (response.ok) {
        const data = await response.json();
        setLikes(prev => ({ ...prev, [carId]: data.likes || [] }));
      }
    } catch (error) {
      console.error('Error fetching likes:', error);
    }
  };

  const fetchCarComments = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/comments/${carId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(prev => ({ ...prev, [carId]: data.comments || [] }));
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async (carId) => {
    try {
      const isLiked = likes[carId]?.some(like => like.userId === user.id);
      
      if (isLiked) {
        await fetch(`http://localhost:3000/user/unlike/${carId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await fetch('http://localhost:3000/user/like', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({ carId })
        });
      }
      
      fetchCarLikes(carId);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handlePurchase = async (carId) => {
    try {
      const response = await fetch('http://localhost:3000/user/payment/purchase-car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ carId })
      });
      
      const data = await response.json();
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (error) {
      console.error('Error initiating purchase:', error);
    }
  };

  const getFilteredCars = () => {
    const filter = categoryFilters[selectedCategory];
    if (!filter) return cars;
    return cars.filter(filter);
  };

  const filteredCars = getFilteredCars().filter(car =>
    car.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    car.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100">
        <div className="flex items-center justify-center pt-32">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-violet-600 font-medium">Loading vehicles...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car._id} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                
              
                <div className="relative overflow-hidden">
                  <img
                    src={car.imageUrl || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop'}
                    alt={car.title}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {!car.isAvailable && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sold
                      </span>
                    </div>
                  )}
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {car.year}
                    </span>
                  </div>
                  
                  {/* Like Button */}
                  <button
                    onClick={() => handleLike(car._id)}
                    className={`absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      likes[car._id]?.some(like => like.userId === user.id)
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                    }`}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">
                        {car.title}
                      </h3>
                      <p className="text-violet-600 text-sm">{car.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-violet-600">{formatPrice(car.price)}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                    {car.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">{car.views}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{likes[car._id]?.length || 0}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{comments[car._id]?.length || 0}</span>
                    </div>
                  </div>

                  {/* Seller Info */}
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-violet-600" />
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                      {car.seller?.username || 'Private Seller'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="flex-1 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white py-3 px-4 rounded-xl font-medium transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handlePurchase(car._id)}
                      className="flex-1 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No vehicles found</h3>
            <p className="text-gray-600">
              {searchTerm || selectedCategory !== "All" 
                ? 'Try adjusting your search terms or selecting a different category' 
                : 'Check back later for new listings'}
            </p>
          </div>
        )}
      </div>
      {selectedCar && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={() => setSelectedCar(null)}></div>
            
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="sticky top-0 bg-white border-b border-violet-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">{selectedCar.title}</h2>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="w-8 h-8 rounded-full bg-violet-100 hover:bg-violet-200 flex items-center justify-center transition-colors"
                >
                  <Plus className="w-4 h-4 rotate-45 text-violet-600" />
                </button>
              </div>
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                <div className="grid lg:grid-cols-2 gap-8 p-6">
                  <div className="space-y-6">
                    <img
                      src={selectedCar.imageUrl || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop'}
                      alt={selectedCar.title}
                      className="w-full h-80 object-cover rounded-xl"
                    />
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleLike(selectedCar._id)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                          likes[selectedCar._id]?.some(like => like.userId === user.id)
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : 'bg-violet-50 text-violet-600 border border-violet-200 hover:bg-violet-100'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                        <span>{likes[selectedCar._id]?.length || 0} Likes</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 px-4 py-3 rounded-xl font-medium bg-violet-50 text-violet-600 border border-violet-200 hover:bg-violet-100 transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      
                      <button className="flex items-center space-x-2 px-4 py-3 rounded-xl font-medium bg-violet-50 text-violet-600 border border-violet-200 hover:bg-violet-100 transition-colors">
                        <Bell className="w-4 h-4" />
                        <span>Watch</span>
                      </button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-violet-50 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-3xl font-bold text-violet-600">{formatPrice(selectedCar.price)}</p>
                          <p className="text-gray-600 mt-1">{selectedCar.year} Model</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Listed by</p>
                          <p className="font-semibold text-gray-800">{selectedCar.seller?.username}</p>
                        </div>
                      </div>
                      
                      {selectedCar.isAvailable && (
                        <button
                          onClick={() => handlePurchase(selectedCar._id)}
                          className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white py-4 rounded-xl font-semibold transition-colors"
                        >
                          Purchase Vehicle
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Description</h3>
                      <p className="text-gray-600 leading-relaxed">{selectedCar.description}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-violet-50 rounded-xl">
                        <Eye className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                        <p className="font-semibold text-gray-800">{selectedCar.views}</p>
                        <p className="text-xs text-gray-500">Views</p>
                      </div>
                      <div className="text-center p-4 bg-violet-50 rounded-xl">
                        <Heart className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                        <p className="font-semibold text-gray-800">{likes[selectedCar._id]?.length || 0}</p>
                        <p className="text-xs text-gray-500">Likes</p>
                      </div>
                      <div className="text-center p-4 bg-violet-50 rounded-xl">
                        <Calendar className="w-5 h-5 text-violet-400 mx-auto mb-2" />
                        <p className="font-semibold text-gray-800">{selectedCar.year}</p>
                        <p className="text-xs text-gray-500">Year</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarCategories;