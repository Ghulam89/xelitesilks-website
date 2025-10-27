import React, { useState } from 'react';
import { ChevronDown, User } from 'lucide-react';
import logo from '../../assets/images/xelite silk.svg'
import { Link, Outlet } from 'react-router-dom';
export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
             <img src={logo} alt="Xelite Silk" className="h-16 w-auto" />
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900">Shop</Link>
              <Link to="/dashboard/profile" className="text-gray-900 font-medium border-b-2 border-gray-900 pb-4">Orders</Link>
            </nav>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <User className="w-6 h-6" />
                <ChevronDown className="w-4 h-4" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-600" />
                    <span className="text-sm text-gray-700">gm6681328@gmail.com</span>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className=' '>

      <Outlet />

      </div>
     
      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-6 text-sm">
            <button className="flex items-center text-blue-600 hover:underline">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
              </svg>
              United States
              <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <a href="#" className="text-blue-600 hover:underline">Refund policy</a>
            <a href="#" className="text-blue-600 hover:underline">Shipping</a>
            <a href="#" className="text-blue-600 hover:underline">Privacy policy</a>
            <a href="#" className="text-blue-600 hover:underline">Terms of service</a>
            <a href="#" className="text-blue-600 hover:underline">Contact information</a>
          </div>
        </div>
      </footer>
    </div>
  );
}