import React from "react";
import { Globe, TrendingUp } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Torre Connect Hub
              </h1>
              <p className="text-sm text-gray-600">
                Discover amazing talent worldwide
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
