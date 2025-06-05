import React from 'react';
import { Clock, Leaf, Shield, Star, Award, Headphones } from 'lucide-react';

const Sidebar = () => {
  const services = [
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Available 24/7",
      description: "Browse our premium vehicle collection anytime with exclusive 15% discounts and flexible long-term financing options tailored to your budget.",
      highlight: "15% OFF",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Eco-Friendly Fleet",
      description: "Our certified auto experts ensure every hybrid and electric vehicle meets the highest environmental standards with emergency technical support included.",
      highlight: "Green Certified",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Payments",
      description: "Experience worry-free transactions with our encrypted payment system, comprehensive insurance coverage, and transparent pricing - your peace of mind is guaranteed.",
      highlight: "100% Secure",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const additionalFeatures = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "5-Star Service",
      description: "Award-winning customer satisfaction"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certified Dealers",
      description: "Licensed professionals you can trust"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Always here when you need us"
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-8 rounded-2xl shadow-2xl border border-white/10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
          <Star className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Our Prime Services
        </h2>
        <p className="text-gray-300 text-sm">
          Premium automotive solutions designed for your success
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
      </div>
      <div className="space-y-6 mb-8">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {service.icon}
                </div>
              </div>
              <span className={`bg-gradient-to-r ${service.color} text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg`}>
                {service.highlight}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm group-hover:text-gray-200 transition-colors duration-300">
                {service.description}
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-white/10">
              <button className="text-blue-400 hover:text-blue-300 text-sm font-semibold flex items-center gap-2 group/btn">
                Learn More 
                <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">→</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 pt-8">
        <h3 className="text-lg font-bold text-white mb-4 text-center">Why Choose Us?</h3>
        <div className="grid grid-cols-1 gap-4">
          {additionalFeatures.map((feature, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                <p className="text-gray-400 text-xs">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30">
        <div className="text-center">
          <h4 className="text-white font-bold mb-2">Ready to Get Started?</h4>
          <p className="text-gray-300 text-sm mb-4">
            Experience the difference with our premium automotive services
          </p>
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Contact Us Today
          </button>
        </div>
      </div>
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full border border-yellow-500/30">
          <Star className="w-4 h-4 fill-current" />
          <span className="text-sm font-semibold">99% Customer Satisfaction</span>
          <Star className="w-4 h-4 fill-current" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;