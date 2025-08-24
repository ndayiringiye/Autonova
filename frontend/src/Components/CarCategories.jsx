"use client"

import { useState, useEffect } from "react"
import { Search, Heart, Share2, Bell, ShoppingCart, Eye, Calendar, User, Plus, Minus } from "lucide-react"

const CarCategories = ({ selectedCategory = "All", cart = [], addToCart, removeFromCart, updateCartQuantity }) => {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCar, setSelectedCar] = useState(null)
  const [user, setUser] = useState({ id: "1", role: "buyer" })
  const [comments, setComments] = useState({})
  const [likes, setLikes] = useState({})
  const [subscriptions, setSubscriptions] = useState(new Set())
  const [cartVisible, setCartVisible] = useState(false)

  const categoryFilters = {
    All: () => true,
    "Luxury Rides": (car) =>
      car.price >= 100000 ||
      car.title.toLowerCase().includes("luxury") ||
      car.title.toLowerCase().includes("mercedes") ||
      car.title.toLowerCase().includes("bmw") ||
      car.title.toLowerCase().includes("audi") ||
      car.title.toLowerCase().includes("lexus"),
    "Electric Cars": (car) =>
      car.title.toLowerCase().includes("tesla") ||
      car.title.toLowerCase().includes("electric") ||
      car.title.toLowerCase().includes("ev") ||
      car.title.toLowerCase().includes("hybrid") ||
      car.title.toLowerCase().includes("taycan") ||
      car.title.toLowerCase().includes("i3") ||
      car.title.toLowerCase().includes("leaf"),
    "Sports Cars": (car) =>
      car.title.toLowerCase().includes("sport") ||
      car.title.toLowerCase().includes("r8") ||
      car.title.toLowerCase().includes("911") ||
      car.title.toLowerCase().includes("corvette") ||
      car.title.toLowerCase().includes("ferrari") ||
      car.title.toLowerCase().includes("lamborghini") ||
      car.title.toLowerCase().includes("porsche"),
    "Family Cars": (car) =>
      car.title.toLowerCase().includes("family") ||
      car.title.toLowerCase().includes("sedan") ||
      car.title.toLowerCase().includes("accord") ||
      car.title.toLowerCase().includes("camry") ||
      car.title.toLowerCase().includes("civic") ||
      car.title.toLowerCase().includes("corolla") ||
      car.price < 50000,
    "SUVs & Crossovers": (car) =>
      car.title.toLowerCase().includes("suv") ||
      car.title.toLowerCase().includes("crossover") ||
      car.title.toLowerCase().includes("range rover") ||
      car.title.toLowerCase().includes("x5") ||
      car.title.toLowerCase().includes("q7") ||
      car.title.toLowerCase().includes("escalade") ||
      car.title.toLowerCase().includes("tahoe") ||
      car.title.toLowerCase().includes("suburban"),
    Deals: (car) => car.price < 30000 || car.year < 2020,
  }

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      setLoading(true)
      setError(null)

      const mockCars = [
        {
          _id: "1",
          title: "2020 Toyota Camry",
          description: "Excellent condition, low mileage, single owner",
          price: 25000,
          year: 2020,
          imageUrl: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=600&h=400&fit=crop",
          seller: { username: "admin", email: "admin@example.com" },
          isAvailable: true,
          views: 124,
          likes: [],
          createdAt: new Date().toISOString(),
        },
        {
          _id: "2",
          title: "BMW X5 2023",
          description: "Luxury SUV with premium features",
          price: 65000,
          year: 2023,
          imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
          seller: { username: "dealer1", email: "dealer@example.com" },
          isAvailable: true,
          views: 89,
          likes: [],
          createdAt: new Date().toISOString(),
        },
        {
          _id: "3",
          title: "2022 Tesla Model 3",
          description: "Electric sedan with autopilot, excellent range",
          price: 45000,
          year: 2022,
          imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&h=400&fit=crop",
          seller: { username: "ev_dealer", email: "ev@example.com" },
          isAvailable: true,
          views: 156,
          likes: [],
          createdAt: new Date().toISOString(),
        },
        {
          _id: "4",
          title: "2021 Porsche 911",
          description: "Sports car in pristine condition, low miles",
          price: 120000,
          year: 2021,
          imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&h=400&fit=crop",
          seller: { username: "luxury_auto", email: "luxury@example.com" },
          isAvailable: true,
          views: 98,
          likes: [],
          createdAt: new Date().toISOString(),
        },
      ]

      setCars(mockCars)

      mockCars.forEach((car) => {
        fetchCarLikes(car._id)
        fetchCarComments(car._id)
      })
    } catch (error) {
      console.error("Error loading cars:", error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchCarLikes = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/likes/${carId}`)
      if (response.ok) {
        const data = await response.json()
        setLikes((prev) => ({ ...prev, [carId]: data.likes || [] }))
      }
    } catch (error) {
      console.error("Error fetching likes:", error)
    }
  }

  const fetchCarComments = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3000/user/comments/${carId}`)
      if (response.ok) {
        const data = await response.json()
        setComments((prev) => ({ ...prev, [carId]: data.comments || [] }))
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const handleLike = async (carId) => {
    try {
      const isLiked = likes[carId]?.some((like) => like.userId === user.id)

      if (isLiked) {
        await fetch(`http://localhost:3000/user/unlike/${carId}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
      } else {
        await fetch("http://localhost:3000/user/like", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ carId }),
        })
      }

      fetchCarLikes(carId)
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const handlePurchase = async (carId) => {
    try {
      const car = cars.find((c) => c._id === carId)
      alert(`Purchase initiated for ${car?.title}! In a real app, this would redirect to payment processing.`)
      setCars((prevCars) => prevCars.map((c) => (c._id === carId ? { ...c, isAvailable: false } : c)))
    } catch (error) {
      console.error("Error initiating purchase:", error)
      alert("Unable to process purchase at this time. Please try again later.")
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const isInCart = (carId) => {
    return cart.some((item) => item._id === carId)
  }

  const getFilteredCars = () => {
    const filter = categoryFilters[selectedCategory]
    if (!filter) return cars
    return cars.filter(filter)
  }

  const filteredCars = getFilteredCars().filter(
    (car) =>
      car.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

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
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-100">
      {cart.length > 0 && (
        <div className="fixed top-4 right-4 z-40">
          <button
            onClick={() => setCartVisible(!cartVisible)}
            className="bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="bg-white text-violet-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              {getCartItemCount()}
            </span>
          </button>
        </div>
      )}

      {cartVisible && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setCartVisible(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                <button
                  onClick={() => setCartVisible(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <Plus className="w-4 h-4 rotate-45 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {cart.map((item) => (
                <div key={item._id} className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={item.imageUrl || `/placeholder.svg?height=60&width=80&text=${encodeURIComponent(item.title)}`}
                    alt={item.title}
                    className="w-16 h-12 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm text-gray-800 truncate">{item.title}</h3>
                    <p className="text-violet-600 font-bold text-sm">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                      className="w-6 h-6 rounded-full bg-violet-100 hover:bg-violet-200 flex items-center justify-center"
                    >
                      <Minus className="w-3 h-3 text-violet-600" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                      className="w-6 h-6 rounded-full bg-violet-100 hover:bg-violet-200 flex items-center justify-center"
                    >
                      <Plus className="w-3 h-3 text-violet-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-violet-600">{formatPrice(getCartTotal())}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white py-3 rounded-xl font-semibold transition-colors">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCars.map((car) => (
            <div key={car._id} className="group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={
                      car.imageUrl ||
                      `/placeholder.svg?height=160&width=400&text=${encodeURIComponent(car.title) || "/placeholder.svg"}`
                    }
                    alt={car.title}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `/placeholder.svg?height=160&width=400&text=${encodeURIComponent(car.title)}`
                    }}
                  />
                  {!car.isAvailable && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">Sold</span>
                    </div>
                  )}

                  <div className="absolute top-2 right-2">
                    <span className="bg-violet-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {car.year}
                    </span>
                  </div>

                  <button
                    onClick={() => handleLike(car._id)}
                    className={`absolute bottom-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                      likes[car._id]?.some((like) => like.userId === user.id)
                        ? "bg-red-500 text-white"
                        : "bg-white/90 text-gray-600 hover:bg-white hover:text-red-500"
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-800 text-sm leading-tight mb-1 truncate">{car.title}</h3>
                    </div>
                    <div className="text-right ml-2">
                      <p className="text-lg font-bold text-violet-600">{formatPrice(car.price)}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">{car.description}</p>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Eye className="w-3 h-3" />
                        <span className="text-xs">{car.views}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-500">
                        <Heart className="w-3 h-3" />
                        <span className="text-xs">{likes[car._id]?.length || 0}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <User className="w-3 h-3" />
                      <span className="text-xs truncate max-w-16">{car.seller?.username || "Private"}</span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedCar(car)}
                      className="flex-1 bg-violet-100 hover:bg-violet-200 text-violet-700 py-2 px-3 rounded-lg text-xs font-medium transition-colors"
                    >
                      Details
                    </button>
                    {isInCart(car._id) ? (
                      <button
                        onClick={() => removeFromCart(car._id)}
                        className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-red-500 hover:to-red-600 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center space-x-1"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Remove</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(car)}
                        className="flex-1 bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white py-2 px-3 rounded-lg text-xs font-medium transition-all duration-300 flex items-center justify-center space-x-1 hover:shadow-lg transform hover:scale-105"
                      >
                        <ShoppingCart className="w-3 h-3" />
                        <span>Add Cart</span>
                      </button>
                    )}
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
                ? "Try adjusting your search terms or selecting a different category"
                : "Check back later for new listings"}
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
                      src={
                        selectedCar.imageUrl ||
                        `/placeholder.svg?height=320&width=600&text=${encodeURIComponent(selectedCar.title) || "/placeholder.svg"}`
                      }
                      alt={selectedCar.title}
                      className="w-full h-80 object-cover rounded-xl"
                      onError={(e) => {
                        e.target.src = `/placeholder.svg?height=320&width=600&text=${encodeURIComponent(selectedCar.title)}`
                      }}
                    />

                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleLike(selectedCar._id)}
                        className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                          likes[selectedCar._id]?.some((like) => like.userId === user.id)
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : "bg-violet-50 text-violet-600 border border-violet-200 hover:bg-violet-100"
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
  )
}

export default CarCategories
