import React from 'react';
import { FaArrowRight, FaLeaf, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router';

const ServicesSection = () => {
  const services = [
    {
      icon: <FaShieldAlt className="text-2xl" />,
      title: 'Fast Delivery',
      description: 'Get your groceries delivered in under 2 hours',
      color: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      features: ['Same day delivery', 'Real-time tracking', 'Scheduled slots']
    },
    {
      icon: <FaLeaf className="text-2xl" />,
      title: 'Fresh Guarantee',
      description: '100% fresh produce from local farms',
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      features: ['Farm to table', 'Daily restocked', 'Quality checked']
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive prices with quality assurance',
      color: 'bg-amber-100',
      iconColor: 'text-amber-600',
      features: ['Price match guarantee', 'Member discounts', 'Seasonal offers']
    },
    {
      icon: <FaHeadset className="text-2xl" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      features: ['Live chat', 'Phone support', 'WhatsApp assistance']
    }
  ];


  return (
    <section className="py-16 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
         
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Shop With <span className="text-emerald-600">FreshMart</span>?
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing grocery shopping with technology, quality, 
            and customer-centric services that make your life easier.
          </p>
        </div>

      
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="group relative bg-white rounded-2xl p-6 border border-gray-200 hover:border-emerald-300 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Background Decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-50 rounded-full -translate-y-10 translate-x-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Icon */}
              <div className={`${service.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                <span className={`${service.iconColor}`}>{service.icon}</span>
              </div>
              
              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {service.description}
              </p>
              
              {/* Features List */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-500">
                    <span className="w-1 h-1 bg-emerald-400 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {/* Learn More Button */}
              <button className="flex items-center text-emerald-600 font-semibold text-sm group-hover:text-emerald-700 transition-colors duration-300">
                Learn More
                <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          ))}
        </div>

        {/* Testimonial/Trust Badges */}
        <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Trusted by Thousands of Families
              </h3>
              <p className="text-emerald-100 text-lg">
                Join our community of satisfied customers who choose quality and convenience.
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-4xl font-bold">4.9/5</div>
                <div className="text-emerald-200">Customer Rating</div>
              </div>
              <div className="h-12 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-4xl font-bold">99%</div>
                <div className="text-emerald-200">On-Time Delivery</div>
              </div>
            </div>
          </div>
          
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="mr-2">🔒</span>
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="mr-2">🌱</span>
              <span>Eco-Friendly Packaging</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="mr-2">⭐</span>
              <span>Premium Quality</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="mr-2">🔄</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-emerald-50 to-green-50 px-8 py-4 rounded-full">
            <span className="text-emerald-600 font-semibold">
              Ready to experience hassle-free grocery shopping?
            </span>
            <Link to='/all-products'>
            <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition-colors duration-300 flex items-center">
              Start Shopping
              <FaArrowRight className="ml-2" />
            </button>
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Free delivery on first order • No minimum purchase • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;