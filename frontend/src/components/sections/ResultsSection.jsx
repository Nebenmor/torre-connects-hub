import React from "react";
import { Search } from "lucide-react";
import PersonList from "../person/PersonList";

const ErrorMessage = ({ error }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
    <p className="text-red-800">Error: {error}</p>
  </div>
);

const NoResults = ({ query }) => (
  <div className="text-center py-12">
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Search className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
    <p className="text-gray-600">Try adjusting your search terms or filters</p>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-16">
    <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <Search className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-xl font-medium text-gray-900 mb-2">
      Ready to discover talent?
    </h3>
    <p className="text-gray-600 max-w-md mx-auto">
      Start by searching for people, skills, or job roles. Our AI-powered search
      will help you find the perfect match.
    </p>
  </div>
);

const ResultsSection = ({ query, results, loading, error, onViewProfile }) => {
  // Error state
  if (error) {
    return <ErrorMessage error={error} />;
  }

  // No results for search query
  if (query && !loading && results.length === 0 && !error) {
    return <NoResults query={query} />;
  }

  // Results available
  if (results.length > 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Found {results.length} professional{results.length !== 1 ? "s" : ""}
          </h3>
        </div>
        <PersonList people={results} onViewProfile={onViewProfile} />
      </div>
    );
  }

  // Empty state (no search query)
  if (!query && !loading) {
    return <EmptyState />;
  }

  // Loading or default state
  return null;
};

export default ResultsSection;
