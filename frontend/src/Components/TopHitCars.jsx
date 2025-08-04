"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Zap, Crown, Gauge, Users, Mountain, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import luxuries from "../../public/images/luxuries.png"
import electricity from "../../public/images/electricity.png"
import sportsCars from "../../public/images/sports.png"
import family from "../../public/images/family.png"
import cvcars from "../../public/images/cvcars.png"
import dealers from "../../public/images/dealers.png"

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
    <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {cars.map((car, index) => {
                const IconComponent = car.icon
                return (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="flex flex-col md:flex-row gap-8 items-center bg-white p-8 md:p-12 min-h-[500px] rounded-2xl">
                      {/* Text Section */}
                      <div className="space-y-6 flex-1">
                        <div className="flex items-center gap-3">
                          <div className={`p-3 rounded-full bg-gradient-to-r ${car.color} text-white shadow-lg`}>
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <Badge variant="secondary" className="text-sm font-semibold">
                            {car.discount}
                          </Badge>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-slate-800 leading-tight">
                          {car.name}
                        </h3>
                        <p className="text-slate-600 text-lg leading-relaxed">{car.description}</p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <Button
                            size="lg"
                            className={`bg-gradient-to-r ${car.color} hover:opacity-90 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105`}
                          >
                            Shop Now
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-slate-300 hover:border-slate-400 px-8 py-3 rounded-full font-semibold transition-all duration-300 bg-transparent"
                          >
                            Learn More
                          </Button>
                        </div>
                      </div>

                      {/* Image Section */}
                      <div className="flex-1 relative group">
                        <div
                          className={`absolute inset-0 bg-gradient-to-r ${car.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                        ></div>
                        <Image
                          src={car.image}
                          alt={car.name}
                          width={600}
                          height={400}
                          className="relative w-full h-80 md:h-96 object-cover rounded-2xl shadow-xl group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm border-2 border-white/20 shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {cars.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-slate-800 scale-125" : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHitCars
