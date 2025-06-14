import React, { useState, useEffect } from "react";
import { MapPin, Award, Brain, Users, Star } from "lucide-react";
import { TorreApiService } from "../../services/api/torreApi";

const ProfileModal = ({ person, isOpen, onClose }) => {
  const [genomeData, setGenomeData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && person) {
      setLoading(true);
      TorreApiService.getPersonGenome(person.username)
        .then(setGenomeData)
        .catch((error) => {
          console.error("Failed to load genome data:", error);
          setGenomeData(null);
        })
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
              <div className="w-20 h-20 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-2xl">
                {person.avatar ? (
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                )}
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
                  {genomeData.strengths.map((strength, index) => (
                    <div
                      key={`${strength}-${index}`}
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
                  {genomeData.skills.map((skill, index) => (
                    <div
                      key={`${skill.name}-${index}`}
                      className="bg-gray-50 rounded-lg p-4"
                    >
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
                        {Math.round(skill.proficiency)}% proficiency
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
                            {Math.round(score)}%
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

              {/* Interests Section */}
              {genomeData.interests && genomeData.interests.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-600" />
                    Interests
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {genomeData.interests.map((interest, index) => (
                      <span
                        key={`${interest}-${index}`}
                        className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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

export default ProfileModal;
