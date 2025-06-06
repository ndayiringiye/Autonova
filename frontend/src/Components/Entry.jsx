import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, Bell, Star, Calendar, Shield, Award } from 'lucide-react';
import Sidebar from './Sidbar';

export default function CarDealership() {
  const [carsData, setCarsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarsData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const cars = [
        {
          id: 1,
          title: "Luxury Executive Bus",
          brand: "Mercedes-Benz",
          model: "Sprinter Executive",
          price: 89000,
          originalPrice: 95000,
          image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
          likes: 1247,
          comments: 89,
          shares: 156,
          subscribers: 2341,
          features: ["Premium Leather", "Climate Control", "WiFi Ready"],
          isPopular: true,
          discount: 6
        },
        {
          id: 2,
          title: "Toyota Camry Hybrid",
          brand: "Toyota",
          model: "Camry XLE Hybrid",
          price: 34500,
          originalPrice: 37000,
          image: "https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400&h=300&fit=crop",
          likes: 892,
          comments: 67,
          shares: 134,
          subscribers: 1876,
          features: ["Hybrid Engine", "Safety Sense", "Apple CarPlay"],
          isPopular: false,
          discount: 7
        },
        {
          id: 3,
          title: "Subaru Legacy Sport",
          brand: "Subaru",
          model: "Legacy 2.5i Sport",
          price: 28900,
          originalPrice: 31500,
          image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400&h=300&fit=crop",
          likes: 654,
          comments: 43,
          shares: 78,
          subscribers: 1234,
          features: ["AWD Standard", "EyeSight Safety", "Starlink System"],
          isPopular: false,
          discount: 8
        },
        {
          id: 4,
          title: "Volvo XC60 T8",
          brand: "Volvo",
          model: "XC60 T8 Inscription",
          price: 67500,
          originalPrice: 74000,
          image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
          likes: 1456,
          comments: 112,
          shares: 203,
          subscribers: 2987,
          features: ["Plug-in Hybrid", "Pilot Assist", "Bowers & Wilkins"],
          isPopular: true,
          discount: 9
        },
        {
          id: 5,
          title: "Genesis G80 Luxury",
          brand: "Genesis",
          model: "G80 3.5T Sport Prestige",
          price: 73900,
          originalPrice: 79500,
          image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
          likes: 2134,
          comments: 187,
          shares: 298,
          subscribers: 3456,
          features: ["Twin-Turbo V6", "Genesis Connected", "Nappa Leather"],
          isPopular: true,
          discount: 7
        },
        {
          id: 6,
          title: "Hyundai Sonata N Line",
          brand: "Hyundai",
          model: "Sonata N Line",
          price: 35800,
          originalPrice: 38500,
          image: "https://images.unsplash.com/photo-1608032076222-9e1d7a4c8322?w=400&h=300&fit=crop",
          likes: 743,
          comments: 56,
          shares: 89,
          subscribers: 1567,
          features: ["Turbo Performance", "N Line Styling", "Wireless Charging"],
          isPopular: false,
          discount: 7
        }

      ];

      setCarsData(cars);
      setLoading(false);
    };

    fetchCarsData();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading premium vehicles...</div>
      </div>
    );
  }

  return (
    <div className='w-11/12 mx-auto grid grid-cols-2 gap-x-3'>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 mt-20 via-blue-900 to-slate-900">
      <div className="relative bg-gradient-to-r from-black/70 to-black/50 bg-blend-overlay bg-cover bg-center min-h-[70vh] flex items-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop')" }}>
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Award className="text-yellow-400" size={24} />
              <span className="text-yellow-400 font-semibold">Premium Dealership Since 1995</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Unlock the Freedom to
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Experience</span> Travel Your Way
            </h1>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
              Discover your perfect vehicle from our exclusive collection of premium cars. Every journey begins with the right choice - make yours today with confidence, quality, and unmatched service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                Explore Our Collection
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Schedule Test Drive
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Premium Vehicles</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Handpicked selection of the finest vehicles, each inspected for quality and performance.
            Your dream car is waiting - don't let it drive away.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {carsData.map((car) => (
            <div key={car.id} className="bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-500 shadow-2xl border border-white/20">
              {car.isPopular && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-4 py-2 text-sm font-bold text-center">
                  🔥 MOST POPULAR CHOICE
                </div>
              )}

              <div className="relative">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {car.discount}% OFF
                </div>
                <div className="absolute bottom-4 left-4 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{car.title}</h3>
                    <p className="text-gray-300 text-sm">{car.brand} {car.model}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-400 line-through text-sm">{formatPrice(car.originalPrice)}</div>
                    <div className="text-2xl font-bold text-green-400">{formatPrice(car.price)}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {car.features.map((feature, index) => (
                    <span key={index} className="bg-blue-600/30 text-blue-200 px-2 py-1 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mb-4 text-gray-300 text-sm">
                  <div className="flex items-center gap-1">
                    <Heart size={14} className="text-red-400" />
                    <span>{formatNumber(car.likes)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} className="text-blue-400" />
                    <span>{car.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 size={14} className="text-green-400" />
                    <span>{car.shares}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bell size={14} className="text-yellow-400" />
                    <span>{formatNumber(car.subscribers)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                    Buy Now - Save {formatPrice(car.originalPrice - car.price)}!
                  </button>
                  <button className="border border-white/30 text-white hover:bg-white/10 px-4 py-3 rounded-lg transition-all duration-300">
                    Test Drive
                  </button>
                </div>

                <div className="mt-3 text-center">
                  <p className="text-xs text-gray-400">
                    ⚡ Limited time offer • 0% APR available • Trade-ins welcome
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Drive Your Dream Car?</h3>
            <p className="text-gray-300 mb-6 text-lg">
              Don't wait - these exclusive deals won't last forever. Our financing experts are standing by to help you drive away today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
                🔥 Claim Your Deal Now!
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                💬 Chat with Sales Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
    <Sidebar />
    </div>
    </div>
  );
}