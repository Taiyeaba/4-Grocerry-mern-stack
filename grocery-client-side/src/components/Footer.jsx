import React from 'react';
import img from '../assets/92 1.png';
import { FaFacebook, FaInstagram, FaTwitter, FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-72 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-900 relative">

      {/* Top Section */}
      <div className="absolute -mt-48 w-full px-4 sm:px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#EFEBE3] rounded-3xl shadow-xl p-8 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-14">

            {/* Image */}
            <div className="md:w-1/2 flex justify-center">
              <img
                src={img}
                alt="basket"
                className="w-64 sm:w-72 md:w-80 lg:w-[340px] drop-shadow-lg"
              />
            </div>

            {/* Text + Input */}
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                Get Grocery News!
              </h2>
              <p className="text-gray-500 mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
                Exclusive training tips, tricks, product deals and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input
                  type="email"
                  placeholder="Enter email..."
                  className="flex-1 px-4 sm:px-6 py-3 sm:py-4 rounded-xl bg-white border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg transition-all">
                  Subscribe
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="px-4 sm:px-6 lg:px-20 pt-56 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">

            {/* Contact */}
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h3 className="text-lg font-bold mb-3 text-emerald-300 uppercase">Contact</h3>
              <ul className="space-y-1 text-emerald-100 text-sm">
                <li className="flex items-center justify-center sm:justify-start gap-2">📍 123 Grocery Street</li>
                <li className="flex items-center justify-center sm:justify-start gap-2">📞 (555) 123-4567</li>
                <li className="flex items-center justify-center sm:justify-start gap-2">✉️ contact@email.com</li>
              </ul>
            </div>

            {/* Hours */}
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h3 className="text-lg font-bold mb-3 text-emerald-300 uppercase">Hours</h3>
              <ul className="space-y-1 text-emerald-100 text-sm">
                <li className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-1 sm:gap-2">🕘 Mon-Fri: 9AM-10PM</li>
                <li className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-1 sm:gap-2">🕘 Sat: 10AM-8PM</li>
                <li className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-start gap-1 sm:gap-2">❌ Sun: Closed</li>
              </ul>
            </div>

            {/* Links */}
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h3 className="text-lg font-bold mb-3 text-emerald-300 uppercase">Links</h3>
              <ul className="space-y-1 text-emerald-100 text-sm flex flex-col items-center sm:items-start">
                <li className="hover:text-white cursor-pointer transition-colors duration-200 w-fit">Privacy</li>
                <li className="hover:text-white cursor-pointer transition-colors duration-200 w-fit">Terms</li>
                <li className="hover:text-white cursor-pointer transition-colors duration-200 w-fit">Support</li>
                <li className="hover:text-white cursor-pointer transition-colors duration-200 w-fit">FAQ</li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="text-center sm:text-left">
              <h3 className="text-lg font-bold mb-3 text-emerald-300 uppercase">Follow Us</h3>
              <div className="flex justify-center sm:justify-start gap-2 sm:gap-3 mb-3 sm:mb-4 flex-wrap">
                {[FaGoogle, FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram].map((Icon, i) => (
                  <a
                    href="#"
                    key={i}
                    className="w-7 h-7 sm:w-8 sm:h-8 bg-emerald-800 hover:bg-emerald-700 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    aria-label="social"
                  >
                    <Icon className="text-xs sm:text-sm" />
                  </a>
                ))}
              </div>
              <p className="text-emerald-200 text-xs sm:text-sm">Fresh groceries delivered daily</p>
            </div>

          </div>

          {/* Bottom Line */}
          <div className="border-t border-emerald-700 mt-6 pt-4 text-center text-emerald-200 text-xs sm:text-sm">
            © {new Date().getFullYear()} Nature’s Platter. All rights reserved.
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
