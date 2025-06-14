import React, { useState } from "react";
import Layout from "./components/layout/Layout";
import HeroSection from "./components/sections/HeroSection";
import StatsSection from "./components/sections/StatsSection";
import ResultsSection from "./components/sections/ResultsSection";
import ProfileModal from "./components/person/ProfileModal";
import { useSearch } from "./hooks/useSearch";

const App = () => {
  const { query, setQuery, results, loading, error } = useSearch();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleViewProfile = (person) => {
    setSelectedPerson(person);
    setShowProfile(true);
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    setSelectedPerson(null);
  };

  return (
    <Layout>
      <HeroSection query={query} setQuery={setQuery} loading={loading} />

      <StatsSection />

      <ResultsSection
        query={query}
        results={results}
        loading={loading}
        error={error}
        onViewProfile={handleViewProfile}
      />

      <ProfileModal
        person={selectedPerson}
        isOpen={showProfile}
        onClose={handleCloseProfile}
      />
    </Layout>
  );
};

export default App;
