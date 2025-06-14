// Mock data for demonstration - fallback if API fails or for development
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
  {
    id: "4",
    name: "Alex Thompson",
    username: "alexthompson",
    headline: "Machine Learning Engineer at Google",
    location: "Seattle, WA",
    avatar: null,
    skills: ["Python", "TensorFlow", "PyTorch", "MLOps"],
    experience: "6+ years",
    rating: 4.7,
  },
  {
    id: "5",
    name: "Maria Garcia",
    username: "mariagarcia",
    headline: "Senior Product Manager at Microsoft",
    location: "Redmond, WA",
    avatar: null,
    skills: ["Product Strategy", "User Research", "Agile", "Analytics"],
    experience: "8+ years",
    rating: 4.8,
  },
  {
    id: "6",
    name: "David Kim",
    username: "davidkim",
    headline: "iOS Developer at Apple",
    location: "Cupertino, CA",
    avatar: null,
    skills: ["Swift", "iOS", "Xcode", "Core Data"],
    experience: "4+ years",
    rating: 4.9,
  },
];

const mockGenomeData = {
  username: "mockuser",
  person: {
    name: "Sample User",
    professionalHeadline: "Professional Developer",
    picture: null,
    location: "Global",
  },
  strengths: [
    "Problem Solving",
    "Team Leadership",
    "Innovation",
    "Communication",
    "Strategic thinking",
    "Technical Architecture",
  ],
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
    { name: "AWS", proficiency: 80, experience: "3 years" },
    { name: "TypeScript", proficiency: 90, experience: "3 years" },
  ],
  interests: [
    "Technology",
    "Innovation",
    "Team Building",
    "Open Source",
    "AI/ML",
  ],
  experiences: [
    {
      name: "Software Development",
      category: "Technology",
      organizations: ["Tech Corp", "StartupXYZ"],
    },
    {
      name: "Team Leadership",
      category: "Management",
      organizations: ["Current Company"],
    },
  ],
};

// Configuration for development/testing
const CONFIG = {
  USE_MOCK_DATA: true, // Set to false when Torre.ai API is working
  API_BASE_URL: "https://torre.ai/api",
  ENABLE_API_LOGGING: true, // Enable detailed logging for debugging
};

// API Service Layer - Torre.ai Integration with Enhanced Error Handling
export class TorreApiService {
  static async searchPeople(query, filters = {}) {
    // For development/testing or when API is not available
    if (CONFIG.USE_MOCK_DATA) {
      console.log("Using mock data for search:", query);
      return this.getMockSearchResults(query);
    }

    try {
      const searchPayload = {
        query,
        filters,
        size: 20,
        offset: 0,
        aggregate: false,
        excludeContacts: false,
      };

      if (CONFIG.ENABLE_API_LOGGING) {
        console.log("Torre.ai API Request:", {
          url: `${CONFIG.API_BASE_URL}/entities/_searchStream`,
          payload: searchPayload,
        });
      }

      const response = await fetch(
        `${CONFIG.API_BASE_URL}/entities/_searchStream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // Add authentication headers here when available
            // "Authorization": `Bearer ${API_KEY}`,
          },
          body: JSON.stringify(searchPayload),
        }
      );

      if (CONFIG.ENABLE_API_LOGGING) {
        console.log(
          "Torre.ai API Response Status:",
          response.status,
          response.statusText
        );
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Torre.ai API error: ${response.status} ${response.statusText}. Details: ${errorText}`
        );
      }

      const data = await response.json();

      if (CONFIG.ENABLE_API_LOGGING) {
        console.log("Torre.ai API Response Data:", data);
      }

      // Transform Torre.ai response to our format
      const transformedResults =
        data.results?.map((person) => ({
          id: person.subjectId || person.id || Math.random().toString(36),
          name: person.name || "Unknown Name",
          username: person.username || person.subjectId || "unknown",
          headline:
            person.professionalHeadline || person.headline || "Professional",
          location: this.formatLocation(person.location),
          avatar: person.picture,
          skills: this.extractSkills(person),
          experience: person.experience || "Experience not specified",
          rating: person.weight || Math.random() * 2 + 3,
          verified: person.verified || false,
        })) || [];

      return {
        results: transformedResults,
        total: data.total || transformedResults.length,
        aggregations: data.aggregations,
      };
    } catch (error) {
      console.warn(
        "Torre.ai API call failed, falling back to mock data:",
        error.message
      );

      if (CONFIG.ENABLE_API_LOGGING) {
        console.error("Full error details:", error);
      }

      // Fallback to mock data
      return this.getMockSearchResults(query);
    }
  }

  static getMockSearchResults(query) {
    if (!query.trim()) {
      return { results: mockSearchResults, total: mockSearchResults.length };
    }

    const filtered = mockSearchResults.filter(
      (person) =>
        person.name.toLowerCase().includes(query.toLowerCase()) ||
        person.headline.toLowerCase().includes(query.toLowerCase()) ||
        person.skills.some((skill) =>
          skill.toLowerCase().includes(query.toLowerCase())
        ) ||
        person.location.toLowerCase().includes(query.toLowerCase())
    );

    return {
      results: filtered,
      total: filtered.length,
      source: "mock", // Indicate this is mock data
    };
  }

  static async getPersonGenome(username) {
    // For development/testing or when API is not available
    if (CONFIG.USE_MOCK_DATA) {
      console.log("Using mock genome data for:", username);
      return {
        ...mockGenomeData,
        username,
        person: {
          ...mockGenomeData.person,
          name: username.charAt(0).toUpperCase() + username.slice(1),
        },
      };
    }

    try {
      if (CONFIG.ENABLE_API_LOGGING) {
        console.log(
          "Torre.ai Genome API Request:",
          `${CONFIG.API_BASE_URL}/genome/bios/${username}`
        );
      }

      const response = await fetch(
        `${CONFIG.API_BASE_URL}/genome/bios/${username}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // Add authentication headers here when available
            // "Authorization": `Bearer ${API_KEY}`,
          },
        }
      );

      if (CONFIG.ENABLE_API_LOGGING) {
        console.log(
          "Torre.ai Genome API Response Status:",
          response.status,
          response.statusText
        );
      }

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Profile not found for username: ${username}`);
        }
        const errorText = await response.text();
        throw new Error(
          `Torre.ai Genome API error: ${response.status} ${response.statusText}. Details: ${errorText}`
        );
      }

      const data = await response.json();

      if (CONFIG.ENABLE_API_LOGGING) {
        console.log("Torre.ai Genome API Response Data:", data);
      }

      // Transform Torre.ai genome data to our format
      return {
        username,
        person: {
          name: data.person?.name || "Unknown",
          professionalHeadline:
            data.person?.professionalHeadline || "Professional",
          picture: data.person?.picture,
          location: this.formatLocation(data.person?.location),
        },
        strengths: this.extractStrengths(data.strengths),
        personality: this.transformPersonality(data.personality),
        skills: this.transformSkills(data.strengths),
        interests: this.extractInterests(data.interests),
        experiences: this.transformExperiences(data.experiences),
        awards: data.awards || [],
      };
    } catch (error) {
      console.warn(
        "Torre.ai Genome API call failed, using mock data:",
        error.message
      );

      if (CONFIG.ENABLE_API_LOGGING) {
        console.error("Full error details:", error);
      }

      // Fallback to mock data with personalized information
      return {
        ...mockGenomeData,
        username,
        person: {
          ...mockGenomeData.person,
          name: username.charAt(0).toUpperCase() + username.slice(1),
        },
      };
    }
  }

  // Helper methods for data transformation
  static formatLocation(location) {
    if (!location) return "Location not specified";
    if (typeof location === "string") return location;

    const parts = [];
    if (location.name) parts.push(location.name);
    if (location.country) parts.push(location.country);

    return parts.length > 0 ? parts.join(", ") : "Location not specified";
  }

  static extractSkills(person) {
    const skills = [];

    // Extract from various possible skill fields
    if (person.skills) skills.push(...person.skills.map((s) => s.name || s));
    if (person.strengths)
      skills.push(...person.strengths.map((s) => s.name || s));
    if (person.interests)
      skills.push(...person.interests.map((s) => s.name || s));

    return [...new Set(skills)].slice(0, 8); // Remove duplicates and limit
  }

  static extractStrengths(strengths) {
    if (!strengths || !Array.isArray(strengths)) {
      return [
        "Problem Solving",
        "Team Leadership",
        "Innovation",
        "Communication",
        "Strategic thinking",
        "Technical Architecture",
      ];
    }

    return strengths
      .filter((strength) => strength && (strength.name || strength.id))
      .map((strength) => strength.name || strength.id)
      .slice(0, 6);
  }

  static transformPersonality(personality) {
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
          typeof personality[trait] === "number" && personality[trait] <= 1
            ? Math.round(personality[trait] * 100)
            : personality[trait] || Math.random() * 40 + 50;
      } else {
        transformed[trait] = Math.random() * 40 + 50; // Fallback random value
      }
    });

    return transformed;
  }

  static transformSkills(strengths) {
    if (!strengths || !Array.isArray(strengths)) {
      return [
        { name: "JavaScript", proficiency: 95, experience: "5 years" },
        { name: "React", proficiency: 92, experience: "4 years" },
        { name: "Node.js", proficiency: 88, experience: "3 years" },
        { name: "Python", proficiency: 85, experience: "4 years" },
        { name: "AWS", proficiency: 80, experience: "3 years" },
        { name: "TypeScript", proficiency: 90, experience: "3 years" },
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
  }

  static extractInterests(interests) {
    if (!interests || !Array.isArray(interests)) {
      return [
        "Technology",
        "Innovation",
        "Team Building",
        "Open Source",
        "AI/ML",
      ];
    }

    return interests
      .filter((interest) => interest && interest.name)
      .map((interest) => interest.name)
      .slice(0, 5);
  }

  static transformExperiences(experiences) {
    if (!experiences || !Array.isArray(experiences)) {
      return [
        {
          name: "Software Development",
          category: "Technology",
          organizations: ["Tech Corp", "StartupXYZ"],
        },
        {
          name: "Team Leadership",
          category: "Management",
          organizations: ["Current Company"],
        },
      ];
    }

    return experiences
      .filter((exp) => exp && exp.name)
      .map((exp) => ({
        name: exp.name,
        category: exp.category,
        organizations: exp.organizations || [],
      }))
      .slice(0, 5);
  }

  // Utility method to toggle between API and mock data
  static setUseMockData(useMock) {
    CONFIG.USE_MOCK_DATA = useMock;
    console.log(
      `Torre.ai API Service: ${useMock ? "Using mock data" : "Using live API"}`
    );
  }

  // Utility method to enable/disable API logging
  static setApiLogging(enabled) {
    CONFIG.ENABLE_API_LOGGING = enabled;
    console.log(`Torre.ai API logging: ${enabled ? "enabled" : "disabled"}`);
  }
}
