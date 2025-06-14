import React from "react";
import { MapPin, Star } from "lucide-react";

const PersonCard = ({ person, onViewProfile }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
          {person.avatar ? (
            <img
              src={person.avatar}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(person.name)
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-xl font-semibold text-gray-900 truncate">
              {person.name}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {person.rating.toFixed(1)}
              </span>
            </div>
            {person.verified && (
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>

          {/* Headline */}
          <p className="text-gray-600 mb-2 line-clamp-2">{person.headline}</p>

          {/* Location & Experience */}
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="w-4 h-4 mr-1" />
            {person.location}
            <span className="mx-2">•</span>
            <span>{person.experience}</span>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {person.skills.slice(0, 4).map((skill, index) => (
              <span
                key={`${skill}-${index}`}
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

          {/* Action Button */}
          <button
            onClick={() => onViewProfile(person)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`View profile of ${person.name}`}
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
