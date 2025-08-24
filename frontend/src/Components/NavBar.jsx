"use client"

import { Search, Heart, ShoppingCart, Menu, X, User, Plus, Minus } from "lucide-react"
import { useEffect, useState } from "react"

function NavBar({
  favoriteCount = 0,
  cartCount = 0,
  selectedCategory = "All",
  onCategoryChange,
  cart = [],
  updateCartQuantity,
  removeFromCart,
}) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationLinks = [
    { name: "Home", category: null },
    { name: "Shop", category: "All" },
    { name: "Luxury Rides", category: "Luxury Rides" },
    { name: "Electric Cars", category: "Electric Cars" },
    { name: "Sports Cars", category: "Sports Cars" },
    { name: "SUVs & Crossovers", category: "SUVs & Crossovers" },
    { name: "Family Cars", category: "Family Cars" },
    { name: "Deals", category: "Deals" },
  ]

  const handleCategoryClick = (category) => {
    if (onCategoryChange && category) {
      onCategoryChange(category)
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
            : "bg-gradient-to-b from-white to-white/90 shadow-md"
        }`}
      >
        <nav className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between py-3 sm:py-4 lg:py-6">
            <div className="flex items-center flex-shrink-0">
              <svg width="240" height="45" viewBox="0 0 240 45" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="modernGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="1" />
                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#1E293B" stopOpacity="1" />
                    <stop offset="100%" stopColor="#475569" stopOpacity="1" />
                  </linearGradient>
                  <linearGradient id="novaAccent" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C3AED" stopOpacity="1" />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity="1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <g transform="translate(8, 6)">
                  <path
                    d="M16 4 L26 4 Q30 4 32 8 L36 16 Q36 20 32 24 L26 32 Q22 32 16 32 L10 32 Q6 32 4 28 L0 20 Q0 16 4 12 L10 4 Q14 4 16 4 Z"
                    fill="url(#modernGradient)"
                    filter="url(#glow)"
                    opacity="0.9"
                  />

                  <path
                    d="M18 10 L24 10 L27 16 L24 22 L18 22 L15 16 Z"
                    fill="rgba(255,255,255,0.25)"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="1"
                  />

                  <path
                    d="M18 12 L15.5 20 L17.5 20 L18 18.5 L22 18.5 L22.5 20 L24.5 20 L22 12 L18 12 Z M19 16.5 L21 16.5 L20 14.5 Z"
                    fill="white"
                    fontWeight="bold"
                  />

                  <g opacity="0.7">
                    <path d="M38 12 L44 12" stroke="url(#modernGradient)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M38 16 L42 16" stroke="url(#modernGradient)" strokeWidth="2" strokeLinecap="round" />
                    <path d="M38 20 L40 20" stroke="url(#modernGradient)" strokeWidth="2" strokeLinecap="round" />
                  </g>
                </g>

                <g transform="translate(58, 28)">
                  <text
                    x="0"
                    y="0"
                    fontFamily="'SF Pro Display', 'Inter', system-ui, sans-serif"
                    fontSize="20"
                    fontWeight="900"
                    fill="url(#textGradient)"
                    letterSpacing="-1px"
                  >
                    AUTO
                  </text>

                  <text
                    x="52"
                    y="0"
                    fontFamily="'SF Pro Display', 'Inter', system-ui, sans-serif"
                    fontSize="20"
                    fontWeight="900"
                    fill="url(#novaAccent)"
                    letterSpacing="-1px"
                  >
                    NOVA
                  </text>
                </g>

                <rect x="58" y="32" width="60" height="1" fill="#8B5CF6" opacity="0.4" rx="0.5" />

                <text
                  x="58"
                  y="40"
                  fontFamily="'SF Pro Display', 'Inter', system-ui, sans-serif"
                  fontSize="9"
                  fontWeight="500"
                  fill="#111827"
                  letterSpacing="0.8px"
                >
                  Premium Auto Marketplace
                </text>
              </svg>
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
                  <button
                    type="submit"
                    className="ml-3 bg-violet-500 hover:bg-violet-600 text-white rounded-full h-8 w-8 flex items-center justify-center transition-colors"
                  >
                    <Search size={16} />
                  </button>
                </form>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
              <div className="hidden lg:flex items-center gap-4 text-sm font-medium">
                <a
                  href="/signin"
                  className="flex items-center gap-2 text-gray-700 hover:text-violet-500 transition-colors"
                >
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
                      {favoriteCount > 99 ? "99+" : favoriteCount}
                    </span>
                  )}
                  {favoriteCount === 0 && (
                    <span className="absolute -top-1 -right-1 bg-gray-300 text-gray-600 text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-semibold text-[10px] sm:text-xs">
                      0
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative h-9 w-9 sm:h-10 sm:w-10 rounded-full hover:bg-green-50 hover:text-green-600 transition-colors flex items-center justify-center"
                >
                  <ShoppingCart size={16} sm:size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-semibold text-[10px] sm:text-xs">
                      {cartCount > 99 ? "99+" : cartCount}
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
                const isActive = selectedCategory === link.category
                return (
                  <li key={index} className="group cursor-pointer flex-shrink-0">
                    <button
                      onClick={() => handleCategoryClick(link.category)}
                      className={`transition-colors duration-200 whitespace-nowrap py-2 px-1 relative ${
                        isActive ? "text-violet-600 font-semibold" : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {link.name}
                      <div
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-purple-600 transform transition-transform duration-200 origin-left ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      ></div>
                    </button>
                  </li>
                )
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
                  const isActive = selectedCategory === link.category
                  return (
                    <li key={index}>
                      <button
                        onClick={() => {
                          handleCategoryClick(link.category)
                          setIsMobileMenuOpen(false)
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
                  )
                })}
              </ul>
            </div>
          </div>
        )}
      </header>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)}></div>
          <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600">Add some cars to get started!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex items-center space-x-4 mb-4 p-4 bg-gray-50 rounded-xl">
                    <img
                      src={
                        item.imageUrl || `/placeholder.svg?height=60&width=80&text=${encodeURIComponent(item.title)}`
                      }
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
                    <button onClick={() => removeFromCart(item._id)} className="text-red-500 hover:text-red-700 p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-800">Total:</span>
                  <span className="text-2xl font-bold text-violet-600">{formatPrice(getCartTotal())}</span>
                </div>
                <button className="w-full bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800 text-white py-3 rounded-xl font-semibold transition-colors">
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default NavBar
