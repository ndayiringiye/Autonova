import { useState, useEffect } from 'react';
import { Car, Filter, Search, Grid, List } from 'lucide-react';

const Welcome = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:3000/user/cars?limit=50');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
      }

      const text = await response.text();

      if (!text) {
        throw new Error('Empty response body received from server');
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Raw response:', text);
        throw new Error(`Failed to parse JSON: ${parseError.message}`);
      }

      setCars(data.cars || data || []);

    } catch (error) {
      console.error('Error fetching cars:', error);
      setError(error.message);
      const mockCars = [
        {
          id: 1,
          make: 'Toyota',
          model: 'Camry',
          year: 2023,
          price: 28000,
          category: 'Sedan',
          image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=300&fit=crop'
        },
        {
          id: 2,
          make: 'Honda',
          model: 'CR-V',
          year: 2023,
          price: 32000,
          category: 'SUV',
          image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
        },
        {
          id: 3,
          make: 'BMW',
          model: '3 Series',
          year: 2023,
          price: 42000,
          category: 'Luxury',
          image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
        }
      ];
      setCars(mockCars);

    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading cars...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Categories</h1>
          <p className="text-gray-600">Browse our collection of vehicles</p>
          
          {error && (
            <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-yellow-800">
                    <strong>API Connection Issue:</strong> {error}
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    Currently showing sample data. Please check your backend server.
                  </p>
                  <button
                    onClick={fetchCars}
                    className="mt-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50">
              <Search size={16} />
              <span>Search</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={car.image || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop'}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop';
                }}
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {car.make} {car.model}
                  </h3>
                  <span className="text-sm text-gray-500">{car.year}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{car.category}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {formatPrice(car.price)}
                  </span>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {cars.length === 0 && !loading && (
          <div className="text-center py-12">
            <Car size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No cars found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
