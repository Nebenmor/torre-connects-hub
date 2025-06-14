import React from "react";
import SearchBar from "../common/SearchBar";

const HeroSection = ({ query, setQuery, loading }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Find Your Next
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {" "}
          Dream Team
        </span>
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Search through millions of professionals and discover the perfect talent
        for your needs
      </p>
      <SearchBar query={query} setQuery={setQuery} loading={loading} />
    </div>
  );
};

export default HeroSection;
