/**
 * Helper utility functions
 * Extracted from TorreConnectHub main component
 */

/**
 * Format location data into readable string
 * @param {Object|string} location - Location object or string
 * @returns {string} Formatted location string
 */
export const formatLocation = (location) => {
  if (!location) return "Location not specified";
  if (typeof location === "string") return location;

  const parts = [];
  if (location.name) parts.push(location.name);
  if (location.country) parts.push(location.country);

  return parts.length > 0 ? parts.join(", ") : "Location not specified";
};

/**
 * Extract skills from person object
 * @param {Object} person - Person object with potential skill fields
 * @returns {Array} Array of skill names (limited to 8)
 */
export const extractSkills = (person) => {
  const skills = [];

  // Extract from various possible skill fields
  if (person.skills) skills.push(...person.skills.map((s) => s.name || s));
  if (person.strengths)
    skills.push(...person.strengths.map((s) => s.name || s));
  if (person.interests)
    skills.push(...person.interests.map((s) => s.name || s));

  return [...new Set(skills)].slice(0, 8); // Remove duplicates and limit
};

/**
 * Extract strengths from Torre.ai strengths data
 * @param {Array} strengths - Array of strength objects
 * @returns {Array} Array of strength names (limited to 6)
 */
export const extractStrengths = (strengths) => {
  if (!strengths || !Array.isArray(strengths))
    return ["Problem Solving", "Team Leadership", "Innovation"];

  return strengths
    .filter((strength) => strength && (strength.name || strength.id))
    .map((strength) => strength.name || strength.id)
    .slice(0, 6);
};

/**
 * Transform Torre.ai personality data to percentage format
 * @param {Object} personality - Raw personality data from Torre.ai
 * @returns {Object} Transformed personality traits as percentages
 */
export const transformPersonality = (personality) => {
  if (!personality) {
    return {
      openness: 85,
      conscientiousness: 78,
      extraversion: 72,
      agreeableness: 88,
      neuroticism: 25,
    };
  }

  // Torre.ai personality data might be in different format
  const transformed = {};
  const traits = [
    "openness",
    "conscientiousness",
    "extraversion",
    "agreeableness",
    "neuroticism",
  ];

  traits.forEach((trait) => {
    if (personality[trait] !== undefined) {
      // Convert to percentage if needed
      transformed[trait] =
        typeof personality[trait] === "number"
          ? Math.round(personality[trait] * 100)
          : Math.random() * 40 + 50; // Fallback random value
    } else {
      transformed[trait] = Math.random() * 40 + 50; // Fallback random value
    }
  });

  return transformed;
};

/**
 * Transform Torre.ai skills/strengths to detailed skill objects
 * @param {Array} strengths - Array of skill/strength objects from Torre.ai
 * @returns {Array} Array of detailed skill objects with proficiency and experience
 */
export const transformSkills = (strengths) => {
  if (!strengths || !Array.isArray(strengths)) {
    return [
      { name: "JavaScript", proficiency: 95, experience: "5 years" },
      { name: "React", proficiency: 92, experience: "4 years" },
      { name: "Node.js", proficiency: 88, experience: "3 years" },
      { name: "Python", proficiency: 85, experience: "4 years" },
    ];
  }

  return strengths
    .filter((skill) => skill && skill.name)
    .map((skill) => ({
      name: skill.name,
      proficiency: skill.proficiency || Math.random() * 30 + 70, // 70-100%
      experience:
        skill.experience || `${Math.floor(Math.random() * 5) + 1} years`,
    }))
    .slice(0, 8);
};

/**
 * Extract interests from Torre.ai interests data
 * @param {Array} interests - Array of interest objects
 * @returns {Array} Array of interest names (limited to 5)
 */
export const extractInterests = (interests) => {
  if (!interests || !Array.isArray(interests))
    return ["Technology", "Innovation"];

  return interests
    .filter((interest) => interest && interest.name)
    .map((interest) => interest.name)
    .slice(0, 5);
};

/**
 * Transform Torre.ai experiences data
 * @param {Array} experiences - Array of experience objects
 * @returns {Array} Array of transformed experience objects (limited to 5)
 */
export const transformExperiences = (experiences) => {
  if (!experiences || !Array.isArray(experiences)) return [];

  return experiences
    .filter((exp) => exp && exp.name)
    .map((exp) => ({
      name: exp.name,
      category: exp.category,
      organizations: exp.organizations || [],
    }))
    .slice(0, 5);
};

/**
 * Generate initials from a full name
 * @param {string} name - Full name
 * @returns {string} Initials (max 2 characters)
 */
export const getInitials = (name) => {
  if (!name) return "??";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

/**
 * Generate a random rating between min and max
 * @param {number} min - Minimum rating (default: 3)
 * @param {number} max - Maximum rating (default: 5)
 * @returns {number} Random rating with 1 decimal place
 */
export const generateRandomRating = (min = 3, max = 5) => {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
};

/**
 * Truncate text to specified length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length (default: 100)
 * @returns {string} Truncated text with ellipsis if needed
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
};

/**
 * Format experience years from a number
 * @param {number} years - Number of years
 * @returns {string} Formatted experience string
 */
export const formatExperience = (years) => {
  if (!years || years <= 0) return "Entry level";
  if (years === 1) return "1 year";
  if (years >= 10) return "10+ years";
  return `${years} years`;
};

/**
 * Check if a person object has all required fields
 * @param {Object} person - Person object to validate
 * @returns {boolean} True if person has required fields
 */
export const isValidPerson = (person) => {
  return (
    person &&
    typeof person === "object" &&
    person.name &&
    person.name.trim() !== "" &&
    (person.id || person.username)
  );
};

/**
 * Create a unique ID for a person if not provided
 * @param {Object} person - Person object
 * @returns {string} Unique ID
 */
export const createPersonId = (person) => {
  return (
    person.subjectId ||
    person.id ||
    person.username ||
    `person_${Math.random().toString(36).substr(2, 9)}`
  );
};

/**
 * Filter search results based on query
 * @param {Array} results - Array of person objects
 * @param {string} query - Search query
 * @returns {Array} Filtered results
 */
export const filterResults = (results, query) => {
  if (!query || !Array.isArray(results)) return results;

  const searchTerm = query.toLowerCase().trim();

  return results.filter((person) => {
    if (!isValidPerson(person)) return false;

    const searchableText = [
      person.name,
      person.headline,
      person.location,
      person.experience,
      ...(person.skills || []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchableText.includes(searchTerm);
  });
};
