import React from "react";
import { Search } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const SearchBar = ({
  query,
  setQuery,
  loading,
  placeholder = "Search for people, skills, or roles...",
  className = "max-w-2xl mx-auto",
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
          aria-label="Search input"
        />
        {loading && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <LoadingSpinner size="small" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
