import React, { useState } from 'react';
import { Search, Tag, CreditCard, Sparkles, ArrowRight, CheckCircle, Car, Gift, Shield, Zap } from 'lucide-react';

const BookingProcess = () => {
  const [activeStep, setActiveStep] = useState(0);

  const processes = [
    {
      number: "01",
      icon: <Search className="w-8 h-8" />,
      head: "Find Your Dream Car",
      description: "Browse our curated collection of reliable vehicles. Use filters to find the one that fits your style and budget.",
      features: ["Premium Selection", "Smart Filters", "Expert Reviews"],
    },
    {
      number: "02",
      icon: <Tag className="w-8 h-8" />,
      head: "Book for Discounts",
      description: "Unlock special offers and save when you reserve your car. Members get exclusive pricing benefits.",
      features: ["VIP Discounts", "Member Benefits", "Price Lock"],
    },
    {
      number: "03",
      icon: <CreditCard className="w-8 h-8" />,
      head: "Secure Payment",
      description: "Our payment system is safe and fast. Multiple options including financing and crypto supported.",
      features: ["Encrypted Gateway", "Flexible Options", "Fast Approval"],
    },
    {
      number: "04",
      icon: <Sparkles className="w-8 h-8" />,
      head: "Drive in Style",
      description: "Enjoy home delivery with full warranty, support, and premium ownership perks.",
      features: ["Home Delivery", "Full Warranty", "24/7 Support"],
    },
  ];

  const stats = [
    { icon: <Car className="w-6 h-6" />, value: "10K+", label: "Cars Sold" },
    { icon: <Gift className="w-6 h-6" />, value: "25%", label: "Avg Savings" },
    { icon: <Shield className="w-6 h-6" />, value: "100%", label: "Secure" },
    { icon: <Zap className="w-6 h-6" />, value: "24/7", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-violet-600 rounded-full mb-6 shadow-md">
            <Car className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            How to Book Your Car
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Follow our simple 4-step process to find, reserve, and enjoy your ideal vehicle.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-5 border shadow-sm text-center">
                <div className="mx-auto mb-3 w-12 h-12 bg-violet-600 text-white rounded-lg flex items-center justify-center">
                  {stat.icon}
                </div>
                <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          {processes.map((process, index) => (
            <div
              key={index}
              onClick={() => setActiveStep(index)}
              className={`cursor-pointer bg-white border rounded-2xl p-6 shadow-sm transition-all ${
                activeStep === index ? 'ring-2 ring-violet-500 scale-105' : 'hover:shadow-md'
              }`}
            >
              <div className="flex items-start space-x-6">
                <div className="w-16 h-16 bg-violet-600 text-white rounded-xl flex items-center justify-center text-lg font-bold">
                  {process.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-2">
                    <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-lg flex items-center justify-center">
                      {process.icon}
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">{process.head}</h2>
                  </div>
                  <p className="text-gray-600 mb-4">{process.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {process.features.map((feature, i) => (
                      <span key={i} className="inline-flex items-center text-sm text-white bg-violet-600 px-3 py-1 rounded-full">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition">
                    {index === 0 && "Start Browsing"}
                    {index === 1 && "View Offers"}
                    {index === 2 && "Pay Securely"}
                    {index === 3 && "Schedule Delivery"}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingProcess;
