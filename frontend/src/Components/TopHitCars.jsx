import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Crown,
  Gauge,
  Users,
  Mountain,
  Star,
} from "lucide-react"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"

const luxuries = "/images/luxuries.jpg"
const electricity = "/images/electricity.jpg"
const sportsCars = "/images/sports.jpg"
const family = "/images/family.jpg"
const cvcars = "/images/cvcars.jpg"
const dealers = "/images/dealers.jpg"

const TopHitCars = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const cars = [
    {
      name: "Luxury Rides",
      description:
        "Experience the pinnacle of automotive excellence. These premium vehicles combine sophisticated design with cutting-edge technology, delivering an unparalleled driving experience that speaks to your refined taste.",
      image: luxuries,
      discount: "Up to 15%",
      icon: Crown,
      color: "from-amber-500 to-yellow-600",
    },
    {
      name: "Electric Cars",
      description:
        "Drive into the future with our eco-friendly electric vehicles. Silent power, zero emissions, and innovative technology that saves you money while protecting the planet.",
      image: electricity,
      discount: "12% Off",
      icon: Zap,
      color: "from-green-500 to-emerald-600",
    },
    {
      name: "Sports Cars",
      description:
        "Unleash your passion for speed and performance. These high-performance machines are engineered for thrill-seekers who demand the best in acceleration, handling, and pure excitement.",
      image: sportsCars,
      discount: "8% Off",
      icon: Gauge,
      color: "from-red-500 to-rose-600",
    },
    {
      name: "Family Cars",
      description:
        "Safety, comfort, and reliability for your most precious cargo. These family-friendly vehicles offer spacious interiors, advanced safety features, and peace of mind every parent deserves.",
      image: family,
      discount: "10% Off",
      icon: Users,
      color: "from-blue-500 to-indigo-600",
    },
    {
      name: "SUVs & Crossovers",
      description:
        "Conquer any terrain with confidence. These versatile vehicles combine sedan comfort with off-road capability, perfect for adventure seekers and urban explorers alike.",
      image: cvcars,
      discount: "7% Off",
      icon: Mountain,
      color: "from-purple-500 to-violet-600",
    },
    {
      name: "Certified Pre-Owned",
      description:
        "Premium quality at unbeatable prices. Our certified pre-owned vehicles undergo rigorous inspections and come with warranties, giving you luxury and reliability at less cost.",
      image: dealers,
      discount: "Up to 25%",
      icon: Star,
      color: "from-teal-500 to-cyan-600",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length)
  }

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(nextSlide, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying])

  return (
    <div className="relative bg-gradient-to-br from-violet-50 to-violet-100 w-full  py-12 overflow-hidden">
      <div className="">
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cars.map((car, index) => {
                const IconComponent = car.icon
                return (
                  <div key={index} className="w-full flex-shrink-0 relative">
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-gradient-to-br from-violet-500 to-violet-600 p-8 md:p-12 min-h-[500px]">
                      <div className="space-y-6 flex-1">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-3 rounded-full bg-gradient-to-r ${car.color} text-white shadow-lg`}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <Badge
                            variant="secondary"
                            className="text-sm font-semibold"
                          >
                            {car.discount}
                          </Badge>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                          {car.name}
                        </h3>
                        <p className="text-violet-100 text-lg leading-relaxed">
                          {car.description}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Button
                            size="lg"
                            className="bg-gradient-to-r from-violet-700 to-violet-800 hover:from-violet-800 hover:to-violet-900 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                          >
                            Shop Now
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-violet-200 hover:border-violet-300 hover:bg-violet-200/20 px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-transparent text-white"
                          >
                            Learn More
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1 relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-violet-500 blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                        <img
                          src={car.image}
                          alt={car.name}
                          className="relative w-full h-80 md:h-96 object-cover  shadow-sm rounded-md group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
                      {cars.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                              ? "bg-white scale-125"
                              : "bg-white/50 hover:bg-white/70"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-violet-500/90 backdrop-blur-sm border-2 border-violet-300/20 shadow-lg hover:bg-violet-600 hover:scale-110 transition-all duration-300 z-10 text-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-violet-500/90 backdrop-blur-sm border-2 border-violet-300/20 shadow-lg hover:bg-violet-600 hover:scale-110 transition-all duration-300 z-10 text-white"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TopHitCars
