import { useState, useEffect } from "react"
import { Mountain } from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

const CarCategories = ({ selectedCategory = "All" }) => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      const response = await fetch('/user/cars?limit=50')
      const data = await response.json()
      
      if (data.success) {
        setCars(data.data)
      } else {
        setError('Failed to fetch cars')
      }
    } catch (err) {
      setError('Error connecting to server')
      console.error('Error fetching cars:', err)
    } finally {
      setLoading(false)
    }
  }

  const getFilteredCars = () => {
    const filter = categoryFilters[selectedCategory]
    if (!filter) return cars
    return cars.filter(filter)
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-violet-50 to-violet-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
            <p className="mt-4 text-violet-600 font-medium">Loading cars...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-violet-50 to-violet-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-600 font-medium">{error}</p>
            <Button 
              onClick={fetchCars}
              className="mt-4 bg-violet-600 hover:bg-violet-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const filteredCars = getFilteredCars()

  return (
    <div className="bg-gradient-to-br from-violet-50 to-violet-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 duration-300"
              >
                <div className="relative">
                  <img
                    src={car.imageUrl}
                    alt={car.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src = '/images/car-placeholder.jpg'
                    }}
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-violet-600 text-white">
                      {car.year}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {car.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {car.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-violet-600">
                      ${car.price.toLocaleString()}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{car.views || 0} views</span>
                      <span>•</span>
                      <span>{car.likes?.length || 0} likes</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      className="flex-1 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="border-violet-200 hover:bg-violet-50"
                    >
                      ♡
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Mountain className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No cars found in this category
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}

        {filteredCars.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 px-8 py-3 rounded-full"
            >
              View All Cars
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarCategories