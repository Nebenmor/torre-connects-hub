import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  User,
  MapPin,
  Star,
  TrendingUp,
  Users,
  Briefcase,
  Brain,
  Award,
  Globe,
} from "lucide-react";

// Mock data for demonstration - replace with actual API calls
const mockSearchResults = [
  {
    id: "1",
    name: "Sarah Chen",
    username: "sarahchen",
    headline: "Senior Full Stack Developer at Meta",
    location: "San Francisco, CA",
    avatar: null,
    skills: ["React", "Node.js", "Python", "AWS"],
    experience: "5+ years",
    rating: 4.9,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    username: "marcusdev",
    headline: "DevOps Engineer & Cloud Architect",
    location: "Austin, TX",
    avatar: null,
    skills: ["Kubernetes", "Docker", "Terraform", "Azure"],
    experience: "7+ years",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    username: "elenarodriguez",
    headline: "Product Designer at Stripe",
    location: "New York, NY",
    avatar: null,
    skills: ["Figma", "UX Research", "Prototyping", "Design Systems"],
    experience: "4+ years",
    rating: 4.9,
  },
];

// API Configuration - Using window.location for environment detection
// const API_BASE_URL =
//   window.location.hostname === "localhost"
//     ? "http://localhost:3001"
//     : "https://your-backend-domain.vercel.app";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3001"
    : "https://torre-connects-hub.vercel.app");

// API Service Layer
class TorreApiService {
  static async searchPeople(query, filters = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          filters,
          size: 20,
          offset: 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Search failed");
      }

      const data = await response.json();

      // Transform Torre.ai response to our format
      const transformedResults =
        data.results?.map((person) => ({
          id: person.subjectId || person.id,
          name: person.name,
          username: person.username,
          headline:
            person.professionalHeadline || person.headline || "Professional",
          location: person.location || "Location not specified",
          avatar: person.picture,
          skills: person.skills?.map((skill) => skill.name) || [],
          experience: person.experience || "Experience not specified",
          rating: person.weight || 4.5,
        })) || [];

      return {
        results: transformedResults,
        total: data.total || transformedResults.length,
      };
    } catch (error) {
      // Fallback to mock data if API fails
      console.warn("API call failed, using mock data:", error.message);

      const filtered = mockSearchResults.filter(
        (person) =>
          person.name.toLowerCase().includes(query.toLowerCase()) ||
          person.headline.toLowerCase().includes(query.toLowerCase()) ||
          person.skills.some((skill) =>
            skill.toLowerCase().includes(query.toLowerCase())
          )
      );

      return { results: filtered, total: filtered.length };
    }
  }

  static async getPersonGenome(username) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/genome/${username}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch profile");
      }

      const data = await response.json();

      // Transform Torre.ai genome data to our format
      return {
        username,
        strengths: data.strengths?.map((s) => s.name) || [
          "Problem Solving",
          "Team Leadership",
          "Innovation",
        ],
        personality: {
          openness: data.personality?.openness || 85,
          conscientiousness: data.personality?.conscientiousness || 78,
          extraversion: data.personality?.extraversion || 72,
          agreeableness: data.personality?.agreeableness || 88,
          neuroticism: data.personality?.neuroticism || 25,
        },
        skills: data.skills?.map((skill) => ({
          name: skill.name,
          proficiency: skill.proficiency || 85,
          experience: skill.experience || "3+ years",
        })) || [
          { name: "JavaScript", proficiency: 95, experience: "5 years" },
          { name: "React", proficiency: 92, experience: "4 years" },
          { name: "Node.js", proficiency: 88, experience: "3 years" },
          { name: "Python", proficiency: 85, experience: "4 years" },
        ],
      };
    } catch (error) {
      console.warn("Genome API call failed, using mock data:", error.message);

      // Fallback to mock data
      return {
        username,
        strengths: ["Problem Solving", "Team Leadership", "Innovation"],
        personality: {
          openness: 85,
          conscientiousness: 78,
          extraversion: 72,
          agreeableness: 88,
          neuroticism: 25,
        },
        skills: [
          { name: "JavaScript", proficiency: 95, experience: "5 years" },
          { name: "React", proficiency: 92, experience: "4 years" },
          { name: "Node.js", proficiency: 88, experience: "3 years" },
          { name: "Python", proficiency: 85, experience: "4 years" },
        ],
      };
    }
  }
}

// Custom Hooks
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const useSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedQuery = useDebounce(query, 300);

  const performSearch = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await TorreApiService.searchPeople(searchQuery);
      setResults(response.results);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    performSearch(debouncedQuery);
  }, [debouncedQuery, performSearch]);

  return { query, setQuery, results, loading, error };
};

// Components
const SearchBar = ({ query, setQuery, loading }) => (
  <div className="relative max-w-2xl mx-auto">
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for people, skills, or roles..."
        className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
      />
      {loading && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  </div>
);

const PersonCard = ({ person, onViewProfile }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
    <div className="flex items-start space-x-4">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
        {person.name
          .split(" ")
          .map((n) => n[0])
          .join("")}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="text-xl font-semibold text-gray-900 truncate">
            {person.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600">{person.rating}</span>
          </div>
        </div>

        <p className="text-gray-600 mb-2 line-clamp-2">{person.headline}</p>

        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {person.location}
          <span className="mx-2">•</span>
          <span>{person.experience}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {person.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
          {person.skills.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
              +{person.skills.length - 4} more
            </span>
          )}
        </div>

        <button
          onClick={() => onViewProfile(person)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
          View Profile
        </button>
      </div>
    </div>
  </div>
);

const ProfileModal = ({ person, isOpen, onClose }) => {
  const [genomeData, setGenomeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && person) {
      setLoading(true);
      TorreApiService.getPersonGenome(person.username)
        .then(setGenomeData)
        .finally(() => setLoading(false));
    }
  }, [isOpen, person]);

  if (!isOpen || !person) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {person.name}
                </h2>
                <p className="text-gray-600">{person.headline}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  {person.location}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">
                Loading profile insights...
              </span>
            </div>
          ) : genomeData ? (
            <div className="space-y-8">
              {/* Strengths Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  Key Strengths
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {genomeData.strengths.map((strength) => (
                    <div
                      key={strength}
                      className="bg-blue-50 rounded-lg p-4 text-center"
                    >
                      <div className="font-medium text-blue-900">
                        {strength}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-green-600" />
                  Technical Skills
                </h3>
                <div className="space-y-4">
                  {genomeData.skills.map((skill) => (
                    <div key={skill.name} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-600">
                          {skill.experience}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-sm text-gray-600 mt-1">
                        {skill.proficiency}% proficiency
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personality Insights */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-purple-600" />
                  Personality Insights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(genomeData.personality).map(
                    ([trait, score]) => (
                      <div key={trait} className="bg-purple-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-purple-900 capitalize">
                            {trait}
                          </span>
                          <span className="text-sm text-purple-700">
                            {score}%
                          </span>
                        </div>
                        <div className="w-full bg-purple-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Failed to load profile data. Please try again.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, color }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="flex items-center">
      <div className={`p-3 rounded-lg bg-${color}-100`}>
        {/* <Icon className={`w-6 h-6 text-${color}-600`} /> */}
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

// Main App Component
const TorreConnectHub = () => {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4" />
                <span>Powered by Torre.ai</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Next
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Dream Team
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Search through millions of professionals and discover the perfect
            talent for your needs
          </p>
          <SearchBar query={query} setQuery={setQuery} loading={loading} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={Users}
            title="Active Professionals"
            value="2.5M+"
            color="blue"
          />
          <StatsCard
            icon={Briefcase}
            title="Companies Hiring"
            value="50K+"
            color="green"
          />
          <StatsCard
            icon={MapPin}
            title="Countries"
            value="190+"
            color="purple"
          />
          <StatsCard
            icon={Star}
            title="Success Rate"
            value="94%"
            color="yellow"
          />
        </div>

        {/* Results Section */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Error: {error}</p>
          </div>
        )}

        {query && !loading && results.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}

        {results.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Found {results.length} professional
                {results.length !== 1 ? "s" : ""}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          </div>
        )}

        {!query && !loading && (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Ready to discover talent?
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Start by searching for people, skills, or job roles. Our
              AI-powered search will help you find the perfect match.
            </p>
          </div>
        )}
      </main>

      {/* Profile Modal */}
      <ProfileModal
        person={selectedPerson}
        isOpen={showProfile}
        onClose={handleCloseProfile}
      />
    </div>
  );
};

export default TorreConnectHub;
