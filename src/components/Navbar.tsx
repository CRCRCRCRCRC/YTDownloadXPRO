import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Download, Home, Info } from 'lucide-react';
import { cn } from '../lib/utils';

const Navbar: React.FC = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: '首頁',
      icon: Home
    },
    {
      path: '/about',
      label: '關於',
      icon: Info
    }
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-blue-800 shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-red-600 p-2 rounded-lg group-hover:bg-red-700 transition-colors duration-200">
              <Download className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">YTDownloadXPRO</h1>
              <p className="text-xs text-blue-200">專業YouTube下載工具</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-red-600 text-white shadow-lg'
                      : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;